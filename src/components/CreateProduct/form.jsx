import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/product"
import './form.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
    if (!form.subcategoria) {
        errors.subcategoria = "Se debe especificar subcategoría"
    }
    if(form.stock < 0) {
        errors.stock = "El stock debe ser mayor o igual a 0";
    }
    return errors;
};

export default function Form({ submit }) {
    const dispatch = useDispatch();
    const subcategorias = useSelector(state => state.product.allCategories);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        subcategoria: "",
        marca: "",
        precio: "",
        stock: 0,
        medidas: ""
    })
    const [botonBloqueado, setBotonBloqueado] = useState("disabled");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(Object.keys(errors).length > 0 || !form.nombre || !form.descripcion || !form.imagen || !form.precio || !form.stock || !form.subcategoria){
            setBotonBloqueado("disabled");
        } else {
            setBotonBloqueado("");
        }
    }, [errors, form])

    useEffect(() => {
        dispatch(getCategories());
    },[dispatch])

    function handleChange(e) {
        if(e.target.name !== "imagen"){
            let value = e.target.value;
            if(e.target.name === "subcategoria") {
                const idcategoria = asignarIdCategoria(value);
                setForm(prevForm => ({
                    ...prevForm,
                    subcategoria: value,
                    idcategoria: idcategoria
                }));
            } else {
                setForm(prevForm => ({
                    ...prevForm,
                    [e.target.name]: value
                }));
            }
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [e.target.name]: e.target.files[0]
            }));
        }
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }));
    }

    function asignarIdCategoria(subcategoria) {
        switch(subcategoria) {
            case "Ferreteria":
                return "301";
            case "Organizacion y Almacenaje":
                return "302";
            // Añade más casos según sea necesario
            default:
                return "";
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formDataImg = new FormData();
        formDataImg.append("file", form.imagen);
        formDataImg.append("upload_preset", "wsnlejcx");
        try {
            const imgUpload = await axios.post('https://api.cloudinary.com/v1_1/daneopbmn/image/upload', formDataImg)

            const idcategoria = asignarIdCategoria(form.subcategoria);

            const producto = {
                id: uuidv4().toString(),
                nombre: form.nombre,
                descripcion: form.descripcion,
                categoria: "Herramientas",
                subcategoria: form.subcategoria,
                idcategoria: idcategoria,
                marca: form.marca,
                precio: parseFloat(form.precio),
                stock: parseInt(form.stock),
                medidas: form.medidas,
                urlimagen: imgUpload.data.url
            }
            
            await submit(producto);
            setMessage("Producto creado exitosamente");
            // Limpiar el formulario
            setForm({
                nombre: "",
                descripcion: "",
                imagen: "",
                subcategoria: "",
                marca: "",
                precio: "",
                stock: 0,
                medidas: ""
            });
        } catch (error) {
            console.error("Error al crear el producto:", error.response?.data || error.message);
            setMessage("Error al crear el producto");
        }
    }

    return (
        <div id="contenedorForm">
            {message && <div className={`message ${message.includes("exitosamente") ? "success" : "error"}`}>{message}</div>}
            <form className="formulario" onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input
                    name="nombre"
                    type="text"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                    className={errors.nombre && "inputError"}
                />
                {errors.nombre && (
                        <p className="errors">{errors.nombre}</p>
                    )}
                <label>Descripcion</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción del producto"
                    className={errors.descripcion && "inputError"}
                />
                {errors.descripcion && (
                        <p className="errors">{errors.descripcion}</p>
                    )}
                <label>Imagen</label>
                <input
                    name="imagen"
                    type="file"
                    onChange={handleChange}
                    className={errors.imagen && "inputError"}
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
                    className={errors.medidas && "inputError"}
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
                    className={errors.stock && "inputError"}
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
                    className={errors.precio && "inputError"}
                />
                {errors.precio && (
                        <p className="errors">{errors.precio}</p>
                    )}
                <label>Categoría</label>
                <select id="selectCat" name="subcategoria" value={form.subcategoria} onChange={handleChange}>
                    <option value="">Seleccione una categoría</option>
                    {
                        subcategorias?.map((c,i) => (
                            <option key={i} value={c}>{c}</option>
                        ))
                    }
                </select>
                {errors.subcategoria && (
                    <p className="errors">{errors.subcategoria}</p>
                )}
                <label>Marca</label>
                <input
                    name="marca"
                    type="text"
                    value={form.marca}
                    onChange={handleChange}
                    placeholder="Marca"
                    className={errors.marca && "inputError"}
                />
                {errors.marca && (
                        <p className="errors">{errors.marca}</p>
                    )}
                <button 
                    id={botonBloqueado !== "disabled" ? "boton" : "botonBloqueado"}
                    disabled={botonBloqueado}>Crear</button>
            </form>
        </div>
    )
}
