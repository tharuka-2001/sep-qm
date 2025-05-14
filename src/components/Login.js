import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!json.success) {
        setErrors({ general: json.message });
      } else {
        setUser(json.data);
      }
    } catch (err) {
      setErrors({ general: err.message || 'Login failed' });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <div className="auth-card">
        <h2>Welcome, {user.username}!</h2>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-header">
        <button className="active">Login</button>
        <Link to="/register"><button>Register</button></Link>
      </div>

      <form onSubmit={handleSubmit}>
        {errors.general && (
          <p style={{ color: 'tomato', marginBottom: '1rem' }} data-cy="error-message">
            {errors.general}
          </p>
        )}
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            data-cy="login-username-input"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            data-cy="login-password-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          data-cy="login-submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in…' : 'Login'}
        </button>
      </form>
    </div>
  );
}
