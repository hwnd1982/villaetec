const productSwiper = () => {
  const productImgs = document.querySelector('.product__imgs');
  
  if (!productImgs) return;

  const productThumbs = document.querySelector('.product__thumbs');
  const [prevEl, nextEl] = document.querySelectorAll('.product__arrow');

  const swiper = new Swiper(productThumbs, {
    spaceBetween: 4,
    slidesPerView: 3,
    speed: 400,
    autoScrollOffset: 1,
    slideToClickedSlide: true,
    breakpoints: {
      768: {
        spaceBetween: 9,  
      },
    }
  });

  new Swiper(productImgs, {
    spaceBetween: 30,
    speed: 400,
    navigation: {
      nextEl,
      prevEl,
    },
    thumbs: {
      swiper
    },
  });
};

export default productSwiper;
