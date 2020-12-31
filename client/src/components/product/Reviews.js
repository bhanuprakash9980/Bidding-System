import React, { Fragment, useEffect, useContext } from 'react';
import ReviewCard from './ReviewCard';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import ReviewContext from '../../context/review/reviewContext';
const Reviews = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const authContext = useContext(AuthContext);
  const reviewContext = useContext(ReviewContext);

  const { user } = authContext;
  const { review, message, error, getReview } = reviewContext;

  useEffect(() => {
    if (!localStorage.token) {
      props.history.push('/');
    }
    if (error) {
      M.toast({
        html: error,
        displayLength: 1000,
        classes: 'rounded red',
        completeCallback: () => {
          props.history.push('/');
        },
      });
    }
    if (message) {
      M.toast({
        html: message,
        displayLength: 1000,
        classes: 'rounded green',
        completeCallback: () => {
          props.history.push('/');
        },
      });
    }
  }, [props, error, message]);
  useEffect(() => {
    if (user) getReview(user.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fragment>
      <div className='row'>
        <ul className='collection'>
          {review.map((reviewI, index) => {
            return <ReviewCard key={index} review={reviewI} />;
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Reviews;
