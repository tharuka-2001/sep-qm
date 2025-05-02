import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [activeForm, setActiveForm] = useState('login'); // 'login' or 'register'

  return (
    <div className="App">
      <header className="App-header">
        <h1>Authentication Demo</h1>
        <div className="form-switcher">
          <button 
            className={`switch-button ${activeForm === 'login' ? 'active' : ''}`}
            onClick={() => setActiveForm('login')}
            data-cy="switch-to-login"
          >
            Login
          </button>
          <button 
            className={`switch-button ${activeForm === 'register' ? 'active' : ''}`}
            onClick={() => setActiveForm('register')}
            data-cy="switch-to-register"
          >
            Register
          </button>
        </div>
        {activeForm === 'login' ? <Login /> : <Register />}
      </header>
    </div>
  );
}

export default App; 