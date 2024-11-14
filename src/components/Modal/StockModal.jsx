import React, { useState } from 'react';
import './Modal.css';

export default function StockModal({ isOpen, onClose, product, onSave }) {
    const [stockData, setStockData] = useState({
        nuevoStock: product?.stock || 0,
        stockMinimo: product?.stockMinimo || 0,
        motivo: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...stockData,
            productId: product.id
        });
    };

    return (
        <div className="modal">
            <div className="contentModal">
                <button className="cerrar" onClick={onClose}>X</button>
                <form className="formulario" onSubmit={handleSubmit}>
                    <h3>Ajustar Stock: {product.nombre}</h3>
                    
                    <label>Stock Actual: {product.stock}</label>
                    
                    <label>Nuevo Stock:</label>
                    <input
                        type="number"
                        value={stockData.nuevoStock}
                        onChange={e => setStockData({...stockData, nuevoStock: parseInt(e.target.value)})}
                        min="0"
                        required
                    />
                    
                    <label>Stock Mínimo:</label>
                    <input
                        type="number"
                        value={stockData.stockMinimo}
                        onChange={e => setStockData({...stockData, stockMinimo: parseInt(e.target.value)})}
                        min="0"
                        required
                    />
                    
                    <label>Motivo:</label>
                    <textarea
                        value={stockData.motivo}
                        onChange={e => setStockData({...stockData, motivo: e.target.value})}
                        required
                    />
                    
                    <div>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        <button type="submit">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
