import React, { useState } from 'react';
import { loginUser } from '../services/api';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await loginUser(formData);
        if (response.success) {
          setIsLoggedIn(true);
        } else {
          setErrors({ submit: response.message || 'Invalid credentials' });
        }
      } catch (error) {
        setErrors({ submit: 'Failed to login. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {isLoggedIn ? (
        <div className="success-message">
          <h3>Welcome back, {formData.username}!</h3>
          <p>You have successfully logged in.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-username">Username:</label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              data-cy="login-username-input"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              data-cy="login-password-input"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <button 
            type="submit" 
            data-cy="login-submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Login; 