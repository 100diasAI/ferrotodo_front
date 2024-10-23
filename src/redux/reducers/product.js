import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_BEGIN,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  ORDER_BY_CATEGORY,
  ORDER_BY,
  DELETE_PRODUCT,
  GET_CATEGORIES,
  GET_MARCAS,
  GET_SUBCATEGORIES,
  GET_PRODUCTS_BEGIN_SEARCH,
  GET_PRODUCTS_SUCCESS_SEARCH,
  GET_PRODUCTS_FAIL_SEARCH,
} from "../actions/actionTypes";

const initialState = {
  allProducts: [],
  products: [],
  category: "",
  product: {},
  loading: false,
  error: null,
  allCategories: [],
  allMarcas: [],
  allSubcategories: []
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCTS_SUCCESS:
      // let full = state.products; // se se quiere un estado anterior
      return {
        ...state,
        loading: false,
        products: action.payload.products.sort((a, b) => {
          if(a.nombre.trim().toLowerCase() > b.nombre.trim().toLowerCase()) return 1;
          if(a.nombre.trim().toLowerCase() < b.nombre.trim().toLowerCase()) return -1;
          return 0;
        }),
        allProducts: action.payload.products.sort((a, b) => {
          if(a.nombre.trim().toLowerCase() > b.nombre.trim().toLowerCase()) return 1;
          if(a.nombre.trim().toLowerCase() < b.nombre.trim().toLowerCase()) return -1;
          return 0;
        }),
      };

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: [],
      };
    case ORDER_BY_CATEGORY:
      const payload = action.payload;
      if(payload === "Todos") return {...state, products: [...state.allProducts]};
      return {
        ...state,
        products: [...state.allProducts].filter(
          (product) => product.categorium.nombre === payload
        ),
      };
    case ORDER_BY:
      if(action.payload === 'A-Z'){
        return {
          ...state,
          products: [...state.products].sort((a, b) => {
            return (a.nombre.trim().toLowerCase() > b.nombre.trim().toLowerCase() ? 1 : -1 )
          })
        }
      }
      if(action.payload === 'Z-A'){
        return {
          ...state,
          products: [...state.products].sort((a, b) => {
            return (a.nombre.trim().toLowerCase() < b.nombre.trim().toLowerCase() ? 1 : -1 )
          })
        }
      }
      if(action.payload === 'Precio Desc'){
        return {
          ...state,
          products: [...state.products].sort((a, b) => {
            let priceA = a.precio
            let priceB = b.precio
            return priceA < priceB ? 1 : -1
          })
        }
      }
      if(action.payload === 'Precio Asc'){
        return {
          ...state,
          products: [...state.products].sort((a, b) => {
            let priceA = a.precio
            let priceB = b.precio
            return priceA > priceB ? 1 : -1
          })
        }
      }
      // Agregar ordenamiento por marca si es necesario
      if(action.payload === 'Marca'){
        return {
          ...state,
          products: [...state.products].sort((a, b) => {
            return (a.marca.trim().toLowerCase() > b.marca.trim().toLowerCase() ? 1 : -1 )
          })
        }
      }
    case GET_PRODUCT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload.product,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        product: {},
      };
    case 'POST_PRODUCT':
      return {
        ...state,
      }
    case 'POST_FAVORITE':
      return {
        ...state,
      }  
    case DELETE_PRODUCT:
      return{
        ...state,
        product:{}
      }
    case GET_CATEGORIES:
      return{
        ...state,
        allCategories: action.payload
      }
    case GET_MARCAS:
      return{
        ...state,
        allMarcas: action.payload
      }
    case GET_SUBCATEGORIES:
      return{
        ...state,
        allSubcategories: action.payload
      }
    case GET_PRODUCTS_BEGIN_SEARCH:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCTS_SUCCESS_SEARCH:
      // let full = state.products; // se se quiere un estado anterior
      return {
        ...state,
        loading: false,
        products: action.payload.products
      };

    case GET_PRODUCTS_FAIL_SEARCH:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        products: [],
      };
    case 'FILTER_BY_BRANDS':
      return {
        ...state,
        filteredProducts: state.products.filter(product => 
          action.payload.length === 0 || action.payload.includes(product.marca)
        )
      }
    default:
      return state;
  }
}
