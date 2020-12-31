/* eslint-disable import/no-anonymous-default-export */
import { FEEDBACK_ERROR, POST_FEEDBACK, GET_FEEDBACK } from '../types';

export default (state, action) => {
  switch (action.type) {
    case POST_FEEDBACK:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case GET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        loading: false,
      };

    case FEEDBACK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
