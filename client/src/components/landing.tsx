import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Landing.css"; 

const Landing: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="head-main">
            <h2> CustosAI</h2>
            <button className="connect-wallet">Connect Wallet</button>
          </div>      
            <div className="one-liner">
                <h1 className="title">Ensuring Video Authenticity <br/>For a Trusted World.</h1>
                <h1 className="subtitle"> Secure your digital future with Core.</h1>
            </div>
            <div className="cards-container">
        
          {[
            "https://storage.googleapis.com/a1aa/image/VzyP6F8wYtbRyZM1xDSKas4Q9w4rOzDJKRlzc01Cvbs.jpg",
            "https://storage.googleapis.com/a1aa/image/owIZpzynsowKSdSx7PpnVwKVYR5MEnQbb63Q2o5neDo.jpg",
            "https://storage.googleapis.com/a1aa/image/N-BFLKaYL9IVGr33bT1PhPAQQtxhS8MYaUTUz_KoFxM.jpg",
          ].map((src, index) => (
            <div key={index} className={`card card-${index}`}>
              <img src={src} alt={`Crypto Dashboard ${index + 1}`} className="card-img" />
            </div>
          ))}
        </div>

        </header>
        {/* Cards Section */}

        <div className="middle-portion">
            <div className="left-side">
            <h1 className="subtitle"> Secure your digital future with Core.</h1>

            </div>
        
        </div>
        <div>
            <h1>hjksagfkg</h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;
