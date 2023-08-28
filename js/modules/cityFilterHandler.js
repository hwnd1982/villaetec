import { listAnimate } from "./listAnimation.js";

const cityFilterHandler = () => {
  const {cityFilter} = document.forms;

  if (!cityFilter) return;

  const cityInput = cityFilter.querySelector('.select__header-input');
  const select = cityFilter.querySelector('.select');

  cityFilter.addEventListener('click', ({target}) => {
    const selectHeader = target.closest('.select__header');
    const selectItem = target.closest('.select__item');
    const filterHeader = target.closest('.city-filter__header');
    

    if (filterHeader) {
      cityFilter.classList.toggle('_active');
      if (!cityFilter.classList.contains('_active')) {
        if (select.classList.contains('_opened'))
          select.classList.remove('_opened');
        
        filterHeader.nextElementSibling.style.overflow = 'hidden';
        setTimeout(() => filterHeader.nextElementSibling.style.overflow = '', 500);
      }
        


      listAnimate(filterHeader.nextElementSibling, cityFilter.classList.contains('_active')).onfinish = () => {
        if (cityFilter.classList.contains('_active'))
          filterHeader.nextElementSibling.style.overflow = 'visible';
      };
    }

    if (selectHeader) {
      select.classList.toggle('_opened');
      listAnimate(selectHeader.nextElementSibling, select.classList.contains('_opened'));
    }
      
    
    if (selectItem) {
      if (selectItem.textContent === 'Все города')
        cityInput.value = ''
      else
        cityInput.value = selectItem.textContent;
        
      select.classList.remove('_opened');
    }
  });
};

export default cityFilterHandler;