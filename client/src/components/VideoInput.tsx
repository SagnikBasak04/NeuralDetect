import React from 'react';

interface VideoInputProps {
  width: number;
  height: number;
}

const VideoInput: React.FC<VideoInputProps> = ({ width, height }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [source, setSource] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSource(url);
    }
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
        style={{ display: 'none' }} // Hide the input element
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
    </div>
  );
};

export default VideoInput;
