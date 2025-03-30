import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin'; // Adjust the path as necessary

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError(null);
    await login({ email, password });
    // Navigate to the feed after successful login
    navigate('/feed');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>LOGIN</h2>
        <div className="form-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button 
          type="submit" 
          className="login-button-login-page"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;
