
import { useState } from 'react';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';

function App() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? (
        <Register onSwitch={() => setIsRegister(false)} />
      ) : (
        <Login onSwitch={() => setIsRegister(true)} />
      )}
    </>
  );
}

export default App;
