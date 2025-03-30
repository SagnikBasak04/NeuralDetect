import uvicorn
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
import cloudinary
import cloudinary.uploader
import os
import cv2 as cv
import tempfile
import requests
from enum import Enum
from typing import Any
from starlette.middleware.cors import CORSMiddleware
from keras.models import load_model
import numpy as np
from fastapi.responses import JSONResponse

model = load_model('final_model.h5')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prediction(str, Enum):
    real = "real"
    fake = "fake"

class VideoURL(BaseModel):
    url: str

def download_video(video_url: str, save_path: str):
    try:
        response = requests.get(video_url, stream=True)
        response.raise_for_status()
        with open(save_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        return save_path
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error downloading video: {str(e)}")

def extract_frames(video_path, num_frames=8):
    cap = cv.VideoCapture(video_path)
    if not cap.isOpened():
        return None
    
    total_frames = int(cap.get(cv.CAP_PROP_FRAME_COUNT))
    indices = np.linspace(0, max(total_frames - 1, 0), num_frames, dtype=int)
    frames = []
    current_frame = 0
    ret = True
    
    while ret and len(frames) < num_frames:
        ret, frame = cap.read()
        if not ret:
            break
        if current_frame in indices:
            resized_frame = cv.resize(frame, (224, 224))
            resized_frame = resized_frame.astype('float32') / 255.0
            frames.append(resized_frame)
        current_frame += 1
    cap.release()
    return np.array(frames)


@app.get("/")
def home() -> Any:
    return {"message": "Server is up and running"}

@app.post("/predict")
async def process_video_url(video: VideoURL):
    video_url = video.url
    video_filename = "temp_video.mp4"
    video_path = os.path.join("temp_videos", video_filename)
    os.makedirs("temp_videos", exist_ok=True)

    download_video(video_url, video_path)
    
    frames = extract_frames(video_path,num_frames=8)
    if frames is None:
        raise HTTPException(status_code=500, detail="Error processing the video.")

    processed_video = np.expand_dims(frames, axis=0)
    predictions = model.predict(processed_video)

    prediction_label = "Real" if predictions[0] > 0.5 else "Fake"

    os.remove(video_path)
    
    return JSONResponse(content={"model_prediction": prediction_label})

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)