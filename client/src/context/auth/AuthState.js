import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
  GET_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER_BY_ID,
  CLEAR_ERRORS,
} from '../types';
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
    message: '',
    name: '',
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserById = async (userId) => {
    try {
      const res = await axios.get(`/api/auth/getUserById/${userId}`);

      dispatch({ type: GET_USER_BY_ID, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };

  const getUser = async () => {
    axios
      .get('/api/auth/getUser')
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
      });
  };

  //Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth/signup', formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.message });
    }
  };
  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.post('/api/auth/signin', formData, config);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
    }
  };
  //Logout User
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  //Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        message: state.message,
        name: state.name,
        register,
        login,
        logout,
        clearErrors,
        getUser,
        getUserById,
      }}
    >
      {' '}
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
