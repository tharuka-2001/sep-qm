import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Home() {
  return (
    <div className="auth-card">
      <h2>Welcome to Auth Demo</h2>
      <p style={{ color: '#ccc', margin: '1rem 0' }}>
        Securely sign in to access your dashboard, manage your settings,
        and protect your data.
      </p>
      <Link to="/login" className="submit-button" data-cy="home-cta-login">
        Get Started
      </Link>
    </div>
  );
}
