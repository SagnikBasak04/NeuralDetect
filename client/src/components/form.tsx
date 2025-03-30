import React, { useState } from 'react';
import VideoInput from "../components/VideoInput";
import "./form.css";

const Form: React.FC = () => {
  const [logMessage, setLogMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    setLogMessage("Video is uploaded successfully!!!");
    console.log("Submit is clicked");
  };

  return (
    <div className="form-container">
      <div className="App">
        <h1>Video Upload</h1>
        <VideoInput width={400} height={300} onSubmit={handleSubmit} logMessage={logMessage} />
      </div>
    </div>
  );
};

export default Form;
