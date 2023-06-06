import { listAnimate } from "./listAnimation.js";

const footerMenuHandler = () => {
  const footerCatalog = document.querySelector('.footer-catalog');

  if (!footerCatalog) return;

  let lastWidthValue = 1440;
  const categories = footerCatalog.querySelectorAll('.footer-catalog__category');
  const lists = footerCatalog.querySelectorAll('.footer-catalog__list');
  const activeItems = footerCatalog.getElementsByClassName('_active');

  const listItemsHandler = () => {
    let count = -1;
    const trigger = (
        lastWidthValue > innerWidth && innerWidth < 576 && lastWidthValue > 576
      ) || (
        lastWidthValue < innerWidth && innerWidth > 576 && lastWidthValue < 576
      );

    lastWidthValue = innerWidth;
    if (trigger) {
      categories.forEach((category, index) => {
        if (!(index % (innerWidth > 576 ? 5 : 6))) count++;

        lists[count].append(category);
      });
    }
  };

  footerCatalog.addEventListener('click', ({target}) => {
    const turn = target.closest('.footer-catalog__turn');
    
    if (turn) {
      const header = turn.closest('.footer-catalog__item-header');
      const [active] = activeItems;
      const next = header.nextElementSibling;
      const prev = active?.nextElementSibling;

      header.classList.toggle('_active');
      if (prev) {
        active.classList.remove('_active');
        listAnimate(prev, false);
      }

      listAnimate(next, header.classList.contains('_active'));
    }
  });

  listItemsHandler();
  window.addEventListener('resize', listItemsHandler);
};

export default footerMenuHandler;
