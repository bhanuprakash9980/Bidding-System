import React from 'react';

import { Trans, translate } from 'react-i18next';
const ReviewCard = ({ review }) => {
  const t = new Date(review.createdAt);

  return (
    <div className='col s12'>
      <li className='collection-item avatar'>
        <i className='material-icons circle'>mode_edit</i>
        <span className='title'> {review && review.reviewTitle}</span>
        <p>{review && review.reviewDesc}</p>
        <p>
          <Trans>Review by</Trans> {review && review.username}
        </p>
        <p>
          <Trans>Review to</Trans> {review && review.product_name}
        </p>
        <p>
          <Trans>Reviewed on</Trans> {t.toString()}
        </p>
        <a href='#!' className='secondary-content'>
          {review && review.rating}
          <i className='material-icons'>grade</i>
        </a>
      </li>
    </div>
  );
};

export default translate('translations')(ReviewCard);
