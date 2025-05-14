import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function NotFound() {
  return (
    <div className="auth-card">
      <h2>404 - Page Not Found</h2>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" end data-cy="nav-home">
          Home
        </NavLink>
        <NavLink to="/login" data-cy="nav-login">
          Login
        </NavLink>
        <NavLink to="/register" data-cy="nav-register">
          Register
        </NavLink>
      </nav>

      <div className="auth-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Show 404 for any other path */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
