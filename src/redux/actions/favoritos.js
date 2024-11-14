import axios from "axios";
import { GET_USER_FAVS, ADD_TO_FAVS, REMOVE_FROM_FAVS, GET_FAV_DETAILS } from './actionTypes';
const API_URL = 'https://ferretodo.onrender.com';

export const getUserId = (userName, userMail) => async dispatch => {
  try {
    const users = await axios.get(`${API_URL}/user?search=${userName}`);
    const user = users.data.filter(p => p.mail === userMail);
    if (user.length > 0) {
      dispatch({
        type: "GET_USER_ID",
        payload: user[0].id
      });
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Error getting user ID:', error);
    }
  }
};

export const getAllFavs = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/favoritos/wishlist/${userId}`);
    console.log("Respuesta del servidor (getAllFavs):", response.data);
    // Asegúrate de que estás enviando un array de IDs de productos
    const favoriteIds = response.data.map(fav => fav.productId || fav);
    dispatch({ type: GET_USER_FAVS, payload: favoriteIds });
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
};

export const addToFavs = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/create/favoritos`, { userId, productId });
    dispatch({ type: ADD_TO_FAVS, payload: response.data });
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const deleteUserFav = (userId, productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/favoritos/delete/${userId}/${productId}`);
      
      dispatch({
        type: "DELETE_FAV",
        payload: productId
      });
      
      // Actualizar la lista después de eliminar
      dispatch(getAllFavs(userId));
      
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  };
};

export const getFavProducts = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/product/${productId}`);
    console.log("Respuesta del servidor (getFavProducts):", response.data);
    dispatch({ type: GET_FAV_DETAILS, payload: response.data });
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

export const removeFavs = () => {
  return {
    type: "FAVOURITE_REMOVE"
  };
};

export const removeDetail = () => {
  return {
    type: "FAVORITE_REMOVE_DETAIL"
  };
};

export const createUserFav = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/create/favoritos`, { 
      userId, 
      productId: productId.toString()  // Aseguramos que productId sea un string
    });
    dispatch({ type: 'CREATE_USER_FAV', payload: response.data });
  } catch (error) {
    console.error('Error creating user favorite:', error);
    dispatch({ type: 'CREATE_USER_FAV_ERROR', payload: error.message });
  }
};
