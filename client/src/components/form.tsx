import React from 'react';
import VideoInput from "../components/VideoInput"; 
import "./form.css";

const Form: React.FC = () => {
  return (
    <div className="App">
      <h1>Video Upload</h1>
      <VideoInput width={400} height={300} />
    </div>
  );
};

export default Form;
