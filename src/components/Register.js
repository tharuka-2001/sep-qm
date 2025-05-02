import React, { useState } from 'react';
import { registerUser, validateUsername } from '../services/api';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'username' && value.length > 2) {
      try {
        const response = await validateUsername(value);
        setUsernameAvailable(response.available);
      } catch (error) {
        console.error('Error checking username:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!usernameAvailable) {
      newErrors.username = 'Username is not available';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await registerUser(formData);
        if (response.success) {
          setIsSubmitted(true);
        }
      } catch (error) {
        setErrors({ submit: 'Failed to register. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      {isSubmitted ? (
        <div className="success-message">
          <h3>Registration Successful!</h3>
          <p>Welcome, {formData.username}!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              data-cy="username-input"
              className={!usernameAvailable ? 'error-input' : ''}
            />
            {errors.username && <span className="error">{errors.username}</span>}
            {formData.username.length > 2 && !usernameAvailable && (
              <span className="error">Username is not available</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              data-cy="email-input"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              data-cy="password-input"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              data-cy="confirm-password-input"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <button 
            type="submit" 
            data-cy="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}

export default Register; 