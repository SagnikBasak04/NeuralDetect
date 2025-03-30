import React from 'react';
import './VideoModal.css';

interface VideoModalProps {
  video: {
    id: string;
    videoUrl: string;
    title: string;
    description: string;
    timestamp: string;
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
          <h2>{video.title}</h2>
          <div className="prediction-section">
            <p className="prediction-text">
              Our model has predicted this video to be{' '}
              <span className={isAuthentic ? 'real' : 'fake'}>
                {isAuthentic ? 'real' : 'fake'}
              </span>
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
              onClick={() => onVote(true)}
            >
              Real
            </button>
            <button 
              className="vote-button fake"
              onClick={() => onVote(false)}
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