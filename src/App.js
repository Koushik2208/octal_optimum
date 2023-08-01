import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';

const AppRouter = () => {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        {/* <Route component={NotFound} /> */}
      </Routes >
    </Router>
  );
};

export default AppRouter;
