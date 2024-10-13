import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Donations from './Components/Donations';
import Profile from './Components/Profile';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/*" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:transactionId" element={<Profile />} />
        <Route path="/donations/:transactionId" element={<Donations/>} />
      </Routes>
    </Router>
  );
}

export default App;