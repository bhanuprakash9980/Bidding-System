import React, { useReducer } from 'react';
import productContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';
import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCTS_PRODUCER,
  INCREASE_BID,
  PRODUCT_ERROR,
  GET_COMPLETED_PRODUCTS_PRODUCER,
  GET_ACTIVE_PRODUCTS_PRODUCER,
  GET_COMPLETED_ORDERS,
  GET_PRODUCT_BY_ID,
  FINALISE_BID,
  RE_BID,
  PRICE,
} from '../types';

const ProductState = (props) => {
  const initialState = {
    product: [],
    complete_product: [],
    single_product: {},
    loading: true,
    error: null,
    message: '',
    product_name: '',
    price: '',
  };

  const [state, dispatch] = useReducer(productReducer, initialState);
  //Create product
  const getProductById = async (productId) => {
    try {
      const res = await axios.get(`/api/getProductById/${productId}`);
      dispatch({ type: GET_PRODUCT_BY_ID, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  const basePrice = async (productname) => {
    try {
      const res = await axios.get(`/api/basePrice/${productname}`);
      dispatch({ type: PRICE, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  const createProduct = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/product', formData, config);
      dispatch({ type: CREATE_PRODUCT, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  //GET ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      const res = await axios.get('/api/product/getAllProducts');
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  //GET PRODUCTS BY PRODUCER
  const getProductsByProducer = async (producerId) => {
    try {
      const res = await axios.get(`/api/productsByProducer/${producerId}`);
      dispatch({ type: GET_PRODUCTS_PRODUCER, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data.message });
    }
  };
  const getCompleteProductsByProducer = async (producerId) => {
    try {
      const res = await axios.get(
        `/api/CompleteproductsByProducer/${producerId}`
      );
      dispatch({ type: GET_COMPLETED_PRODUCTS_PRODUCER, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data.message });
    }
  };
  const getActiveProductsByProducer = async (producerId) => {
    try {
      const res = await axios.get(
        `/api/ActiveproductsByProducer/${producerId}`
      );
      dispatch({ type: GET_ACTIVE_PRODUCTS_PRODUCER, payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data.message });
    }
  };
  const getCompletedOrders = async (consumerId) => {
    try {
      const res = await axios.get(`/api/completedOrders/${consumerId}`);
      dispatch({ type: GET_COMPLETED_ORDERS, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data.message });
    }
  };

  //INCREASE_BID

  const increaseBid = async (consumerId, productId) => {
    try {
      const res = await axios.get(
        `/api/increasebid/${consumerId}/${productId}`
      );
      dispatch({ type: INCREASE_BID, payload: res.data });
    } catch (error) {
      dispatch({ type: PRODUCT_ERROR, payload: error.response.data.message });
    }
  };

  const finaliseBid = async (productId) => {
    try {
      const res = await axios.get(`/api/finaliseBid/${productId}`);
      dispatch({ type: FINALISE_BID, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  const reBid = async (productId) => {
    try {
      const res = await axios.get(`/api/reBid/${productId}`);
      dispatch({ type: RE_BID, payload: res.data });
    } catch (err) {
      dispatch({ type: PRODUCT_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <productContext.Provider
      value={{
        product: state.product,
        loading: state.loading,
        message: state.message,
        error: state.error,
        complete_product: state.complete_product,
        createProduct,
        getAllProducts,
        getProductsByProducer,
        increaseBid,
        getActiveProductsByProducer,
        getCompleteProductsByProducer,
        getCompletedOrders,
        getProductById,
        finaliseBid,
        reBid,
        basePrice,
        price: state.price,
        single_product: state.single_product,
        product_name: state.product_name,
      }}
    >
      {' '}
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
