import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/Homepage';
import Background from './Pages/Background';
import Tienda from './Pages/Tienda';
import Admin from './Pages/Admin';
import CarouselSuperior from './Components/CarouselSuperior';


function App() {
  return (
    <>
      <Navbar />
      <div className='pt-8'>
        <CarouselSuperior />
      </div>
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