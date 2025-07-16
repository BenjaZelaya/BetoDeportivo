import { h1 } from 'framer-motion/client'
import React from 'react'
import CrearProducto from '../Components/Admin/CrearProducto'
import Admintabla from '../Components/Admin/AdminTabla'


const Admin = () => {
  return (
    <>
    <div className="pt-32">
    <h1>Admin</h1>
    <CrearProducto />
    <Admintabla/>

    </div>
    </>
  )
}

export default Admin