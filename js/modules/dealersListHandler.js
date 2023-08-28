import { listAnimate } from "./listAnimation.js";

const dealersListHandler = () => {
  const dealersList = document.querySelector('.dealers-list');

  if (!dealersList) return;

  const activeItems = dealersList.getElementsByClassName('dealers-list__item-header _active');

  dealersList.addEventListener('click', ({target}) => {
    const [activeItem] = activeItems;
    const itemHeader = target.closest('.dealers-list__item-header');
    const itemBody = itemHeader?.nextElementSibling;

    if (itemHeader) {
      if (activeItem && activeItem !== itemHeader) {
        activeItem.classList.remove('_active');
        listAnimate(activeItem.nextElementSibling, false);
      }
      
      itemHeader.classList.toggle('_active');
      listAnimate(itemBody, itemHeader.classList.contains('_active'));
    }
  });
};

export default dealersListHandler;
