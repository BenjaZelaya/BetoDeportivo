// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './Pages/HomePage';
import Background from './Pages/Background';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/Background" element={<Background />} />

    </Routes>
  );
}

export default App;

