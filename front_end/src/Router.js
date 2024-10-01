// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Example Home component
import Login from './components/login'; // Example Login component
import Signup from './components/Singup'; // Example Signup component
import MultiStepForm from './components/create_portfolio/MultiStepForm'; // Example Signup component

function AppRouter() {
  return (
    <Routes>
      {/* Define your routes */}
      <Route path="/" element={<Home />} />         {/* Renders Home component at "/" */}
      <Route path="/login" element={<Login />} />   {/* Renders Login component at "/login" */}
      <Route path="/signup" element={<Signup />} /> {/* Renders Signup component at "/signup" */}
      <Route path="/multistepform" element={<MultiStepForm />} /> {/* Renders Signup component at "/signup" */}
    </Routes>
  );
}

export default AppRouter;
