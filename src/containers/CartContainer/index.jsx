import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../redux/actions/cart";
import OrderItem from "../../components/Cart/OrderItem";
import { Link } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import { List, Li , Error , Div , Header , CatList , Main, PriceSection, BOTON, Vaciar, Button, Text} from "./styles";

const ShoppingCart = ({ theme = 'light' }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    if (currentUser) {
      dispatch(getCart(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (!cartItems) {
    return <div>Cargando carrito...</div>;
  }

  const setToast = ()=>{
    toast.error(confirmarVaciado(),{
      toastId:'emptyCart'
    })
  }
  const confirmarVaciado = ()=>{
    return (
      <div>
        <Text>
          Está seguro que quiere vaciar el carrito?
        </Text>
        <Button onClick={resetCart}>Confirmar</Button>
      </div>
    )
  }
  const resetCart = ()=>{
    dispatch(clearCart())
  }
  
  const price = cartItems.reduce((prev,compra)=> prev+compra.subtotal,0)
  return (
    <Div>
      {
        theme === 'light' ? (<ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
        />): (<ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
          theme={'dark'}
        />)
      }

      { cartItems && cartItems.length ? (
        <List>
          <Li>
            <Header>
              {
                  cartItems.length >1 ? <p> Finalizar compra de {cartItems.length} productos </p> : <p> Finalizar compra </p>
              }
            </Header>
          </Li>
          <Li>
            <Main>
              {
              cartItems.map(item=><OrderItem key={`${item.id}+${item.talle}`} id={item.id} item={item}/>)
              }
            </Main>            
          </Li>
          <Li>
            <PriceSection>Precio final: ${Intl.NumberFormat("es-BO").format(price)}</PriceSection>
          </Li>
          <Li>
              <PriceSection>
              {
                currentUser ? (
                  <Link to="/checkout">
                      <BOTON>Iniciar compra</BOTON>
                  </Link>
                ) : (
                  <Link to="/login">
                      <BOTON>Inicia sesion para comprar</BOTON>
                  </Link>
                )
              }
              </PriceSection>
          </Li>
          <Vaciar onClick={setToast}> Vaciar carrito</Vaciar>
        </List>
      ) : (
        <Error>No hay items en su carrito</Error>
      )}
    </Div>
  );
}

export default ShoppingCart;
