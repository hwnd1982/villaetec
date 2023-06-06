const offerSwiper = () => {
  const swiper = document.querySelector('.offer__swiper');

  if (!swiper) return;

  const pagination = swiper.querySelector('.offer__pagination');

  new Swiper(swiper, {
    speed: 400,
    loopedSlides: null,
    effect: "creative",
    creativeEffect: {
      prev: {
        opacity: 0,
        translate: [0, 0, -400],
      },
      next: {
        opacity: 0,
        translate: ["100%", 0, 0],
      },
    },
    navigation: {
      nextEl: '.offer__arrow._right',
      prevEl: '.offer__arrow._left',
    },
    pagination: {
      el: pagination,
      bulletClass: 'offer__dot',
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
      init: swiper => {
        let x = 0;
        const count = swiper.slides.length;
        
        switch(true) {
          case count <= 5:
            x = 5;
            break;
          case count >= 9:
            x = 65;
            break;
          default:
            x = 5 + 15 * (count - 5);
        }

        pagination.style.transform = `translateX(-${x}px)`;
      }
    }
  });
};

export default offerSwiper;
