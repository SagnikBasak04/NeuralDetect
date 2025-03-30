import React, { useState } from 'react';
import { uploadBlobToCloudinary } from '../utils/uploadToCloudinary';
import { useAuthContext } from '../context/AuthContext';

interface UploadResult {
  userId: string;
  videoUrl: string;
  modelResult: string;
  positiveReviews: number;
  negativeReviews: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface VideoInputProps {
  width: number;
  height: number;
  // onSubmit now accepts the backend response object
  onSubmit: (result: UploadResult) => void;
  logMessage: string | null;
}

const VideoInput: React.FC<VideoInputProps> = ({ width, height, onSubmit, logMessage }) => {
  const {authUser} = useAuthContext();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  // When a file is selected, create a blob URL for preview.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSource(url);
      setError(null);
    }
  };

  // Trigger the hidden file input.
  const handleChoose = () => {
    inputRef.current?.click();
  };

  // On submit, upload the blob to Cloudinary and then call your backend API.
  const handleSubmitClick = async () => {
    if (source) {
      try {
        // Upload the blob URL to Cloudinary.
        const uploadedUrl = await uploadBlobToCloudinary(source);
        if (!uploadedUrl) {
          setError("Upload failed. Please try again.");
          return;
        }

        // Call the backend API with the Cloudinary URL.
        const backendUrl = `http://localhost:5000/api/v1/upload/upload-video/${authUser?._id}`;
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoUrl: uploadedUrl }),
        });

        if (!response.ok) {
          throw new Error("Backend request failed");
        }

        const data: UploadResult = await response.json();
        setResult(data);
        onSubmit(data);
      } catch (err) {
        console.error(err);
        setError("Upload failed. Please try again.");
      }
    } else {
      setError("Please select a video before submitting.");
    }
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        style={{ display: 'none' }}
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="VideoInput_video"
          width={width}
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{source || "Nothing selected"}</div>
      {error && <div className="VideoInput_error">{error}</div>}
      <button
        onClick={handleSubmitClick}
        disabled={!source}
        className={`VideoInput_submit ${!source ? 'disabled' : ''}`}
      >
        Submit
      </button>
      {logMessage && <div className="VideoInput_log">{logMessage}</div>}
      {result && (
        <div className="VideoInput_result">
          <h3>Upload Result:</h3>
          {result.modelResult.toLowerCase() === "fake" ? (
            <p style={{ color: 'red' }}>
              Warning: The model detected a deepfake.
            </p>
          ) : (
            <p style={{ color: 'green' }}>
              Video is authentic. Good to go!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VideoInput;
