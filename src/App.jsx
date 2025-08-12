import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Homepage';
import Background from './Pages/Background';
import Tienda from './Pages/Tienda';
import Producto from './Pages/Producto';
import Carrito from './Pages/Carrito';
import Favoritos from './Pages/Favoritos';
import Admin from './Pages/Admin';
import Register from './Pages/Login/Register';
import Login from './Pages/Login/Login';
import CarouselSuperior from './Components/CarouselSuperior';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


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
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/hombre" element={<Tienda sexoFijo="hombre" />} />
        <Route path="/mujer" element={<Tienda sexoFijo="mujer" />} />
        <Route path="/nino" element={<Tienda sexoFijo="niño" />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;