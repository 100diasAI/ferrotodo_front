import React from 'react';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../redux/actions/product';
import Form from './form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submit = async (product) => {
        try {
            const response = await dispatch(postProduct(product));
            toast.success('Producto creado exitosamente!');
            navigate('/admin/dashboard/products');
            return response;
        } catch (error) {
            toast.error('Error al crear el producto: ' + error.message);
            throw error;
        }
    }

    return (
        <div>
            <h2>Crear Producto</h2>
            <Form submit={submit} />
        </div>
    )
}
