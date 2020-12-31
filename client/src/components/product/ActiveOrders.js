import React, { Fragment, useEffect, useContext } from 'react';
import ActiveProductCard from './ActiveProductCard';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
import { translate } from 'react-i18next';
const ActiveOrders = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { user } = authContext;
  const {
    message,
    error,
    product,
    getActiveProductsByProducer,
  } = productContext;

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
    if (user) {
      if (user.id) getActiveProductsByProducer(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fragment>
      <div className='row'>
        {product.map((item) => {
          return <ActiveProductCard key={item && item.id} product={item} />;
        })}
      </div>
    </Fragment>
  );
};

export default translate('translations')(ActiveOrders);
