import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {Dashboard} from './Dashboard.js'
// const coins = 

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<Dashboard />} />
      </Routes>
    </Router>

  );
}




export default App;