import React from 'react';

const Feedback = ({ feedback }) => {
  return (
    <div className='col s12 '>
      <p className='flow-text'>{feedback && feedback.feedback_content}</p>
      <p className='col s12'>By {feedback.username}</p>
    </div>
  );
};

export default Feedback;
