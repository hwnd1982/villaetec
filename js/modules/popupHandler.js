import { listAnimate } from "./listAnimation.js";

const popupHandler = () => {
  const pupupBtns = document.querySelectorAll('.popup-button');
  const popupOverlay = document.querySelector('.popup-overlay');
  const activePopups = popupOverlay.getElementsByClassName('popup _active');

  const sections = document.querySelectorAll('header, section, footer');
  const {body} = document;
  
  const setOverflow = () => {
    const width = body.offsetWidth;

    if (body.classList.contains('_scroll-hidden')) {
      setTimeout(() => {
        body.classList.toggle('_scroll-hidden');

        sections.forEach(section => {
          section.style.cssText = 'transition: 0s;'
          setTimeout(() => section.style.cssText, 10);
        });
      }, 410);
    
      return;
    }

    body.classList.toggle('_scroll-hidden');

    if (!(body.offsetWidth - width)) return;
    
    const padding = `${body.offsetWidth - width}px`;

    sections.forEach(section => section.style.cssText = `transition: 0s; padding-right: ${padding};`);
  };

  pupupBtns.forEach(btn => btn.addEventListener('click', () => {
    if (!btn.dataset.target) return;

    const [activePopup] = activePopups
    
    popupOverlay.classList.toggle('_opened');
    popupOverlay.querySelector(`.${btn.dataset.target}`).classList.add('_active');
    setOverflow();
  }));

  popupOverlay.addEventListener('click', ({target}) => {
    const close = target.closest('.popup-close');
    const popup = target.closest('.popup');
    const selectHeader = target.closest('.select__header');
    const selectItem = target.closest('.select__item');
    const select = target.closest('.select');
    
    if (!popup || close) {
      const [activePopup] = activePopups;

      activePopup.classList.remove('_active');
      popupOverlay.classList.remove('_opened');

      setOverflow();
    }

    if (!select) return;

    const input = select.querySelector('select');

    if (selectHeader) {
      select.classList.toggle('_opened');
      listAnimate(selectHeader.nextElementSibling, select.classList.contains('_opened'));
    }

    if (selectItem) {
      input.value = selectItem.dataset.value;
      select.classList.remove('_opened');
      listAnimate(selectHeader.nextElementSibling, select.classList.contains('_opened'));
    }
  });
};

export default popupHandler;