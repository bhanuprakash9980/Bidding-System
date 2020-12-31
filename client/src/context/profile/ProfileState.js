import React, { useReducer } from 'react';
import profileContext from './profileContext';
import profileReducer from './profileReducer';
import axios from 'axios';
import {
  ADD_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../types';

const ProfileState = (props) => {
  const initialState = {
    profile: null,
    loading: true,
    error: null,
    message: '',
  };

  const [state, dispatch] = useReducer(profileReducer, initialState);
  //Create Profile
  const createProfile = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/all/profile', formData, config);
      dispatch({ type: ADD_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: err.response.data.message });
    }
  };

  //update profile
  const updateProfile = async (formData, userId) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/all/profile/${userId}`,
        formData,
        config
      );
      dispatch({ type: UPDATE_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: err.response.data.message });
    }
  };

  //get profile

  const getProfile = async (userId) => {
    try {
      const res = await axios.get(`/api/all/profile/${userId}`);
      dispatch({ type: GET_PROFILE, payload: res.data });
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <profileContext.Provider
      value={{
        profile: state.profile,
        loading: state.loading,
        message: state.message,
        error: state.error,
        createProfile,
        updateProfile,
        getProfile,
      }}
    >
      {' '}
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileState;
