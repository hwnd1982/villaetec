const categoryGoodsSwiper = () => {
  const swiper = document.querySelector('.popular-goods__swiper');

  if (!swiper) return;
  const [prevEl, nextEl] = document.querySelectorAll('.popular-goods__arrow');

  new Swiper(swiper, {
    spaceBetween: 5,
    watchSlidesProgress: true,
    slideVisibleClass: 'swiper-slide-visible',
    speed: 400,
    slidesPerView: 2,
    navigation: {
      nextEl,
      prevEl,
    },
    breakpoints: {
      578: {
        spaceBetween: 10,
        slidesPerView: 2,
        enabled: true,
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 2,
        enabled: true,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 0,
        enabled: false,
      }
    }
  });
};

export default categoryGoodsSwiper;