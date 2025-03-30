import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './feedback.css';

interface FeedbackResponse {
  // Add your expected response fields here
  [key: string]: any;
}

const Feedback: React.FC = () => {
  const [response, setResponse] = useState<FeedbackResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Here you would typically fetch the response data
    // For now, we'll simulate it with a timeout
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        // const result = await yourApiCall();
        // setResponse(result);
        
        // Simulated response for testing
        setTimeout(() => {
          setResponse({
            status: "success",
            analysis: {
              authenticity: "verified",
              confidence: 0.95,
              details: "Video appears to be authentic"
            }
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="feedback-container">
        <h2 className="feedback-title">Analyzing Video...</h2>
        <div className="feedback-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Analysis Results</h2>
      <div className="feedback-content">
        <pre className="feedback-json">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Feedback;
