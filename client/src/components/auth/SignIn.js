import React, { useState, useContext, useEffect, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.css';
import AuthContext from '../../context/auth/authContext';
import { translate, Trans } from 'react-i18next';
const SignIn = (props) => {
  const authContext = useContext(AuthContext);
  const { error, message, login, isAuthenticated } = authContext;
  useEffect(() => {
    M.AutoInit();
    if (isAuthenticated) {
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
  }, [isAuthenticated, props, error, message]);

  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { name, password } = user;
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || password === '')
      M.toast({
        html: 'Please Enter All fields',
        displayLength: 4000,
        classes: 'rounded red',
      });
    else if (password.length < 6)
      M.toast({
        html: 'Please add atleast 6 charachters to password',
        displayLength: 4000,
        classes: 'rounded red',
      });
    else login({ username: name, password });
  };

  return (
    <Fragment>
      <div className='row '>
        <form className='col  m6 s12 offset-m3' onSubmit={onSubmit}>
          <div className='row center-align'>
            <h3 className='flow-text green-text'>
              <Trans>Log in</Trans>
            </h3>
          </div>
          <div className='row  center-align'>
            <div className='btn-floating btn-med'>
              <i className='material-icons pink white-text circle'>
                lock_outline
              </i>
            </div>
          </div>
          <div className='row'>
            <div className='input-field col s12 '>
              <input
                id='user_name'
                type='text'
                className='validate'
                name='name'
                value={name}
                onChange={onChange}
              />
              <label htmlFor='user_name'>
                <Trans>User Name</Trans>
              </label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12 '>
              <input
                id='password'
                type='password'
                className='validate'
                name='password'
                value={password}
                onChange={onChange}
              />
              <label htmlFor='password'>
                <Trans>Password</Trans>
              </label>
            </div>
          </div>

          <div className='row'>
            <div className='input-field col s12 '>
              <button
                className='btn waves-effect waves-light green'
                type='submit'
                name='action'
              >
                <Trans>SignIn</Trans>
                <i className='material-icons right'>send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default translate('translations')(SignIn);
