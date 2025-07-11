// src/App.jsx
import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />

    </Routes>
  );
}

export default App;

