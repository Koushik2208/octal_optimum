import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import UserDetails from './components/UserDetails.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/user_details/:id" element={<UserDetails />} />
      </Routes >
    </Router>
  );
};

export default AppRouter;
