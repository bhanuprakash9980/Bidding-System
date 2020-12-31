/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
