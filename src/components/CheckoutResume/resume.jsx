import React from "react";
import { useState } from "react";
import estilos from "./resume.module.css";

function Resume({cart, envio}) {
    const [total, setTotal] = useState(sumaPrecios(cart));

    return (
        <div id={estilos.contenedorResumen}>
            <h1>Resumen de compra</h1>
                <div className={estilos.item}>
                    <span style={{textAlign: "center"}}>Producto</span>
                    <span style={{textAlign: "center"}}>Cantidad</span>
                    <span style={{textAlign: "center"}}>Precio</span>
                </div>
            {
                cart?.map((c, i) => {
                    c.nombre = c.nombre.trim();
                    return(
                        <div className={estilos.item} key={i}>
                            <span>{c.nombre}</span>
                            <span style={{textAlign: "center"}}>{c.cantidad + " u."}</span>
                            <span style={{textAlign: "right"}}>{"Bs" + Intl.NumberFormat("es-BO").format(c.precio)}</span>
                        </div>
                    )
                })
            }
            {envio === "Envio" && <div className={estilos.item}>
                            <span>Envío a domicilio</span>
                            <span style={{textAlign: "center"}}></span>
                            <span style={{textAlign: "right"}}>{"Bs" + Intl.NumberFormat("es-BO").format(500)}</span>
                        </div>}
            <hr />
            <div className={estilos.item}>
                <span style={{textAlign: "left"}}>Total</span>
                <span style={{textAlign: "center"}}></span>
                {
                    envio === "Envio" ? <span style={{textAlign: "right"}}>{"Bs" + Intl.NumberFormat("es-BO").format(total + 500)}</span>
                    : <span style={{textAlign: "right"}}>{"Bs" + Intl.NumberFormat("es-BO").format(total)}</span>
                }
            </div>
        </div>
    );
}

export default Resume;

function sumaPrecios(cart){
    let total = 0; 
    cart.forEach((c) => {
        total += c.precio * c.cantidad;
    })
    return total;
}
