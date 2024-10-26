import { GET_USER_FAVS, ADD_TO_FAVS, REMOVE_FROM_FAVS, GET_FAV_DETAILS } from '../actions/actionTypes';

const initialState = {
    userFavorites: [],
    favDetail: []
};

export default function favReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_FAVS:
            return {
                ...state,
                userFavorites: action.payload
            };
        case ADD_TO_FAVS:
            return {
                ...state,
                userFavorites: [...state.userFavorites, action.payload.productId]
            };
        case REMOVE_FROM_FAVS:
            return {
                ...state,
                userFavorites: state.userFavorites.filter(id => id !== action.payload)
            };
        case GET_FAV_DETAILS:
            return {
                ...state,
                favDetail: [...state.favDetail, action.payload]
            };
        default:
            return state;
    }
}
