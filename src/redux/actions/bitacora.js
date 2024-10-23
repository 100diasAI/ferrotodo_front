import axios from 'axios';
import {
  GET_BITACORA_BEGIN,
  GET_BITACORA_SUCCESS,
  GET_BITACORA_FAIL
} from './actionTypes';

export const getBitacora = () => async (dispatch) => {
  dispatch({ type: GET_BITACORA_BEGIN });
  try {
    const response = await axios.get('http://localhost:3001/bitacora');
    console.log('Respuesta de la API:', response.data);
    dispatch({
      type: GET_BITACORA_SUCCESS,
      payload: response.data.registros
    });
  } catch (error) {
    console.error('Error al obtener la bitácora:', error);
    dispatch({
      type: GET_BITACORA_FAIL,
      payload: { error: error.message }
    });
  }
};
