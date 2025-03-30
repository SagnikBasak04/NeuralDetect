import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
      const navigate = useNavigate();
      const handleClick = () => {
        console.log("Feed is clicked");
        navigate('/feed');
      };
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username && password) {
      // Here you would typically call your authentication API
      console.log('Username:', username);
      console.log('Password:', password);
      setError(null);
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>LOGIN</h2>
        <div className="form-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button-login-page" onClick={handleClick}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
