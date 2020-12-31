import React, { useEffect } from 'react';
import { translate, Trans } from 'react-i18next';
import M from 'materialize-css/dist/js/materialize.js';

const CompletedOrderCard = ({ product }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);
  let t = new Date(product.purchased_at);
  const modalName = `#modal${product.id}`;
  const modalId = `modal${product.id}`;
  return (
    <div>
      <div className='row'>
        <div className='col s12'>
          <div className='card white darken-1'>
            <div className='card-content green-text'>
              <span className='card-title flow-text'>
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
                <Trans>Final Price</Trans> : {product && product.final_price}
              </p>

              <p className='flow-text'>
                <Trans>Sold on</Trans>: {t.toString()}
              </p>
              <p className='flow-text'>
                <Trans>Sold to</Trans>: {product && product.lastBidder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate('translations')(CompletedOrderCard);
