const movieSwiper = (frames = 32, frameRete = 40) => {
  const swiper = document.querySelector('.swiper');

  if (!swiper) return;


  for (let i = 0; i < frames; i++) {    
    swiper.firstElementChild.appendChild(document.createElement('li')).classList.add('swiper-slide', 'frame');
  }

  new Swiper(swiper, {
    speed: 0,
    autoplay: {
      delay: frameRete,
      // pauseOnMouseEnter: true
    },
  });
};

export default movieSwiper;