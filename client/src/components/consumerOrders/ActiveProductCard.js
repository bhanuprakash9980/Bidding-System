import React, { Fragment, useContext, useEffect } from 'react';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import { translate, Trans } from 'react-i18next';
import M from 'materialize-css/dist/js/materialize.js';

import Timer from 'react-compound-timer';
const ActiveProductCard = ({ product }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const authContext = useContext(AuthContext);

  const productContext = useContext(ProductContext);
  const { user } = authContext;
  const { increaseBid, getAllProducts } = productContext;

  const timeRemaining = Math.abs(
    new Date() - new Date(product && product.bid_due)
  );

  const increase = () => {
    increaseBid(user.id, product.id);
    getAllProducts();
  };
  const modalName = `#modal${product.id}`;
  const modalId = `modal${product.id}`;
  return (
    <div className='col l6 s12'>
      <div className='row'>
        <div className='col s12'>
          <div className='card white darken-1'>
            <div className='card-content green-text'>
              <span className='card-title flow-text'>
                {' '}
                {product && product.product_name}
              </span>
              <div>
                <a
                  className='waves-effect waves-light btn modal-trigger'
                  href={modalName}
                >
                  See Product Pictures
                </a>
                <div id={modalId} className='modal'>
                  <div className='modal-content'>
                    <h4>Product Images</h4>
                    <div className='row'>
                      {product.images[0].images.map((item, index) => {
                        return (
                          <div className='row' key={index}>
                            <div className='col s12'>
                              <img
                                src={item}
                                alt=''
                                className='responsive-img'
                                // style={{ width: 200, height: 200 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <p className='truncate'>{product && product.product_desc}</p>

              <p className='flow-text'>
                <Trans>Current Price</Trans> : ₹{product && product.final_price}
              </p>
              <button className='btn pink' onClick={increase}>
                <Trans>Increase Bid by</Trans> 5%
              </button>

              <p className='flow-text'>
                <Trans>Bid Due in</Trans> :{' '}
                <Timer initialTime={timeRemaining} direction='backward'>
                  {() => (
                    <Fragment>
                      <Timer.Days /> <Trans>days</Trans> <Timer.Hours />{' '}
                      <Trans>hours</Trans> <Timer.Minutes />{' '}
                      <Trans>minutes</Trans> <Timer.Seconds />{' '}
                      <Trans>seconds</Trans>{' '}
                    </Fragment>
                  )}
                </Timer>
              </p>
              <p className='flow-text'>
                <Trans>Produced By</Trans>: {product && product.producer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate('translations')(ActiveProductCard);
