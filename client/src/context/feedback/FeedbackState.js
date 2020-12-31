import React, { useReducer } from 'react';
import feedbackContext from './feedbackContext';
import feedbackReducer from './feedbackReducer';
import axios from 'axios';
import { FEEDBACK_ERROR, POST_FEEDBACK, GET_FEEDBACK } from '../types';

const FeedbackState = (props) => {
  const initialState = {
    feedback: [],
    loading: true,
    error: null,
    message: '',
  };

  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  //Create feedback
  const giveFeedback = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/giveFeedback', formData, config);
      dispatch({ type: POST_FEEDBACK, payload: res.data });
    } catch (err) {
      dispatch({ type: FEEDBACK_ERROR, payload: err.response.data.message });
    }
  };

  //GET ALL feedbackS
  const getFeedback = async (id) => {
    try {
      const res = await axios.get(`/api/getFeedback/${id}`);
      dispatch({ type: GET_FEEDBACK, payload: res.data });
    } catch (err) {
      dispatch({ type: FEEDBACK_ERROR, payload: err.response.data.message });
    }
  };

  return (
    <feedbackContext.Provider
      value={{
        feedback: state.feedback,
        loading: state.loading,
        message: state.message,
        error: state.error,
        giveFeedback,
        getFeedback,
      }}
    >
      {' '}
      {props.children}
    </feedbackContext.Provider>
  );
};

export default FeedbackState;
