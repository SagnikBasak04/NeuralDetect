import React, { useState } from 'react';
import './Feed.css';
import VideoModal from './VideoModal';

interface VideoPost {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  timestamp: string;
  isAuthentic: boolean;
  realCount: number;
  fakeCount: number;
}

const Feed: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPost | null>(null);

  // Mock data - replace with backend data later
  const videos: VideoPost[] = [
    {
      id: '1',
      videoUrl: 'https://example.com/video1.mp4',
      title: 'First Video',
      description: 'This is a sample video description',
      timestamp: '2024-03-29',
      isAuthentic: true,
      realCount: 150,
      fakeCount: 30
    },
    {
      id: '2',
      videoUrl: 'https://example.com/video2.mp4',
      title: 'Second Video',
      description: 'Another sample video description',
      timestamp: '2024-03-29',
      isAuthentic: false,
      realCount: 45,
      fakeCount: 200
    },
    {
      id: '3',
      videoUrl: 'https://example.com/video3.mp4',
      title: 'Third Video',
      description: 'Yet another sample video description',
      timestamp: '2024-03-29',
      isAuthentic: true,
      realCount: 300,
      fakeCount: 50
    },
    {
      id: '4',
      videoUrl: 'https://example.com/video4.mp4',
      title: 'Fourth Video',
      description: 'One more sample video description',
      timestamp: '2024-03-29',
      isAuthentic: false,
      realCount: 60,
      fakeCount: 180
    }
  ];

  const handleVideoClick = (video: VideoPost) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const handleVote = (isReal: boolean) => {
    // This will be replaced with actual API call later
    console.log(`Voted ${isReal ? 'real' : 'fake'} for video ${selectedVideo?.id}`);
    handleCloseModal();
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Video Feed</h1>
      </div>
      <div className="feed-grid">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="video-card"
            onClick={() => handleVideoClick(video)}
          >
            <div className="video-container">
              <video
                src={video.videoUrl}
                controls
                className="video-player"
                poster="https://via.placeholder.com/300x300"
              />
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <span className="timestamp">{video.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={handleCloseModal}
          isAuthentic={selectedVideo.isAuthentic}
          realCount={selectedVideo.realCount}
          fakeCount={selectedVideo.fakeCount}
          onVote={handleVote}
        />
      )}
    </div>
  );
};

export default Feed; 