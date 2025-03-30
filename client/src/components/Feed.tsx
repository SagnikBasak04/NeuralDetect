import React, { useEffect, useState } from 'react';
import './Feed.css';
import VideoModal from './VideoModal';

interface VideoPost {
  _id: string;
  userId: string;
  videoUrl: string;
  modelResult: string;
  positiveReviews: number;
  negativeReviews: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface FeedResponse {
  totalPages: number;
  currentPage: number;
  totalUploads: number;
  uploads: VideoPost[];
}

const Feed: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPost | null>(null);
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the feed from the backend endpoint
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/upload/feed/67e831f56a6978339e7b00e4');
        if (!response.ok) {
          throw new Error("Failed to fetch feed data");
        }
        const data: FeedResponse = await response.json();
        setVideos(data.uploads);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching feed data");
      }
    };
    fetchFeed();
  }, []);

  const handleVideoClick = (video: VideoPost) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  // If user clicks "Real", then send feedback "no". If "Fake", send feedback "yes".
  const handleVote = async (isReal: boolean) => {
    if (!selectedVideo) return;
    const feedback = isReal ? "no" : "yes";
    try {
      const response = await fetch("http://localhost:5000/api/v1/upload/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedVideo._id, feedback }),
      });
      if (!response.ok) {
        throw new Error("Feedback submission failed");
      }
      const data = await response.json();
      console.log("Feedback response:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Video Feed</h1>
      </div>
      {error && <div className="feed-error">{error}</div>}
      <div className="feed-grid">
        {videos.map((video) => (
          <div 
            key={video._id} 
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
              <div className="model-result">
                {video.modelResult.toLowerCase() === "fake" ? (
                  <span className="warning">Fake</span>
                ) : (
                  <span className="success">Real</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={handleCloseModal}
          // If modelResult is "fake", then the video is not authentic.
          isAuthentic={selectedVideo.modelResult.toLowerCase() !== "fake"}
          realCount={selectedVideo.positiveReviews}
          fakeCount={selectedVideo.negativeReviews}
          onVote={handleVote}
        />
      )}
    </div>
  );
};

export default Feed;
