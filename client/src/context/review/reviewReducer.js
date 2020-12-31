/* eslint-disable import/no-anonymous-default-export */
import { REVIEW_ERROR, POST_REVIEW, GET_REVIEW } from '../types';

export default (state, action) => {
  switch (action.type) {
    case POST_REVIEW:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
        loading: false,
      };

    case REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
