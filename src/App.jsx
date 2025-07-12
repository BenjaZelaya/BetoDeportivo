// src/App.jsx
import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import Background from './Pages/Background';
import Tienda from './Pages/Tienda';
import Admin from './Pages/Admin';


function App() {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Background" element={<Background />} />
      <Route path="/Tienda" element={<Tienda />} />
      <Route path="/Admin" element={<Admin />} />

    </Routes>
    
    </>
  );
}

export default App;

