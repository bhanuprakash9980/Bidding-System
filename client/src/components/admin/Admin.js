import React, { Fragment, useContext, useEffect } from 'react';
import Footer from '../layout/Footer';
import Feedback from './Feedback';
import FeedbackContext from '../../context/feedback/feedbackContext';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize';

const Admin = (props) => {
  useEffect(() => {
    M.AutoInit();
  });
  const feedbackContext = useContext(FeedbackContext);
  const authContext = useContext(AuthContext);
  const { feedback, error, message, getFeedback } = feedbackContext;
  const { user } = authContext;

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
      });
    }
  }, [user, props, error, message]);

  useEffect(() => {
    if (user) {
      if (user.id) getFeedback(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Fragment>
      <div className='row'>
        {feedback.map((item, index) => {
          return <Feedback key={index} feedback={item} />;
        })}
      </div>
      <Footer />
    </Fragment>
  );
};

export default Admin;
