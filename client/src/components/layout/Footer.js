import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import FeedbackContext from '../../context/feedback/feedbackContext';
import { translate, Trans } from 'react-i18next';
const Footer = (props) => {
  const authContext = useContext(AuthContext);
  const feedbackContext = useContext(FeedbackContext);
  const { user } = authContext;
  const { giveFeedback, error, message } = feedbackContext;
  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    if (error) {
      M.toast({
        html: error,
        displayLength: 1000,
        classes: 'rounded red',
      });
    }
    if (message) {
      M.toast({
        html: message,
        displayLength: 1000,
        classes: 'rounded green',
      });
    }
  }, [error, message]);
  const [feedbackContent, setFeedbackContent] = useState('');
  const onChange = (e) => {
    setFeedbackContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (feedbackContent === '')
      M.toast({
        html: 'Please Enter All fields',
        displayLength: 1000,
        classes: 'rounded red',
      });
    else giveFeedback({ feedback_content: feedbackContent, userId: user.id });
  };
  return (
    <>
      <footer className='page-footer green' style={{ marginTop: '70vh' }}>
        <div className='container'>
          <div className='row'>
            <div className='col l6 s12'>
              <h5 className='white-text'>
                <Trans>Agro Bid</Trans>
              </h5>
              <p className='grey-text text-lighten-4'>
                <Trans>
                  A commission free web application for that benifits you all
                </Trans>
              </p>
            </div>
            <div className='col l4 offset-l2 s12'>
              <h5 className='white-text'>
                <Trans>Links</Trans>
              </h5>
              <ul>
                <li>
                  <a className='grey-text text-lighten-3' href='/'>
                    <Trans>Home</Trans>
                  </a>
                </li>

                <li>
                  <a
                    className='grey-text text-lighten-3 modal-trigger'
                    href='#modalfeedback'
                  >
                    <Trans>Feedback</Trans>
                  </a>
                  <div id='modalfeedback' className='modal green'>
                    <div className='modal-content'>
                      <h4>
                        <Trans>Feedback Form</Trans>
                      </h4>
                      <p>
                        <Trans>Give feedback to admin for improvement</Trans>
                      </p>
                      <form onSubmit={onSubmit}>
                        <div className='input-field white-text'>
                          <textarea
                            type='text'
                            id='textarea'
                            className='materialize-textarea white-text'
                            name='feedback_content'
                            value={feedbackContent}
                            onChange={onChange}
                          ></textarea>
                          <label
                            className='active white-text'
                            htmlFor='textarea '
                          >
                            <Trans>Feedback content</Trans>
                          </label>
                        </div>
                        <div className='input-field '>
                          <button
                            className='btn  yellow black-text '
                            type='submit'
                          >
                            <Trans>Send feedback</Trans>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-copyright'>
          <div className='container'>
            © {new Date().getFullYear()} Copyright <Trans>Agro Bid</Trans>
            <a className='grey-text text-lighten-4 right' href='#!'>
              <i className='material-icons'>apps</i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default translate('translations')(Footer);
