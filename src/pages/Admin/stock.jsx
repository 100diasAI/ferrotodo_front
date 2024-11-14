import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/product";
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import './stock.css';

export default function Stock() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const products = useSelector((state) => state.product.allProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [localProducts, setLocalProducts] = useState([]);

    useEffect(() => {
        // Cargar productos del localStorage o del estado global
        const savedProducts = localStorage.getItem('stockProducts');
        if (savedProducts) {
            setLocalProducts(JSON.parse(savedProducts));
        } else if (products.length) {
            setLocalProducts(products);
            localStorage.setItem('stockProducts', JSON.stringify(products));
        }
        setLoading(false);
    }, [products]);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    const handleSave = (formData) => {
        const updatedProducts = localProducts.map(product => 
            product.id === selectedProduct.id 
                ? { 
                    ...product, 
                    stock: parseInt(formData.stock),
                    stockMinimo: parseInt(formData.stockMinimo)
                  }
                : product
        );

        setLocalProducts(updatedProducts);
        localStorage.setItem('stockProducts', JSON.stringify(updatedProducts));
        toast.success('Stock actualizado correctamente');
        setIsEditing(false);
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '80px'
        },
        {
            name: 'Producto',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'Stock Actual',
            selector: row => row.stock,
            sortable: true,
            width: '120px'
        },
        /* {
            name: 'Stock Mínimo',
            selector: row => row.stockMinimo || 0,
            sortable: true,
            width: '120px'
        }, */
        {
            name: 'Estado',
            cell: row => (
                <span className={row.stock <= (row.stockMinimo || 0) ? 'estado-bajo' : 'estado-ok'}>
                    {row.stock <= (row.stockMinimo || 0) ? 'Stock Bajo' : 'OK'}
                </span>
            ),
            width: '100px'
        },
        {
            name: 'Acciones',
            cell: row => (
                <button 
                    className="btn-ajustar"
                    onClick={() => handleEdit(row)}
                >
                    Ajustar Stock
                </button>
            ),
            width: '150px'
        }
    ];

    return (
        <div className="stock-container">
            <h2>Gestión de Stock</h2>
            
            <DataTable
                columns={columns}
                data={localProducts}
                pagination
                paginationPerPage={10}
                progressPending={loading}
            />

            {isEditing && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Ajustar Stock: {selectedProduct?.nombre}</h3>
                        <StockForm 
                            product={selectedProduct}
                            onSave={handleSave}
                            onClose={() => setIsEditing(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function StockForm({ product, onSave, onClose }) {
    const [formData, setFormData] = useState({
        stock: product.stock,
        stockMinimo: product.stockMinimo || 0,
        motivo: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="stock-form">
            <div className="form-group">
                <label>Stock Actual:</label>
                <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label>Stock Mínimo:</label>
                <input
                    type="number"
                    value={formData.stockMinimo}
                    onChange={(e) => setFormData({...formData, stockMinimo: e.target.value})}
                    min="0"
                    required
                />
            </div>

            <div className="form-group">
                <label>Motivo del ajuste:</label>
                <textarea
                    value={formData.motivo}
                    onChange={(e) => setFormData({...formData, motivo: e.target.value})}
                    required
                />
            </div>

            <div className="button-group">
                <button type="button" onClick={onClose} className="btn-cancelar">
                    Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                    Guardar
                </button>
            </div>
        </form>
    );
}
