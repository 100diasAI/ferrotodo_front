import { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategories} from "../../redux/actions/product"
import './form.css'

function validate(form){
    let errors = {};
    if (!form.nombre) {
        errors.nombre = "Se requiere un nombre";
    }
    if (!form.descripcion) {
        errors.descripcion = "Se requiere una descripcion";
    }
    if (!form.imagen) {
        errors.imagen = "Se requiere una imagen";
    }
    if(form.precio < 1) {errors.precio = "El precio debe ser mayor a 0"}
    if (!form.precio) {
        errors.precio = "Se debe ingresar el precio"
    }
    if (!form.stock) {
        errors.stock = "Se debe ingresar stock"
    }
    if (!form.categoria) {
        errors.categoria = "Se debe especificar categoria"
    }
    if(form.stock < 0) {
        errors.stock = "El stock debe ser mayor o igual a 0";
    }
    return errors;
};

export default function EditForm({ submit, datos }) {
    const dispatch = useDispatch();
    const categorias = useSelector(state => state.product.allCategories);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        imagen: datos.urlimagen,
        categoria: datos.categoria,
        idcategoria: datos.idcategoria,
        marca: datos.marca,
        subcategoria: datos.subcategoria,
        precio: datos.precio,
        stock: datos.stock,
        medidas: datos.medidas || ""
    })
    const [botonBloqueado, setBotonBloqueado] = useState("disabled");

    useEffect(
        () => {
            if(Object.keys(errors).length > 0 || !form.nombre || !form.descripcion || !form.imagen || !form.precio || !form.stock || !form.categoria){
                setBotonBloqueado("disabled");
            } else {
                setBotonBloqueado("");
            }
        }, [errors, form]
    )

    useEffect(() => {
        dispatch(getCategories());
    },[dispatch])

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const producto = {
            nombre: form.nombre,
            descripcion: form.descripcion,
            categoria: form.categoria,
            idcategoria: form.idcategoria,
            marca: form.marca,
            subcategoria: form.subcategoria,
            precio: parseFloat(form.precio),
            stock: parseInt(form.stock),
            medidas: form.medidas,
            urlimagen: form.imagen
        }
        submit(producto)
    }

    return (
        <div id="contenedorForm">
            <form style={{overflow:"hidden"}} className="formulario" onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder={datos.nombre}
                />
                {errors.nombre && (
                        <p className="errors">{errors.nombre}</p>
                    )}
                <label>Descripcion</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="descripcion"
                />
                {errors.descripcion && (
                        <p className="errors">{errors.descripcion}</p>
                    )}
                <label>Imagen (URL)</label>
                <input
                    name="imagen"
                    type="text"
                    value={form.imagen}
                    onChange={handleChange}
                    placeholder="URL de la imagen"
                />
                {errors.imagen && (
                        <p className="errors">{errors.imagen}</p>
                    )}
                <label>Medidas</label>
                <input
                    name="medidas"
                    type="text"
                    value={form.medidas}
                    onChange={handleChange}
                    placeholder="Medidas"
                />
                {errors.medidas && (
                        <p className="errors">{errors.medidas}</p>
                    )}
                <label>Stock</label>
                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                />
                {errors.stock && (
                        <p className="errors">{errors.stock}</p>
                    )}
                <label>Precio</label>
                <input
                    name="precio"
                    type="number"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="Precio"
                />
                {errors.precio && (
                        <p className="errors">{errors.precio}</p>
                    )}
                <label>Categoria</label>
                <select id="selectCat" name="categoria" value={form.categoria} onChange={handleChange}>
                    {
                        categorias?.map((c,i) => {
                            return(
                                <option key={i}>{c}</option>
                            )
                        })
                    }
                </select>
                {errors.categoria && (
                        <p className="errors">{errors.categoria}</p>
                    )}
                <label>Marca</label>
                <input
                    name="marca"
                    type="text"
                    value={form.marca}
                    onChange={handleChange}
                    placeholder="Marca"
                />
                {errors.marca && (
                        <p className="errors">{errors.marca}</p>
                    )}
                <label>Subcategoría</label>
                <input
                    name="subcategoria"
                    type="text"
                    value={form.subcategoria}
                    onChange={handleChange}
                    placeholder="Subcategoría"
                />
                {errors.subcategoria && (
                    <p className="errors">{errors.subcategoria}</p>
                )}
                <label>ID Categoría</label>
                <input
                    name="idcategoria"
                    type="text"
                    value={form.idcategoria}
                    onChange={handleChange}
                    placeholder="ID Categoría"
                />
                {errors.idcategoria && (
                    <p className="errors">{errors.idcategoria}</p>
                )}
                <button 
                    id={botonBloqueado !== "disabled" ? "boton" : "botonBloqueado"}
                    disabled={botonBloqueado}>Actualizar</button>
            </form>
        </div>
    )
}