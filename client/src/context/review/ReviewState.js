import React, { useReducer } from 'react';
import reviewContext from './reviewContext';
import reviewReducer from './reviewReducer';
import axios from 'axios';
import { REVIEW_ERROR, POST_REVIEW, GET_REVIEW } from '../types';

const ReviewState = (props) => {
  const initialState = {
    review: [],
    loading: true,
    error: null,
    message: '',
  };

  const [state, dispatch] = useReducer(reviewReducer, initialState);
  //Create review
  const giveReview = async (id, productId, formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        `/api/postReview/${id}/${productId}`,
        formData,
        config
      );
      dispatch({ type: POST_REVIEW, payload: res.data });
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.data.message });
    }
  };

  //GET ALL reviewS
  const getReview = async (id) => {
    try {
      const res = await axios.get(`/api/getReview/${id}`);
      dispatch({ type: GET_REVIEW, payload: res.data });
    } catch (err) {
      dispatch({ type: REVIEW_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <reviewContext.Provider
      value={{
        review: state.review,
        loading: state.loading,
        message: state.message,
        error: state.error,
        giveReview,
        getReview,
      }}
    >
      {' '}
      {props.children}
    </reviewContext.Provider>
  );
};

export default ReviewState;
