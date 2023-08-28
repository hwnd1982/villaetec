import { listMinimizeAnimate } from "./listAnimation.js";

const productDetailsHandler = () => {
  const details = document.querySelector('.product__details');
  
  if (!details) return;

  const [prevEl, nextEl] = details.querySelectorAll('.product__details-btn');
  const navigationLink = document.querySelector('.navigation-link');

  const swiper = new Swiper(details, {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 400,
    autoHeight: true,
    navigation: {
      nextEl,
      prevEl,
    },
  });

  details.addEventListener('click', ({target}) => {
    const more = target.closest('.product__more');
    
    if (more) {
      const list = more.previousElementSibling.firstElementChild;
      
      listMinimizeAnimate(more.previousElementSibling).onfinish = () => {
        more.textContent = more.dataset[list.classList.contains('_show') ? 'full' : 'minimize'];
        swiper.updateAutoHeight(400);
      };
      
    }
  });
  
  navigationLink.addEventListener('click', event => {
    const currentTarget = event.currentTarget;
    const target = document.querySelector(currentTarget.getAttribute('href'));
    
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start"});
    }
  });
};

export default productDetailsHandler;
