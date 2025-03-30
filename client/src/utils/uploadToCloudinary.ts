import toast from "react-hot-toast";

export const uploadBlobToCloudinary = async (imageUrl: string): Promise<string | null> => {
  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dhjyjsyvt/video/upload";
  const uploadPreset = "Deepfake-Detection-Service";

  const formData = new FormData();
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.status}`);
    }
    const blob = await response.blob();

    // Convert the blob to a File. Provide a filename and MIME type.
    const fileFromBlob = new File([blob], "upload.mp4", { 
      type: blob.type, 
      lastModified: Date.now() 
    });

    formData.append("file", fileFromBlob);
    
    const res = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Cloudinary Error: ", data);
      throw new Error(`Cloudinary upload failed: ${res.statusText}`);
    }

    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    toast.error("Couldn't upload image");
    return null;
  }
};
