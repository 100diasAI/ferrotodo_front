import {
    GET_BITACORA_BEGIN,
    GET_BITACORA_SUCCESS,
    GET_BITACORA_FAIL
  } from '../actions/actionTypes';
  
  const initialState = {
    registros: [],
    loading: false,
    error: null
  };
  
  export default function bitacoraReducer(state = initialState, action) {
    switch (action.type) {
      case GET_BITACORA_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_BITACORA_SUCCESS:
        return {
          ...state,
          loading: false,
          registros: action.payload
        };
      case GET_BITACORA_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          registros: []
        };
      default:
        return state;
    }
  }