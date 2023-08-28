import { getTrigger } from "./utils.js";

const goodsSwiper = () => {
  const swipers = document.querySelectorAll('.goods-swiper__swiper');
  const trigger = getTrigger(992);

  swipers.forEach(swiper => {
    let paginationItemtranslateX = 0;
    const [prevEl, nextEl] = swiper.querySelectorAll('.goods-swiper__arrow');
    const pagination = swiper.querySelector('.goods-swiper__pagination');
    const singleSlides = swiper.querySelectorAll('.swiper-slide');
    const groupSlides = [...singleSlides].map((singleSlide, index) => {
      const group = document.createElement('li');
      
      group.classList.add('goods-swiper__item-group', 'swiper-slide');
      
      for (let i = 0; i < 2; i++) {
        const slide = document.createElement('div');

        slide.innerHTML = singleSlides[(index + 1) % singleSlides.length].innerHTML;
        group.appendChild(slide).classList.add('goods-card');
      }

      return group;
    });
    

    swiper.firstElementChild.textContent = '';
    swiper.firstElementChild.append(...(innerWidth > 992 ? singleSlides : groupSlides));
    new Swiper(swiper, {
      spaceBetween: 5,
      watchSlidesProgress: true,
      slideVisibleClass: 'swiper-slide-visible',
      speed: 400,
      slidesPerView: 2,
      loop: true,
      navigation: {
        nextEl,
        prevEl,
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
        init: swiper => {
          paginationItemtranslateX = `translateX(${-1 * (parseFloat(pagination.childNodes[0].style.left) + 5)}px)`;
          swiper.removeAllSlides();
          swiper.appendSlide(innerWidth > 992 ? singleSlides : groupSlides);
        },
        resize: swiper => {
          if (trigger()) {
            swiper.removeAllSlides();
            swiper.appendSlide(innerWidth > 992 ? singleSlides : groupSlides);
          }
        },
        paginationUpdate: () => pagination.childNodes.forEach(item => item.style.transform = paginationItemtranslateX),
      },
      breakpoints: {
        578: {
          spaceBetween: 10,
          slidesPerView: 2,
          watchSlidesProgress: true,
          slideVisibleClass: 'swiper-slide-visible',
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 2,
          watchSlidesProgress: true,
          slideVisibleClass: 'swiper-slide-visible',
        },
        992: {
          watchSlidesProgress: true,
          slideVisibleClass: 'swiper-slide-visible',
          slidesPerView: 3,
          spaceBetween: 32,
        },
        1200: {
          watchSlidesProgress: true,
          slideVisibleClass: 'swiper-slide-visible',
          slidesPerView: 4,
          spaceBetween: 32,
        }
      }
    });

    pagination.childNodes.forEach(item => item.style.transform = paginationItemtranslateX);
  });

};

export default goodsSwiper;