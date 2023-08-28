import { listAnimate } from "./listAnimation.js";

const goodsFilterHandler = () => {
  const {goodsFilter} = document.forms;

  if (!goodsFilter) return;

  const priceItems = goodsFilter.querySelectorAll('.price-input>input');
  const [minPrice, maxPrice] = priceItems;
  const defaultValue = {min: minPrice.value, max: maxPrice.value};
  const currentNumValue = {
    min: minPrice.value.replaceAll(/[^\d]/g, ''),
    max: maxPrice.value.replaceAll(/[^\d]/g, '')
  };
  
  goodsFilter.addEventListener('click', ({target}) => {
    const filterHeader = target.closest('.goods-filter__header');
    const fieldsetHeader = target.closest('.goods-filter__fieldset-header');

    if (filterHeader) {
      goodsFilter.classList.toggle('_active');
      
      listAnimate(filterHeader.nextElementSibling, goodsFilter.classList.contains('_active'));
    }

    if (fieldsetHeader) {
      const fieldset =  fieldsetHeader.parentElement;
      const body =  fieldsetHeader.nextElementSibling;

      fieldset.classList.toggle('_opened');
      listAnimate(body, fieldset.classList.contains('_opened'));
    }
  });

  priceItems.forEach(item => {
    const type = item.getAttribute('name').slice(0, 3);
    const extremeValues = {min: +item.getAttribute('min'), max: +item.getAttribute('max')};

    item.addEventListener('focus', ({target}) => target.classList.contains('_default-value') && (target.value = ''));
    item.addEventListener('blur', ({target}) => {
      if (!target.value.trim()) {
        switch (type) {
          case 'min': 
            if (+defaultValue[type].replaceAll(/[^\d]/g, '') < currentNumValue['max']) {
              target.value = defaultValue[type];
              target.classList.add('_default-value');
              return;
            }

            target.value = `${currentNumValue['max'] - 1}`
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            target.classList.remove('_default-value');
          break;

          case 'max': 
            if (+defaultValue[type].replaceAll(/[^\d]/g, '') > currentNumValue['min']) {
              target.value = defaultValue[type];
              target.classList.add('_default-value');
              return;
            }
              
            target.value = `${currentNumValue['min'] + 1}`
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            target.classList.remove('_default-value');
          break;
        }
      }
    });
    item.addEventListener('input', ({target}) => {

      if (target.value) {
        target.classList.remove('_default-value');
      } else {
        target.classList.add('_default-value');
        return;
      }

      let value = +target.value.slice(0, 7).replaceAll(/[^\d]/g, '');

      switch (type) {
        case 'min': 
          if (value < extremeValues[type]) value = extremeValues[type];
          if (value >= currentNumValue['max']) value = currentNumValue['max'] - 1;
        break;
        
        case 'max': 
          if (value > extremeValues[type]) value = extremeValues[type];
          if (value <= currentNumValue['min']) value = currentNumValue['min'] + 1;
        break;
      }

      currentNumValue[type] = value;

      target.value = `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    });
  });
};

export default goodsFilterHandler;