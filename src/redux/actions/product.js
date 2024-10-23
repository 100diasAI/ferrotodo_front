import axios from "axios";
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
  GET_MARCAS,  // Cambiado de GET_TALLES a GET_MARCAS
  GET_PRODUCTS_BEGIN_SEARCH,
  GET_PRODUCTS_SUCCESS_SEARCH,
  GET_PRODUCTS_FAIL_SEARCH,
} from "./actionTypes";

const URL_SERVER = "http://localhost:3001";

export const getProducts = (search) => {
  return async (dispatch) => {
    dispatch(fetchProductsBegin());
    try {
      const url = new URL(`${URL_SERVER}/products`);
      if (search) {
        const params = new URLSearchParams(url.search);
        const { name } = search;
        params.set("name", name);
        if (params) url.search = params;
      }
      const response = await fetch(url);
      const res = await handleErrors(response);
      const json = await res.json();
      return dispatch(fetchProductsSuccess(json.productos));
    } catch (error) {
      return dispatch(fetchProductsFailure(error));
    }
  };
};

// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchProductsBegin = () => ({
  type: GET_PRODUCTS_BEGIN,
});

export const fetchProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: { products },
});

export const fetchProductsFailure = (error) => ({
  type: GET_PRODUCTS_FAIL,
  payload: { error },
});

export const orderByCategoryName = (category) => ({
  type: ORDER_BY_CATEGORY,
  payload: category,
});

export const orderBy = (value) => ({
  type: ORDER_BY,
  payload: value,
});

export const getProduct = (productId) => {
  return async function (dispatch) {
    try {
      const response = await fetch(`${URL_SERVER}/product/${productId}`);
      const data = await response.json();
      dispatch(fetchProductSuccess(data));
    } catch (error) {
      return dispatch(fetchProductFailure(error));
    }
  };
};

export const fetchProductBegin = () => ({
  type: GET_PRODUCT_BEGIN,
});

export const fetchProductSuccess = (product) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: { product },
});

export const fetchProductFailure = (error) => ({
  type: GET_PRODUCT_FAIL,
  payload: { error },
});

export const postProduct = (payload) => {
  return async function () {
    var json = await axios.post(`${URL_SERVER}/create/product`, payload, { withCredentials: true });
    return json;
  };
};

export const clearProduct = () => {
  return {
    type: DELETE_PRODUCT,
  };
};

export function deleteProduct(payload) {
  return async function () {
    try {
      const response = await axios.delete(`${URL_SERVER}/product/delete/` + payload, { withCredentials: true });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateProduct(payload) {
  return async function () {
    try {
      const response = await axios.put(`${URL_SERVER}/edit/product/`, payload, { withCredentials: true });
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const getMarcas = () => async (dispatch) => {
  const { data } = await axios.get(`${URL_SERVER}/marcas`);
  return dispatch({ type: GET_MARCAS, payload: data });
};

// Función para obtener subcategorías (nueva)
export const getSubcategories = (category) => async (dispatch) => {
  const { data } = await axios.get(`${URL_SERVER}/subcategories/${category}`);
  return dispatch({ type: GET_SUBCATEGORIES, payload: data });
};

export const getProductsSearch = (search) => {
  return async (dispatch) => {
    dispatch(fetchProductsBeginSearch());
    try {
      const url = new URL(`${URL_SERVER}/products`);
      if (search) {
        const params = new URLSearchParams(url.search);
        const { name, category, subcategory, marca } = search;
        if (name) params.set("name", name);
        if (category) params.set("category", category);
        if (subcategory) params.set("subcategory", subcategory);
        if (marca) params.set("marca", marca);
        if (params.toString()) url.search = params.toString();
      }
      const response = await fetch(url);
      const res = await handleErrors(response);
      const json = await res.json();
      return dispatch(fetchProductsSuccessSearch(json.productos));
    } catch (error) {
      return dispatch(fetchProductsFailureSearch(error));
    }
  };
};

export const fetchProductsBeginSearch = () => ({
  type: GET_PRODUCTS_BEGIN_SEARCH,
});

export const fetchProductsSuccessSearch = (products) => ({
  type: GET_PRODUCTS_SUCCESS_SEARCH,
  payload: { products },
});

export const fetchProductsFailureSearch = (error) => ({
  type: GET_PRODUCTS_FAIL_SEARCH,
  payload: { error },
});

export const filterByBrands = (brands) => {
  return {
    type: 'FILTER_BY_BRANDS',
    payload: brands
  }
}