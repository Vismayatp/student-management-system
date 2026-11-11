
import { useState } from 'react';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';
import './App.css';

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem('token'))
  );

  if (isLoggedIn) {
  return (
    <Dashboard
      onLogout={() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }}
    />
  );
}

  return (
    <>
      {isRegister ? (
        <Register onSwitch={() => setIsRegister(false)} />
      ) : (
        <Login
          onSwitch={() => setIsRegister(true)}
          onLogin={() => setIsLoggedIn(true)}
        />
      )}
    </>
  );
}

export default App;
