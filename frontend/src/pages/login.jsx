import { useState } from 'react';

function Login({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Unable to connect to server.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Student Management System</h1>
        <p>Welcome back! Please login.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}
        <p>
            Don't have an account?{' '}
            <button type="button" onClick={onSwitch}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default Login;