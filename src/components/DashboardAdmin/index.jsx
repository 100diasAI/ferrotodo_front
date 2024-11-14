import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom'
import Users from '../../pages/Admin/users'
import Products from '../../pages/Admin/products'
import Sales from '../../pages/Admin/sales';
import Admin from '../../pages/Admin';
import './Dashboard.css'
import { ToastContainer } from 'react-toastify';
import Bitacora from '../../pages/Admin/Bitacora';
import Stock from '../../pages/Admin/stock';
import UserManagement from '../../pages/Admin/UserManagement';
export default function DashboardAdmin({theme}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='contenedor'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                progress={undefined}
                theme={theme === 'light' ? 'light' : 'dark'}
            />
            <button className="menu-toggle" onClick={toggleMenu}>
                ☰
            </button>
            <div className={`sideBar ${isOpen ? 'open' : ''}`}>
                <h1>MENU</h1>
                <Link to="/admin/dashboard/" onClick={toggleMenu}>Inicio</Link>
                <Link to="/admin/dashboard/users" onClick={toggleMenu}>Roles</Link>
                <Link to="/admin/dashboard/products" onClick={toggleMenu}>Productos</Link>
                <Link to="/admin/dashboard/sales" onClick={toggleMenu}>Pedidos</Link>
                <Link to="/admin/dashboard/bitacora" onClick={toggleMenu}>Bitácora</Link>
                <Link to="/admin/dashboard/stock" onClick={toggleMenu}>Stock</Link>
                <Link to="/admin/dashboard/usuario" onClick={toggleMenu}>Usuarios</Link>
            </div>
            <div className={`body ${isOpen ? 'shifted' : ''}`}>
                <Routes>
                    <Route path="/" element={<Admin />} />
                    <Route path="users" element={<Users />} />
                    <Route path="products" element={<Products />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="bitacora" element={<Bitacora />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="usuario" element={<UserManagement />} />
                </Routes>
            </div>
        </div>
    )
}
