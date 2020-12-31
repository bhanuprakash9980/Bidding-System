import React, { Fragment } from 'react';
import Footer from '../layout/Footer';
import AllProducts from '../consumerOrders/AllProducts';
import CompletedOrders from '../consumerOrders/completedOrders';
import { Trans, translate } from 'react-i18next';
const Consumer = (props) => {
  return (
    <Fragment>
      <div className='row'>
        <div className='col s12'>
          <ul className='tabs'>
            <li className='tab col s6 '>
              <a href='#test1' className='green-text'>
                <Trans>View Products</Trans>
              </a>
            </li>
            <li className='tab col s6'>
              <a href='#test2' className='green-text'>
                <Trans>Completed orders</Trans>
              </a>
            </li>
          </ul>
        </div>
        <div id='test1' className='col s12'>
          <AllProducts history={props.history} />
        </div>
        <div id='test2' className='col s12'>
          <CompletedOrders history={props.history} />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default translate('translations')(Consumer);
