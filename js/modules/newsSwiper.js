const newsSwiper = () => {
  const swiper = document.querySelector('.news__swiper');

  if (!swiper) return;

  const players = document.querySelectorAll('.news-video__frame');
  const pagination = swiper.querySelector('.news__pagination');
  const paginationPositionUpdate = swiper => {
        let x = 0, show = -1;
        const count = swiper.slides.length;
        
        switch(true) {
          case innerWidth >= 1200: 
            show++;
          case innerWidth >= 992: 
            show++;
          default:
            show++;
        }

        switch(true) {
          case count <= 5 + show:
            x = 5;
            break;
          case count >= 9 + show:
            x = 65;
          default:
            x = 5 + 15 * (count - show - 5);
        }
        
        pagination.style.transform = `translateX(-${x}px)`;
      };

  players.forEach(player => new YT.Player(player, {
    width: '630',
    height: '450',
    videoId: player.dataset.src,
    playerVars: {
      autoplay: 0,
      'clipboard-write': 1,
      'encrypted-media': 1,
      'picture-in-picture': 1,
      'web-share': 1,
      allowfullscreen: 1
    },
    events: {
      onStateChange: ({data, target}) => {
        const info = target.g.parentElement.nextElementSibling;

        switch(data) {
          case 1: info.classList.add('_hidden'); break;
          case 2: info.classList.remove('_hidden'); break;
        }
      }
    }
  }));

  new Swiper(swiper, {
    slidesPerView: 'auto',
    spaceBetween: 30,
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
      init: paginationPositionUpdate,
      resize: swiper => {
        swiper.slideTo(0, 0);
        swiper.slides.forEach(slide => slide.style.marginRight = '');

        setTimeout(() => {
          swiper.update();
          paginationPositionUpdate(swiper);
        }, 10);
      }
    }
  });
};

export default newsSwiper;
