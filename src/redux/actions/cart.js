import axios from "axios";
import {
  ADD_CART,
  DELETE_CART,
  MODIFY_CART,
  PRICE_CART,
  PRICE_REMOVE_CART,
  REMOVE_CART,
  REMOVE_LOCAL_CART,
  SET_LOCAL_CART,
  SET_LOCAL_STORAGE,
  GET_LOCAL_STORAGE,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "./actionTypes";
import { toast } from "react-toastify";



export const modifyCart = (details) => {
  return {
    type: MODIFY_CART,
    payload: details,
  };
};

export const removeCart = (id, size) => {
  return {
    type: REMOVE_CART,
    payload: {
      id,
      size,
    },
  };
};

export const addOrder = (order) => {
  return {
    type: PRICE_CART,
    payload: order,
  };
};

export const removeOrder = (id, talle) => {
  return {
    type: PRICE_REMOVE_CART,
    payload: {
      id,
      size: talle,
    },
  };
};
export const setLocalStorage = (cart, userId) => {
  return (dispatch) => {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    dispatch({
      type: SET_LOCAL_STORAGE,
      payload: cart,
    });
  };
};

export const getLocalStorage = (userId) => {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || {
      shoppingCart: [],
      order: [],
      cartRemainingStock: [],
    };
    dispatch({
      type: GET_LOCAL_STORAGE,
      payload: cart,
    });
  };
};

export const clearLocalStorage = ()=>{
  localStorage.removeItem("cart")
  return{
    type: "REMOVE_LOCAL_CART"
  }
}

export const deleteCart = () => {
  // console.log("deleteeeeedddd");
  return{
    type: DELETE_CART
  }
}

export const setItemStock = (id, talle)=> async dispatch =>{
  const product = await axios.get(`http://localhost:3001/product/${id}`)
  let stock = 0;
   if (talle === 'Sin talle'){
    stock = product.data.talles[0].producto_talle.stock  
   } else{
    const index = product.data.talles.findIndex(p=>p.talle === talle)
    stock = product.data.talles[index].producto_talle.stock
   }
   dispatch({
    type: 'SET_ITEM_STOCK',
    payload: {
      id,
      talle,
      stock: (stock-1)
    }
 })   
}
export const modifyItemStock = (id,talle,amount=1)=>{
  return {
    type: "MODIFY_ITEM_STOCK",
    payload: {
      id,
      talle,
      amount,
    },
  };
}
export const resetItemStock = (id,talle)=>{
  return{
    type: 'RESET_ITEM_STOCK',
    payload: {
      id,
      talle,
    }

  }
}

const API_URL = 'http://localhost:3001';

export const getCart = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    dispatch({ type: 'GET_CART', payload: response.data });
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

export const addToCart = (userId, productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, { userId, productId, quantity });
    dispatch({ type: ADD_TO_CART, payload: response.data });
    // Después de añadir al carrito, obtenemos el carrito actualizado
    dispatch(getCart(userId));
  } catch (error) {
    console.error('Error adding to cart:', error);
    toast.error("Error al añadir el producto al carrito");
  }
};

export const updateCartItem = (userId, productId, quantity) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${userId}/${productId}`, { quantity });
    dispatch({ type: 'UPDATE_CART_ITEM', payload: response.data });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

export const removeFromCart = (userId, productId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/cart/${userId}/${productId}`);
    dispatch({ type: 'REMOVE_FROM_CART', payload: { userId, productId } });
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/cart/${userId}`);
    dispatch({ type: 'CLEAR_CART' });
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
