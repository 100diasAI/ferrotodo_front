import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
}
