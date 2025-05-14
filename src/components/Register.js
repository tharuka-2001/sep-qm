import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!formData.username) return;
    fetch(`/api/check-username/${formData.username}`)
      .then(r => r.json())
      .then(json => setUsernameAvailable(json.available))
      .catch(() => setUsernameAvailable(null));
  }, [formData.username]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!json.success) {
        setErrors({ general: json.message });
      } else {
        alert('Registration successful! Please login.');
      }
    } catch (err) {
      setErrors({ general: err.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <Link to="/login"><button>Login</button></Link>
        <button className="active">Register</button>
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
            data-cy="register-username-input"
            value={formData.username}
            onChange={handleChange}
          />
          {usernameAvailable === false && (
            <p style={{ color: 'tomato' }} data-cy="username-availability-error">
              Username already taken
            </p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            data-cy="register-email-input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            data-cy="register-password-input"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            data-cy="register-confirm-password-input"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'tomato' }} data-cy="password-mismatch-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="submit-button"
          data-cy="register-submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
