import Swiper from '../../node_modules/swiper/swiper-bundle.esm.browser.min.js';

const swiper = new Swiper('.swiper', {
  sliderPerView: 2,
  loop: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.album__right',
    prevEl: '.album__left',
  },
});


export default swiper;
