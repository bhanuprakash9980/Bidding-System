import React, { Fragment, useEffect, useContext } from 'react';
import ActiveProductCard from './ActiveProductCard';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
const AllProducts = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { user } = authContext;
  const { message, error, product, getAllProducts } = productContext;

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
    getAllProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.final_price]);

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

export default AllProducts;
