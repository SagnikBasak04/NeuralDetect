import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from "../components/landing";
import Form from '../components/form';
import Feed from '../components/Feed';
import Login from '../components/Login';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/form" element={<Form />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
