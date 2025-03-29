import React from 'react';
import { useNavigate } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Landing.css";
import deepfakeCard2 from "../assets/deepfake_card2.jpg";
import deepfakeCard3 from "../assets/deepfake_card3.jpg";
import deepfakeCard4 from "../assets/deepfake_card4.jpg";
import tick from "../assets/tick.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Login is clicked");
    navigate('/form');
  };

  return (
    <div className="landing-container">
      <div className="main-content">
        <header className="header">
          <div className="head-main">
            <h2>CustosAI</h2>
            <button className="connect-wallet">Connect Wallet</button>
          </div>
          <div className="one-liner">
            <h1 className="title">
              Ensuring Video Authenticity <br />
              For a Trusted World.
            </h1>
            <h1 className="subtitle">Secure your digital future with Core.</h1>
          </div>
          <div className="cards-container">
            {[deepfakeCard2, deepfakeCard3, deepfakeCard4].map((src, index) => (
              <div key={index} className={`card card-${index}`}>
                <img src={src} alt={`Crypto Dashboard ${index + 1}`} className="card-img" />
              </div>
            ))}
          </div>
        </header>
        <div className="middle-portion">
          <div className="left-side">
            <div className="points-above">
              <div className="point-item">
                <img src={tick} alt="Tick" className="tick-icon" />
                <p>Verification</p>
              </div>
              <div className="point-item">
                <img src={tick} alt="Tick" className="tick-icon" />
                <p>Forensic Analysis</p>
              </div>
            </div>
            <div className="points-below">
              <div className="point-item">
                <img src={tick} alt="Tick" className="tick-icon" />
                <p>Authenticity Validation</p>
              </div>
              <div className="point-item">
                <img src={tick} alt="Tick" className="tick-icon" />
                <p>Truth Detection</p>
              </div>
            </div>
          </div>
          <div className="login">
            <button className="login-button" onClick={handleClick}>
              Login to Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
