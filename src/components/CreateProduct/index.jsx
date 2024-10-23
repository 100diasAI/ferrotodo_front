import React from 'react';
import { useDispatch } from 'react-redux';
import { postProduct } from '../../redux/actions/product';
import Form from './form';

export default function CreateProduct() {
    const dispatch = useDispatch();

    const submit = async (product) => {
        try {
            await dispatch(postProduct(product));
            return true;
        } catch (error) {
            console.error("Error en la creación del producto:", error);
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
