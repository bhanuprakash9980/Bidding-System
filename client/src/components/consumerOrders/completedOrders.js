import React, { Fragment, useEffect, useContext } from 'react';
import CompletedOrderCard from './CompletedOrderCard';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
const CompletedOrders = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { user } = authContext;
  const {
    message,
    error,
    complete_product,
    getCompletedOrders,
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
  }, [user, props, error, message]);

  useEffect(() => {
    if (user) {
      if (user.id) getCompletedOrders(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Fragment>
      <div className='row'>
        {complete_product.map((item, index) => {
          return (
            <CompletedOrderCard
              key={index}
              product={item}
              history={props.history}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default CompletedOrders;
