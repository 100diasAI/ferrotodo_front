import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../../redux/actions/checkout";
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import './UserManagement.css';

export default function UserManagement() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        telefono: '',
        contraseña: '',
        direccion: '',
        isAdmin: false,
        confirmado: true
    });

    useEffect(() => {
        dispatch(getUsuarios());
    }, [dispatch]);

    const usuarios = useSelector((state) => state.checkout.usuarios);

    const columns = [
        {
            name: 'Nombre',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Apellido',
            selector: row => row.apellido,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.mail,
            sortable: true,
        },
        {
            name: 'Teléfono',
            selector: row => row.telefono || 'N/A',
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.confirmado ? 'Activo' : 'Pendiente',
            sortable: true,
        },
        {
            name: 'Rol',
            selector: row => row.isAdmin ? 'Administrador' : 'Usuario',
            sortable: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <div>
                    <button onClick={() => handleEdit(row)} className="btn-edit">Editar</button>
                    <button onClick={() => handleDelete(row)} className="btn-delete">Eliminar</button>
                </div>
            ),
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://ferretodo.onrender.com/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Usuario creado exitosamente');
                setIsModalOpen(false);
                dispatch(getUsuarios());
                setFormData({
                    nombre: '',
                    apellido: '',
                    mail: '',
                    telefono: '',
                    contraseña: '',
                    direccion: '',
                    isAdmin: false,
                    confirmado: true
                });
            } else {
                toast.error('Error al crear usuario');
            }
        } catch (error) {
            toast.error('Error al crear usuario');
        }
    };

    return (
        <div className="user-management">
            <div className="header">
                <h2>Gestión de Usuarios</h2>
                <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                    Nuevo Usuario
                </button>
            </div>

            <DataTable
                columns={columns}
                data={usuarios}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                noDataComponent="No hay usuarios para mostrar"
            />

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Crear Nuevo Usuario</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={formData.mail}
                                    onChange={(e) => setFormData({...formData, mail: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Teléfono:</label>
                                <input
                                    type="tel"
                                    value={formData.telefono}
                                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Dirección:</label>
                                <input
                                    type="text"
                                    value={formData.direccion}
                                    onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Contraseña:</label>
                                <input
                                    type="password"
                                    value={formData.contraseña}
                                    onChange={(e) => setFormData({...formData, contraseña: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={formData.isAdmin}
                                        onChange={(e) => setFormData({...formData, isAdmin: e.target.checked})}
                                    />
                                    Es Administrador
                                </label>
                            </div>
                            <div className="button-group">
                                <button type="button" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </button>
                                <button type="submit">
                                    Crear Usuario
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
