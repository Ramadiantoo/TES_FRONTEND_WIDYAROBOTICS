// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailPage from './pages/VehicleDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<VehicleListPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;