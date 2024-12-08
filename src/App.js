// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OfferCard from './OfferCard';  // Import OfferCard
import OfferForm from './OfferForm';  // Import OfferForm

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<OfferCard />} />  {/* Render OfferCard on the root route */}
          <Route path="/offer-form" element={<OfferForm />} />  {/* Render OfferForm on the /offer-form route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
