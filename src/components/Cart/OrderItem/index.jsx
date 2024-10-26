import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTrashFill } from "react-icons/bs";
import {
  updateCartItem,
  removeFromCart,
} from "../../../redux/actions/cart";
import { List, Img, Li, Text, Amount, Button, Div, CloseButton, PCant, SPAN, H3, LinkTo } from "./styles";
import { toast } from "react-toastify";
import ToastMsg from "../../Toast";

export default function OrderItem({ item }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const incAmount = () => {
    if (item.quantity < item.producto.stock) {
      dispatch(updateCartItem(currentUser.id, item.productId, item.quantity + 1));
    }
  };

  const decAmount = () => {
    if (item.quantity > 1) {
      dispatch(updateCartItem(currentUser.id, item.productId, item.quantity - 1));
    }
  };

  const removeItem = () => {
    toast.error(
      <ToastMsg
        tipo={"cart"}
        name={item.producto.nombre}
        userId={currentUser.id}
        productId={item.productId}
      />,
      {
        toastId: `delete${item.id}`,
      }
    );
  };

  return (
    <Div key={item.id}>
      <CloseButton onClick={removeItem}><BsTrashFill/></CloseButton>
      <List>
        <Li key={`${item.id}img`}>
          <LinkTo to={`/detail/${item.productId}`}>
            <Img src={item.producto.urlimagen} alt={`Imagen de ${item.producto.nombre}`} />
          </LinkTo>    
        </Li>
        <Li key={`${item.id}text`}>
          <Text>
            <H3>{item.producto.nombre}</H3>
            <h5>{item.producto.descripcion}</h5>
          </Text>
        </Li>
        <Li key={`${item.id}price`}>
          <h3>${Intl.NumberFormat("es-BO").format(item.producto.precio)}</h3>
        </Li>
        <Li key={`${item.id}amount`}>
          <Amount>
            <Button onClick={decAmount}>-</Button>
            <PCant>{item.quantity}</PCant>
            <Button onClick={incAmount}>+</Button>            
          </Amount>
          {item.quantity >= item.producto.stock && <SPAN>Stock máximo</SPAN>}
        </Li>
        <Li key={`${item.id}subtotal`}>
          <h3>${Intl.NumberFormat("es-BO").format(item.producto.precio * item.quantity)}</h3>
        </Li>
      </List>
    </Div>
  );
}
