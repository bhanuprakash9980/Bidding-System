/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_USER,
  GET_USER_BY_ID,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        loading: false,
        name: action.payload.username,
        isAuthenticated: true,
      };

    case GET_USER:
      return {
        ...state,
        loading: false,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          roles: action.payload.roles,
        },
        isAuthenticated: true,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.accessToken);
      return {
        ...state,
        message: '',
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          roles: action.payload.roles,
        },
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        message: '',
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
