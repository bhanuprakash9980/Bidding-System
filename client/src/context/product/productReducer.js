/* eslint-disable import/no-anonymous-default-export */
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

export default (state, action) => {
  switch (action.type) {
    case PRICE:
      return {
        ...state,
        price: action.payload.price,
        loading: false,
      };
    case CREATE_PRODUCT:
    case FINALISE_BID:
    case RE_BID:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product_name: action.payload.product_name,
        loading: false,
      };
    case GET_COMPLETED_ORDERS:
    case GET_COMPLETED_PRODUCTS_PRODUCER:
      return {
        ...state,
        complete_product: action.payload,
        loading: false,
      };

    case GET_PRODUCTS:
    case GET_ACTIVE_PRODUCTS_PRODUCER:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    case GET_PRODUCTS_PRODUCER:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case INCREASE_BID:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
