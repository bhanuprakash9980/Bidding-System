import React, { Fragment, useState, useEffect, useContext } from 'react';
import M from 'materialize-css/dist/js/materialize.js';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/product/productContext';
import { translate, Trans } from 'react-i18next';
import { REACT_APP_PRESET, REACT_APP_CLOUD_NAME } from '../../keys';
const CreateProduct = (props) => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);

  const { user } = authContext;
  const { message, error, createProduct, price, basePrice } = productContext;

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

  const [product, setProduct] = useState({
    product_name: '',
    product_desc: '',
    base_price: '',
    bid_due_date: '',
    bid_due_time: '',
    is_sold: false,
  });
  const {
    product_name,
    product_desc,
    base_price,
    bid_due_date,
    bid_due_time,
    is_sold,
  } = product;

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onClick = () => {
    if (product_name === '') {
      M.toast({
        html: 'Please enter product Title first',
        displayLength: 1000,
        classes: 'rounded red',
      });
    } else if (product_name !== '') {
      const func = async () => {
        await basePrice(product_name);
      };
      func();
      if (price) {
        M.toast({
          html: `Price for 1kg of ${product_name} is ${price}`,
          displayLength: 1000,
          classes: 'rounded orange',
        });
      }
    }
  };
  const [image, setImage] = useState({
    images: undefined,
  });
  const selectFiles = (e) => {
    setImage({ ...image, images: e.target.files });
  };

  const [url, setUrl] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      product_name === '' ||
      product_desc === '' ||
      base_price === '' ||
      bid_due_date === '' ||
      bid_due_time === ''
    )
      M.toast({
        html: 'Please Enter All fields',
        displayLength: 4000,
        classes: 'rounded red',
      });
    const fileUrls = [];
    for (let i = 0; i < image.images.length; i++) {
      const data = new FormData();
      data.append('file', image.images[i]);
      data.append('upload_preset', REACT_APP_PRESET);
      data.append('cloud_name', REACT_APP_CLOUD_NAME);
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`,
          {
            method: 'post',
            body: data,
          }
        );
        const resData = await res.json();
        fileUrls.push(resData.url);
      } catch (err) {
        console.log(err);
      }
    }
    if (fileUrls.length === image.images.length) {
      setUrl(fileUrls);
      if (url.length === image.images.length) {
        console.log(url);
        let bid_due = bid_due_date + ' ' + bid_due_time;
        createProduct({
          userId: user.id,
          product_name,
          product_desc,
          base_price,
          bid_due,
          is_sold,
          url: url,
        });
      }
    }
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col s12 l6 offset-l3'>
          <form className='col s12' onSubmit={onSubmit}>
            <div className='row center-align'>
              <h3 className='flow-text green-text'>
                <Trans>Create Product</Trans>
              </h3>
            </div>
            <div className='row  center-align'>
              <div className='btn-floating btn-med'>
                <i className='material-icons pink white-text circle'>
                  add_shopping_cart
                </i>
              </div>
            </div>
            <div className='row center-align'>
              <div className='input-field col s12 '>
                <div className='btn orange white-text' onClick={onClick}>
                  <Trans>Get Base Price in ₹ for 1kg of your product</Trans>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='file-field input-field col s12'>
                <div className='btn'>
                  <span>
                    <i className='material-icons'>add_a_photo</i>
                  </span>
                  <input type='file' multiple onChange={selectFiles} />
                </div>
                <div className='file-path-wrapper'>
                  <input
                    className='file-path validate'
                    type='text'
                    placeholder='Upload images associated with your product'
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 '>
                <input
                  id='product_name'
                  type='text'
                  className='validate'
                  name='product_name'
                  value={product_name}
                  onChange={onChange}
                />
                <label htmlFor='product_name'>
                  <Trans>Product Title</Trans>
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 '>
                <textarea
                  id='product_desc'
                  type='text'
                  className='materialize-textarea  validate'
                  name='product_desc'
                  value={product_desc}
                  onChange={onChange}
                />
                <label htmlFor='product_desc'>
                  <Trans>Product Description</Trans>
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 '>
                <input
                  id='base_price'
                  type='number'
                  className='validate'
                  name='base_price'
                  onChange={onChange}
                  value={base_price}
                />
                <label htmlFor='base_price'>
                  <Trans>Base Price in</Trans> ₹
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 '>
                <input
                  id='bid_due_date'
                  type='date'
                  min={new Date().toJSON().slice(0, 10)}
                  name='bid_due_date'
                  value={bid_due_date}
                  onChange={onChange}
                />
                <label htmlFor='bid_due_date'>
                  <Trans>Bid Due Date</Trans>{' '}
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 '>
                <input
                  id='bid_due_time'
                  type='time'
                  name='bid_due_time'
                  value={bid_due_time}
                  onChange={onChange}
                />
                <label htmlFor='bid_due_time'>
                  <Trans>Bid Due Time</Trans>
                </label>
              </div>
            </div>

            <div className='row'>
              <div className='input-field col s12 '>
                <button
                  className='btn waves-effect waves-light green'
                  type='submit'
                >
                  <Trans>Create Product</Trans>
                  <i className='material-icons right'>send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default translate('translations')(CreateProduct);
