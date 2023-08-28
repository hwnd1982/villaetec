import { catalogAnimate, listAnimate } from "./listAnimation.js";

const mobileMenuHandler = () => {
  const header = document.querySelector('.header');
  
  if (!header) return;

  const burger = header.querySelector('.mobile-menu-btn');
  const mobileMenu = header.querySelector('.mobile-menu');

  const mobileMenuCatalog = mobileMenu.querySelector('.mobile-menu-catalog');
  const activeItems = mobileMenuCatalog.getElementsByClassName('_active');

  mobileMenu.addEventListener('click', ({target}) => {
    const turn = target.closest('.mobile-menu__catalog-turn, .mobile-menu-catalog__turn');
    
    if (turn) {
      const header = turn.closest('.mobile-menu__catalog-header, .mobile-menu-catalog__item-header');
      const [active] = activeItems;
      const next = header.nextElementSibling;
      const prev = active?.nextElementSibling;

      header.classList.toggle('_active');
      if (prev) {
        active.classList.remove('_active');
        listAnimate(prev, false);
      }

      if (header.classList.contains('mobile-menu-catalog__item-header'))
        listAnimate(next, header.classList.contains('_active'));
      
      if (header.classList.contains('mobile-menu__catalog-header')) {
        next.classList.toggle('_opened');
        catalogAnimate(next, header.classList.contains('_active'));
      }
    };
  });

  burger.addEventListener('click', () => header.classList.toggle('_open'));
  window.addEventListener('resize', () => innerWidth > 992 && header.classList.remove('_open'));
};

export default mobileMenuHandler;
