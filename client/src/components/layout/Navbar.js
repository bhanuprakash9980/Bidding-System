import React, { Fragment, useContext, useEffect } from 'react';
import 'materialize-css/dist/js/materialize';
import 'materialize-css/dist/css/materialize.css';
import AuthContext from '../../context/auth/authContext';
import { translate, Trans } from 'react-i18next';
const Navbar = ({ changeLanguage }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout, getUser, token } = authContext;

  useEffect(() => {
    if (token != null) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const out = () => {
    logout();
  };
  return (
    <Fragment>
      <nav className='green'>
        <div className='nav-wrapper'>
          <a href='/' className='brand-logo'>
            <i className='material-icons'>local_florist</i>
            <Trans>Agro Bid</Trans>
          </a>

          {/* eslint-disable-next-line */}
          <a href='#' data-target='mobile-demo' className='sidenav-trigger'>
            <i className='material-icons'>menu</i>
          </a>
          <ul className='right hide-on-med-and-down'>
            <li>
              {/* eslint-disable-next-line */}
              <a href='/'>
                <Trans>Home</Trans>
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a href='#' onClick={() => changeLanguage('de')}>
                ಕನ್ನಡ
              </a>
            </li>
            <li>
              {/* eslint-disable-next-line */}
              <a href='#' onClick={() => changeLanguage('en')}>
                English
              </a>
            </li>
            {!isAuthenticated && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/signup'>
                  <Trans>Register</Trans>
                </a>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/signin'>
                  <Trans>Login</Trans>
                </a>
              </li>
            )}
            {isAuthenticated && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/profile' className='white-text'>
                  <Trans>Profile</Trans>
                </a>
              </li>
            )}
            {isAuthenticated && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/' className='white-text' onClick={out}>
                  <Trans>Logout</Trans>
                </a>
              </li>
            )}
            {isAuthenticated && user.roles.includes('ROLE_PRODUCER') && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/producer'>
                  <Trans>Producer</Trans>
                </a>
              </li>
            )}
            {isAuthenticated && user.roles.includes('ROLE_CONSUMER') && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/consumer'>
                  <Trans>Consumer</Trans>
                </a>
              </li>
            )}
            {isAuthenticated && user.roles.includes('ROLE_ADMIN') && (
              <li>
                {/* eslint-disable-next-line */}
                <a href='/admin'>
                  <Trans>Admin</Trans>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <ul className='sidenav green' id='mobile-demo'>
        <li>
          {/* eslint-disable-next-line */}
          <a href='/' className='white-text'>
            <Trans>Home</Trans>
          </a>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a
            href='#'
            className='white-text'
            onClick={() => changeLanguage('de')}
          >
            ಕನ್ನಡ
          </a>
        </li>
        <li>
          {/* eslint-disable-next-line */}
          <a
            href='#'
            className='white-text'
            onClick={() => changeLanguage('en')}
          >
            English
          </a>
        </li>
        {!isAuthenticated && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/signup' className='white-text'>
              <Trans>Register</Trans>
            </a>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/signin' className='white-text'>
              <Trans>Login</Trans>
            </a>
          </li>
        )}
        {isAuthenticated && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/profile' className='white-text'>
              <Trans>Profile</Trans>
            </a>
          </li>
        )}
        {isAuthenticated && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/' className='white-text' onClick={out}>
              <Trans>Logout</Trans>
            </a>
          </li>
        )}
        {isAuthenticated && user.roles.includes('ROLE_PRODUCER') && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/producer' className='white-text'>
              <Trans>Producer</Trans>
            </a>
          </li>
        )}
        {isAuthenticated && user.roles.includes('ROLE_CONSUMER') && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/consumer' className='white-text'>
              <Trans>Consumer</Trans>
            </a>
          </li>
        )}
        {isAuthenticated && user.roles.includes('ROLE_ADMIN') && (
          <li>
            {/* eslint-disable-next-line */}
            <a href='/admin' className='white-text'>
              <Trans>Admin</Trans>
            </a>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default translate('translations')(Navbar);
