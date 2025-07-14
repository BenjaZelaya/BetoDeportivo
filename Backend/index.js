const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());

// Middleware para JSON solo en rutas sin archivos:
app.use(express.json());

// Configurar multer para guardar archivos en uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Guardar con timestamp para evitar nombres repetidos
    const ext = path.extname(file.originalname);
    const nombreArchivo = `${Date.now()}${ext}`;
    cb(null, nombreArchivo);
  }
});
const upload = multer({ storage });

// Archivo JSON productos
const archivoProductos = path.join(__dirname, 'productos.json');
let productos = [];
let idCounter = 1;

function cargarProductos() {
  if (fs.existsSync(archivoProductos)) {
    const data = fs.readFileSync(archivoProductos, 'utf-8');
    productos = JSON.parse(data);
    idCounter = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  } else {
    productos = [];
    idCounter = 1;
  }
}
function guardarProductos() {
  fs.writeFileSync(archivoProductos, JSON.stringify(productos, null, 2), 'utf-8');
}
cargarProductos();

// Ruta para servir imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST para crear producto con imagen
app.post('/api/productos', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, precio, stock, sexo, categoria } = req.body;

  if (!nombre || !descripcion || !precio || !stock || !sexo || !categoria || !req.file) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const imagenUrl = `/uploads/${req.file.filename}`;

  const nuevoProducto = {
    id: idCounter++,
    nombre,
    descripcion,
    precio: parseFloat(precio),
    stock: parseInt(stock),
    sexo,
    categoria,
    imagenUrl
  };

  productos.push(nuevoProducto);
  guardarProductos();

  res.status(201).json(nuevoProducto);
});


app.get('/api/productos', (req, res) => {
  res.json(productos);
});
// Buscar productos por nombre
app.get('/api/productos/buscar', (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === "") {
    return res.status(400).json({ message: 'El término de búsqueda es obligatorio' });
  }

  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(q.toLowerCase())
  );

  res.json(resultado);
});

app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });

  productos.splice(index, 1);
  guardarProductos();
  res.json({ message: 'Producto eliminado correctamente' });
});


// Buscar producto por ID
app.get('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.json(producto);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});
