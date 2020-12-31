import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Controller,
  Thumbs,
  Autoplay,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import { translate, Trans } from 'react-i18next';

SwiperCore.use([Navigation, Pagination, Controller, Thumbs, Autoplay]);

function App() {
  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag='li'>
        <img
          src={`https://loremflickr.com/1400/500/agriculture?random=${i}`}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
          className='responsive-img'
        />
        <div className='text-block flow-text '>
          <h4>
            <Trans>Agro Bid</Trans>
          </h4>
          <p>
            <Trans>
              A commission free web application for that benefits you all
            </Trans>
          </p>
        </div>
      </SwiperSlide>
    );
  }

  return (
    <React.Fragment>
      <Swiper
        id='main'
        tag='section'
        wrapperTag='ul'
        navigation
        pagination
        spaceBetween={0}
        loop
        autoplay={{ delay: 2000 }}
        slidesPerView={1}
        className='center-align'
      >
        {slides}
      </Swiper>
    </React.Fragment>
  );
}

export default translate('translations')(App);
