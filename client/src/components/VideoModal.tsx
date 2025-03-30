import React from 'react';
import './VideoModal.css';

interface VideoModalProps {
  video: {
    _id: string;
    videoUrl: string;
  };
  onClose: () => void;
  isAuthentic: boolean;
  realCount: number;
  fakeCount: number;
  onVote: (isReal: boolean) => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  isAuthentic,
  realCount,
  fakeCount,
  onVote
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-video-container">
          <video
            ref={videoRef}
            src={video.videoUrl}
            controls
            className="modal-video-player"
            poster="https://via.placeholder.com/800x450"
          />
        </div>
        <div className="modal-info">
          <div className="prediction-section">
            <p className="prediction-text">
              {isAuthentic ? "This video is Real & Genuine" : "This video might potentially be a Deepfake Video"}
            </p>
            <div className="vote-counts">
              <div className="vote-count real">
                <span className="count">{realCount}</span>
                <span className="label">users say it's real</span>
              </div>
              <div className="vote-count fake">
                <span className="count">{fakeCount}</span>
                <span className="label">users say it's fake</span>
              </div>
            </div>
            <p className="vote-prompt">What do you think?</p>
          </div>
          <div className="vote-buttons">
            <button 
              className="vote-button real"
              onClick={() => onVote(true)}  // User clicked "Real" → sends feedback "no"
            >
              Real
            </button>
            <button 
              className="vote-button fake"
              onClick={() => onVote(false)} // User clicked "Fake" → sends feedback "yes"
            >
              Fake
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
