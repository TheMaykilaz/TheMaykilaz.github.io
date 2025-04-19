import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Bookings from './pages/Bookings';
import About from './pages/About';
import Home from './pages/Home';
import CarList from './components/CarList';
import './App.css';
import './design/Bookings.css';
import './design/About.css';
import './design/CarGrid.css';
import './design/CarItem.css';
import './design/Footer.css';
import './design/Header.css';
import NotFound from './pages/NotFound';


function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} /> {}
              <Route path="/cars" element={<CarList />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;