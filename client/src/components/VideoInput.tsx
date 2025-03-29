import React, { useState } from 'react';

interface VideoInputProps {
  width: number;
  height: number;
  onSubmit: () => void;
  logMessage: string | null;
}

const VideoInput: React.FC<VideoInputProps> = ({ width, height, onSubmit, logMessage }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSource(url);
      setError(null);
    }
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const handleSubmitClick = () => {
    if (source) {
      onSubmit();
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
    </div>
  );
};

export default VideoInput;
