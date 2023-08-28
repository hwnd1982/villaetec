const newsSwiper = () => {
  const swiper = document.querySelector('.news__swiper');

  if (!swiper) return;

  const pagination = swiper.querySelector('.news__pagination');
      
  new Swiper(swiper, {
    slidesPerView: 'auto',
    // spaceBetween: 30,
    watchSlidesProgress: true,
    slideVisibleClass: 'swiper-slide-visible',
    loop: true,
    etWrapperSize: true,
    navigation: {
      nextEl: '.news__arrow._right',
      prevEl: '.news__arrow._left',
    },
    pagination: {
      el: pagination,
      bulletClass: 'news__dot',
      type: 'bullets',
      dynamicBullets: true,
      dynamicMainBullets: 5,
      clickable: true,
      bulletActiveClass: '_active',
      renderBullet: function (index, className) {
        return `<div class="${className}"></div>`;
      },
    },
    on: {
      resize: swiper => swiper.update(),
    }
  });
};

export default newsSwiper;
