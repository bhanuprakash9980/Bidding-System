import React, { Fragment } from 'react';
import Slider from '../layout/Slider';
import Footer from '../layout/Footer';
import { translate, Trans } from 'react-i18next';

const Landing = () => {
  return (
    <Fragment>
      <Slider />
      <div className='row container'>
        <div className='col l6 m12'>
          <ul>
            <li className='row'>
              <p className='flow-text'>
                <i className='material-icons'>arrow_forward</i>
                <Trans>
                  Post product at minimum price and get the maximum possible
                  profit
                </Trans>
              </p>
            </li>
            <li className='row'>
              <p className='flow-text'>
                <i className='material-icons'>arrow_forward</i>
                <Trans>
                  Bid only on interested product and get price worthy products
                </Trans>
              </p>
            </li>
            <li className='row'>
              <p className='flow-text'>
                <i className='material-icons'>arrow_forward</i>
                <Trans>More demand more is the profit</Trans>
              </p>
            </li>
            <li className='row'>
              <p className='flow-text'>
                <i className='material-icons'>arrow_forward</i>
                <Trans>
                  Buy on quality products from producer of your interest.
                </Trans>
              </p>
            </li>
          </ul>
        </div>
        <div className='col l4 offset-l2  m12'>
          <div className='row'>
            {' '}
            <h1 className='flow-text'>
              <Trans>Agro Bid</Trans>
            </h1>
          </div>
          <div className='row'>
            <p className='flow-text'>
              <Trans>
                Through this system we are proposing a bidding system between
                the producers and consumers through an admin. So basically a
                producer will have to register as a user into the database and
                then he a put any of his product into the system. After we will
                be extracting an approximate price from the database on previous
                trends and the demand. Once the producer is satisfied with the
                price the product, consumer will be allowed to bid on it.
                Whosoever bid the most will get the product.
              </Trans>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default translate('translations')(Landing);
