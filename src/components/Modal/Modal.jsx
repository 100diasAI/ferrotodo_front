import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, updateProduct, getProduct } from "../../redux/actions/product"
import { useNavigate } from 'react-router-dom'; 

import './Modal.css'
import { toast } from "react-toastify";

export default function Modal({ cambiarEstado, submit, datos }) {
    const dispatch = useDispatch();
    const navigateTo  = useNavigate()
    const categorias = useSelector(state => state.product.allCategories);
    const [form, setForm] = useState({
        id: datos.id,
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion,
        imagen: datos.urlimagen,
        precio: datos.precio,
        stock: datos.stock || 0,
        categoria: datos.categoria,
        subcategoria: datos.subcategoria,
        marca: datos.marca
    })

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    function handleSubmit(e) {
        e.preventDefault();
        const producto = {
            id: datos.id,
            nombre: form.nombre,
            precio: form.precio,
            descripcion: form.descripcion,
            urlimagen: form.imagen,
            stock: form.stock,
            categoria: form.categoria,
            subcategoria: form.subcategoria,
            marca: form.marca
        }
        dispatch(updateProduct(producto))
        toast.success('Editado')
        cambiarEstado(false)
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="modal" >
                <div className='contentModal'>
                    <button className='cerrar' onClick={() => cambiarEstado(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                    <div id="contenedorForm" >
                        <form className="formulario" onSubmit={handleSubmit} style={{backgroundColor:"#fff"}}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <label htmlFor="descripcion">Descripción:</label>
                            <textarea
                                style={{resize: "none", borderRadius:"8px"}}
                                rows="10"
                                cols="50"
                                id="descripcion"
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                            />

                            <label htmlFor="imagen">URL de la imagen:</label>
                            <input
                                type="text"
                                id="imagen"
                                name="imagen"
                                value={form.imagen}
                                onChange={handleChange}
                            />

                            <label htmlFor="stock">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                            />

                            <label htmlFor="precio">Precio:</label>
                            <input
                                type="number"
                                id="precio"
                                name="precio"
                                value={form.precio}
                                onChange={handleChange}
                            />

                            <label htmlFor="categoria">Categoría:</label>
                            <select id="selectCat" name="categoria" value={form.categoria} onChange={handleChange}>
                                {
                                    categorias?.map((c, i) => (
                                        <option key={i} value={c}>{c}</option>
                                    ))
                                }
                            </select>

                            <label htmlFor="subcategoria">Subcategoría:</label>
                            <input
                                type="text"
                                id="subcategoria"
                                name="subcategoria"
                                value={form.subcategoria}
                                onChange={handleChange}
                            />

                            <label htmlFor="marca">Marca:</label>
                            <input
                                type="text"
                                id="marca"
                                name="marca"
                                value={form.marca}
                                onChange={handleChange}
                            />

                            <button type="submit">Editar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}