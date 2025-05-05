// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Bookings from './pages/Bookings';
import About from './pages/About';
import Home from './pages/Home';
import CarList from './components/CarList';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import './App.css';
import './design/Bookings.css';
import './design/About.css';
import './design/CarGrid.css';
import './design/CarItem.css';
import './design/Footer.css';
import './design/Header.css';

function App() {
  return (
      <AuthProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<CarList />} />
                  <Route path="/bookings" element={<Bookings />} />

                  <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
  );
}

export default App;
