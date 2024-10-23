import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Main,
  Div,
  H2,
} from "./styles";
import estilos from "./checkout.module.css";
import useScript from "./useScript";
import {checkout, crearPedido, getAllSucursales, guardarDatosComprador} from "../../redux/actions/checkout";
import Mapa from "../../components/Mapa/Mapa";
import Resume from "../../components/CheckoutResume/resume";
import { deleteCart, clearLocalStorage } from "../../redux/actions/cart";
import Swal from "sweetalert2"

const Checkout = () => {
    const [input, setInput] = useState({nombre: "", apellido: "", documento: "", direccion: "", codigoPostal: "", ciudad: ""});
    const [errores, setErrores] = useState({nombre: "", apellido: "", documento: "", direccion: "", codigoPostal: "", ciudad: ""});
    const [botonBloqueado, setBotonBloqueado] = useState("disabled");
    const [formBloqueado, setFormBloqueado] = useState("");
    const carrito = useSelector(state => state.cart.shoppingCart);
    const { user: currentUser } = useSelector((state) => state.auth);
    const sucursales = useSelector(state => state.checkout.sucursales);
    const [envio, setEnvio] = useState("");
    const [inputEnvio, setInputEnvio] = useState({direccion: "", codigoPostal: "", ciudad: "", tipo:""});
    const [erroresEnvio, setErroresEnvio] = useState({direccion: "", codigoPostal: "", ciudad: ""});
    //----------------------------MERCADOPAGO----------------------------------------
    const { MercadoPago } = useScript( "https://sdk.mercadopago.com/js/v2", "MercadoPago");
    const pago = useSelector((state) => state.checkout.checkout);
    const pedidoGenerado = useSelector(state => state.checkout.pedido);
    const dispatch = useDispatch();

    async function onClickHandler(e){
        e.preventDefault();
        const comprador = {
            ...input,
            direccion: inputEnvio.direccion,
            codigoPostal: inputEnvio.codigoPostal,
            ciudad: inputEnvio.ciudad,
            tipoDeEnvio: inputEnvio.tipo
        }
        const pedido = {
            "productos": crearProductosPedido(carrito),
            "comprador": comprador,
        }
        let disPedido = await dispatch(crearPedido(pedido));
    }

    document.title = "FerreTodo - Checkout";

    useEffect(() => {
        if(pedidoGenerado.hasOwnProperty("pedido")) {
            const items = JSON.parse(JSON.stringify(carrito));
            if(envio === "Envio") items.push({nombre: "Envío a domicilio", precio:500, cantidad: 1,
            descripcion: "Envio a domicilio", imagen: "a"})
            dispatch(checkout({items, datos:input, pedidoGenerado}));
            const factura = {
                "nombre": input.nombre,
                "apellido": input.apellido,
                "telefono": currentUser.phone,
                "mail": currentUser.email,
                "direccion": input.direccion,
                "dni": input.documento,
                "idPedido": pedidoGenerado.pedido.id
            }
            dispatch(guardarDatosComprador(factura));
        }
        if(pedidoGenerado.hasOwnProperty("Error")){
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ha ocurrido un error',
                footer: pedidoGenerado.Error,
                didClose: () => { dispatch(deleteCart()); dispatch(clearLocalStorage()); window.location.replace("/cart") }
              });
        }
    },[pedidoGenerado])

    useEffect(() => {
        dispatch(getAllSucursales());
        if(currentUser){
            const {name, lastName, dni, address} = currentUser;
            setInput({nombre: name, apellido: lastName, documento: dni, direccion: address, codigoPostal: "", ciudad: ""})
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    },[])


    useEffect(() => {
        const btn = document.getElementsByClassName("mercadopago-button");
        if(btn[0]){
            for(let b of btn){
                b.parentNode.removeChild(b);
            }
        }
        if(pago.id && MercadoPago && botonBloqueado !== "disabled"){
            setBotonBloqueado("disabled");
            setFormBloqueado("disabled");
            const mp = new MercadoPago("APP_USR-06027043-b2a5-4576-ac25-217e1bbfc148", {
                locale: "es-BO",
            })
            mp.checkout({
                preference: {
                    id: pago.id,
                },
                render: {
                    container: "#button-checkout",
                    label: "Pagar",
                },
                theme: {
                    elementsColor: '#000000',
                    headerColor: '#ffffff',
                }
            })
        }
    },[pago]);

    async function mpSubmitHandler(e){
        e.preventDefault();
    }

    useEffect(() => {
        if(errores.nombre || errores.apellido || errores.documento || errores.direccion || errores.codigoPostal
            || errores.ciudad){
                setBotonBloqueado("disabled");
            }else if(erroresEnvio.direccion || erroresEnvio.codigoPostal || erroresEnvio.ciudad){
                setBotonBloqueado("disabled");
            }else setBotonBloqueado("");
        if(!inputEnvio.direccion || !inputEnvio.codigoPostal || !inputEnvio.ciudad){
                setBotonBloqueado("disabled");
        }
        if(!input.nombre || !input.apellido || !input.documento || !input.direccion || !input.codigoPostal
            || !input.ciudad){
                setBotonBloqueado("disabled");
        }
    }, [errores, input, inputEnvio, erroresEnvio])

    function onChangeHandler(e){
        setInput( {...input, [e.target.name]:e.target.value});
        setErrores(validar({name: e.target.name, value: e.target.value}, errores));
    }

    function onChangeHandlerEnvio(e){
        setInputEnvio( {...inputEnvio, [e.target.name]:e.target.value, tipo: "Envío"});
        setErroresEnvio(validar({name: e.target.name, value: e.target.value}, erroresEnvio));
    }

    function radioChangeHandler(e){
        setEnvio(e.target.value);
        setInputEnvio({direccion: "", codigoPostal: "", ciudad: "", tipo:e.target.value})
    }

    function selectSucursal(sucursal){
        setInputEnvio({direccion: sucursal.capital, codigoPostal: sucursal.cp, ciudad: sucursal.nombre, tipo: "Retiro"})
    }

    return(
        <Main>
            <Div>
                {carrito.length ? (<>
                <Resume cart={carrito} envio={envio}/>
                <div className={estilos.formularioContainer}>
                    <H2>Datos de facturación</H2>
                    <form id={estilos.formulario}>  
                        <ul id={estilos.lista}>
                            <li className={estilos.itemsLista}>
                                <label>Ciudad</label>
                                <div>
                                    <input name="ciudad" type="text" className={errores.ciudad ? estilos.inputDatosError : estilos.inputDatos}
                                    onChange={onChangeHandler} value={input.ciudad}
                                    disabled={formBloqueado === "disabled" ? "disabled" : ""}></input>
                                        {errores.ciudad ? (<p className={estilos.indicador}>{errores.ciudad}</p>) : (<p className={estilos.i}>a</p>)}
                                </div>                        
                            </li>
                            {
                                botonBloqueado !== "disabled" ? 
                                (
                                    <button id={estilos.boton} type="button"
                                        onClick={onClickHandler}>Continuar</button>
                                ) : (
                                    <button id={estilos.botonBloqueado} 
                                    type="button">{!pago.id ? "Crear pedido" : "..."}</button>
                                )
                            }   
                        </ul>
                    </form>
                    <form onSubmit={mpSubmitHandler} style={{display: "flex"}}>
                        <div id="button-checkout" className={estilos.pagar}></div> 
                    </form>
                    <br />
                </div>
                <div className={estilos.formularioContainer}>
                    <H2>Datos de entrega</H2>
                    <ul id={estilos.lista}>
                        {
                            envio === "Envio" &&
                            <>
                                <li className={estilos.itemsLista}>
                                    <label>Ciudad</label>
                                    <div>
                                        <input name="ciudad" type="text" className={erroresEnvio.ciudad ? estilos.inputDatosError : estilos.inputDatos}
                                        onChange={onChangeHandlerEnvio} value={inputEnvio.ciudad}
                                        disabled={formBloqueado === "disabled" ? "disabled" : ""}></input>
                                            {erroresEnvio.ciudad ? (<p className={estilos.indicador}>{erroresEnvio.ciudad}</p>) : (<p className={estilos.i}>a</p>)}
                                    </div>                        
                                </li>
                            </>
                        }
                        {
                            envio === "Retiro" &&
                            <Mapa sucursales={sucursales} selectSucursal={selectSucursal}/>
                        }
                    </ul>
                </div>
            </>) : (<H2 style={{margin: "auto", marginTop:"3rem", marginBottom:"3rem", fontSize:"1.5rem"}}>No hay items en su carrito</H2>)}
            </Div>
        </Main>
    );
};


export function validar(input, errores){
    if(errores[input.name]) errores[input.name] = "";
    switch(input.name){
        case "nombre":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(/[0-9@$?¡\-_]/.test(input.value)) errores[input.name] = "Nombre inválido";
            break;
        case "apellido":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(/[0-9@$?¡\-_]/.test(input.value)) errores[input.name] = "Apellido inválido";
            break;
        case "documento":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(!/^\d{7,}$/.test(input.value)) errores[input.name] = "Documento inválido";
            break;
        case "direccion":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(!/\d/.test(input.value) || !/[a-zA-Z]/.test(input.value)) errores[input.name] = "Dirección inválida";
            break;
        case "codigoPostal":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(!/^\d{4,5}$/.test(input.value)) errores[input.name] = "Código postal inválido";
            break;
        case "ciudad":
            if(!input.value.length) errores[input.name] = "Requerido";
            else if(/[0-9@$?¡\-_]/.test(input.value)) errores[input.name] = "Ciudad inválida";
            break;
        default: return errores;
    }
    return errores;
}


function crearProductosPedido(carrito) {
    let productos = [];
    if(carrito){
        carrito.forEach((c) => {
            productos.push({
                "productId": c.id,
                "cantidad": c.cantidad
            });
        })
    }
    return productos;
}

export default Checkout;