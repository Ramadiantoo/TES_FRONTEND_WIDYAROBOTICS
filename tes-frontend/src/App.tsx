// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VehicleListPage from './pages/VehicleListPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import Layout from './components/Layout'; // Import komponen Layout

function App() {
  return (
    <Router>
      <Layout> {/* Gunakan Layout di sini */}
        <Routes>
          <Route path="/" element={<VehicleListPage />} />
          <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
          {/* Tambahkan rute lain jika ada */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;