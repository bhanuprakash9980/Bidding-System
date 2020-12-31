import React, { useContext, useEffect, useState } from 'react';
import ReviewContext from '../../context/review/reviewContext';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css/dist/js/materialize';
import { translate, Trans } from 'react-i18next';
const CompletedOrderCard = ({ product, history }) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const reviewContext = useContext(ReviewContext);
  const authContext = useContext(AuthContext);
  const { message, error, giveReview } = reviewContext;
  const { user } = authContext;

  useEffect(() => {
    if (!localStorage.token) {
      history.push('/');
    }
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
  }, [history, error, message]);
  const modalId = `modal${product.id}`;
  const hrefModal = `#${modalId}`;

  const [review, setReview] = useState({
    reviewTitle: '',
    reviewDesc: '',
    rating: 0,
  });

  const onChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const { reviewTitle, reviewDesc, rating } = review;
  const onSubmit = (e) => {
    e.preventDefault();
    if (reviewTitle === '' || reviewDesc === '' || rating === 0)
      M.toast({
        html: 'Please Enter All fields',
        displayLength: 1000,
        classes: 'rounded red',
      });
    else giveReview(user.id, product.id, { reviewTitle, reviewDesc, rating });
  };
  const modalName = `#modal${product.id}hi`;
  const modalxId = `modal${product.id}hi`;
  return (
    <div>
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
                <div id={modalxId} className='modal'>
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
                <Trans>Final Price</Trans> : ₹{product && product.final_price}
              </p>

              <p className='flow-text'>
                <Trans>Bought on</Trans>: {product && product.purchased_at}
              </p>
              <p className='flow-text'>
                <Trans>Bought From</Trans>: {product && product.producer}
              </p>
              <a
                className='btn white-text orange modal-trigger'
                href={hrefModal}
              >
                <i className='material-icons'>mode_edit</i>
                <Trans>Review</Trans>
              </a>

              <div id={modalId} className='modal green'>
                <div className='modal-content'>
                  <h4 className='white-text'>
                    <Trans>Review the Producer</Trans>
                  </h4>
                  <p>
                    <Trans>Give reviews to producer for his service</Trans>{' '}
                  </p>
                  <form onSubmit={onSubmit}>
                    <div className='input-field '>
                      <input
                        type='text'
                        id='review_title'
                        name='reviewTitle'
                        className='white-text'
                        value={reviewTitle}
                        onChange={onChange}
                      />
                      <label
                        className='active white-text'
                        htmlFor='review_title'
                      >
                        <Trans>Review Title</Trans>
                      </label>
                    </div>
                    <div className='input-field white-text'>
                      <textarea
                        type='text'
                        id='textarea'
                        className='materialize-textarea white-text'
                        name='reviewDesc'
                        value={reviewDesc}
                        onChange={onChange}
                      ></textarea>
                      <label className='active white-text' htmlFor='textarea '>
                        <Trans>Review Description</Trans>
                      </label>
                    </div>
                    <div className='input-field '>
                      <input
                        type='number'
                        id='rating'
                        name='rating'
                        min='1'
                        max='5'
                        value={rating}
                        onChange={onChange}
                        className='white-text'
                      />
                      <label className='active white-text' htmlFor='rating'>
                        <Trans>Rating</Trans>
                      </label>
                    </div>
                    <div className='input-field '>
                      <button className='btn  yellow black-text ' type='submit'>
                        <Trans>Review</Trans>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default translate('translations')(CompletedOrderCard);
