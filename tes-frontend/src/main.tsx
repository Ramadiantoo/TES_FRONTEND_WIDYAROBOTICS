// D:\TES_FRONTEND_WIDYAROBOTICS\tes-frontend\src\main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import Layout from './components/Layout'; 
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
        <Layout> 
          <Routes>
            <Route path="/" element={<VehicleListPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="*" element={<h1 className="text-center mt-20 text-3xl font-bold">404 - Halaman Tidak Ditemukan</h1>} />
          </Routes>
        </Layout>
      </Router>
  </React.StrictMode>,
);