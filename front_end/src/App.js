import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to detect the current route
import AppRouter from './Router';
import Login from './components/login';
// import Signup from './components/Singup'; // Import the Signup component

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const location = useLocation(); // Get the current location

  function checkAuthStatus() {
    if (sessionStorage.getItem('token')) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if the current route is "/signup" or "/login"
  const isAuthRoute = location.pathname === '/signup' || location.pathname === '/login';

  return (
    <div className="App">
      {isConnected || isAuthRoute ? <AppRouter /> : <Login onLoginSuccess={checkAuthStatus} />}
    </div>
  );
}

export default App;
