import { useState } from 'react';

function Register({ onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed');
        return;
      }

      setMessage('Registration successful! Please login.');
    } catch (error) {
      setMessage('Unable to connect to server.');
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h1>Create Account</h1>
      <p className="login-subtitle">
        Register to manage your student records.
      </p>

      <form onSubmit={handleRegister}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit">Register</button>
      </form>

      {message && <p className="login-message">{message}</p>}

      <p className="register-link">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch}>Login</button>
      </p>
    </div>
  </div>
);
}

export default Register;