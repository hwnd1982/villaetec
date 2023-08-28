import { listAnimate } from "./listAnimation.js";
import { debounce } from "./utils.js";

const regionSearchHandler = () => {
  const whereBuy = document.querySelector('.where-buy');

  if (!whereBuy) return;

  let itemsCount = 0, blurDelay = null;
  const search = whereBuy.querySelector('.region-search');
  const input = search.querySelector('.region-search__input');
  const map = document.getElementById('region-map');
  
  const placeholder = search.querySelector('.region-search__placeholder');
  const listWrap = search.querySelector('.region-search__list-wrap');
  const list = listWrap.firstElementChild;

  const mapItems = map?.querySelectorAll('.region') || [];
  const items = mapItems.length ? [...mapItems].map(({dataset: {region, name}}) => {
    const listItem = document.createElement('li');
    const listItemLink = document.createElement('a');

    listItem.classList.add('region-search__item');
    listItemLink.classList.add('region-search__item-link');
    listItemLink.dataset.region = region;
    listItemLink.setAttribute('href', `#${region}`);
    listItemLink.textContent = name;
    listItem.append(listItemLink);

    return listItem;
  }) : [...list.querySelectorAll('.region-search__item')];

  const searchRegion = debounce(({target}) => {
    const foundItems = target.value ? items.filter(item => 
      item.textContent.trim().toLowerCase().startsWith(target.value.trim().toLowerCase())) : [];
    const toggleAnimation = () => {
      list.append(...foundItems);
      listAnimate(listWrap, true);
    }

    if (itemsCount && itemsCount === foundItems.length) {
      return;
    } else {
      itemsCount = foundItems.length;
    }

    if (foundItems.length && target.value && !search.classList.contains('_active')) {
      search.classList.add('_active');
    }

    if (target.value && search.classList.contains('_active')) {
      if(list.textContent)
        listAnimate(listWrap, false).onfinish = () => {
          list.textContent = '';
          toggleAnimation()
        };
      else toggleAnimation();
    }

    if ((!target.value || !foundItems.length) && search.classList.contains('_active')) {
      search.classList.remove('_active');

      listAnimate(listWrap, false).onfinish = () => (list.textContent = '');
    }
    
    mapItems.forEach((item, index) => {
      item.classList[foundItems.includes(items[index]) ? 'add': 'remove']('_active');
    });
  }, 400);

  input.addEventListener('input', (event) => {
    if (event.target.value && !placeholder.classList.contains('_hidden'))
      placeholder.classList.add('_hidden');
    
    if (!event.target.value && placeholder.classList.contains('_hidden'))
      placeholder.classList.remove('_hidden');
    
    searchRegion(event);
  });

  // init
  list.textContent = '';
  if (input.value) {
    const foundItems = items.filter(item => item.textContent.trim().toLowerCase().startsWith(input.value.trim().toLowerCase()));

    itemsCount = foundItems.length;
    list.append(...foundItems);
  }
    

  input.addEventListener('blur', () => {
    blurDelay = setTimeout(() => {
      listAnimate(listWrap, false);
      search.classList.remove('_active');
    }, 200)
  });

  input.addEventListener('focus', (event) => {
    if (event.target.value && !search.classList.contains('_active')) {
      listAnimate(listWrap, true);
      search.classList.add('_active');
    }
  });

  whereBuy.addEventListener('click', ({target}) => {
    const menuItem = target.closest('.region-search__item');
    const menuItemLink = menuItem?.firstElementChild;
    const mapRegion = target.closest('.region');
    const menu = target.closest('.region-search__list-wrap');

    if (!mapRegion && !menu) return;

    const foundItems = [];

    if (blurDelay) {
      clearTimeout(blurDelay);
      blurDelay = null;
    } 

    if (menuItemLink) {
      input.value = menuItemLink.textContent;
      search.classList.remove('_active');
      listAnimate(listWrap, false).onfinish = () => {
        list.textContent = '';
        list.append(menuItem);
        foundItems.push(menuItem);
        
        mapItems.forEach((item, index) => {
          item.classList[foundItems.includes(items[index]) ? 'add': 'remove']('_active');
        });
      };
    }
    
    if (mapRegion) {
      foundItems.push(...items.filter(item => item.textContent.trim().toLowerCase().startsWith(mapRegion.dataset.name.trim().toLowerCase())));

      input.value = mapRegion.dataset.name;
      if (search.classList.contains('_active')) {
        search.classList.remove('_active');
        listAnimate(listWrap, false).onfinish = () => {
          list.textContent = '';
          list.append(...foundItems);
          mapItems.forEach((item, index) => {
            item.classList[foundItems.includes(items[index]) ? 'add': 'remove']('_active');
          });
        };
      } else {
        list.textContent = '';
        list.append(...foundItems);
        mapItems.forEach((item, index) => {
          item.classList[foundItems.includes(items[index]) ? 'add': 'remove']('_active');
        });
      }

      placeholder.classList.add('_hidden');
    }
    
    if(!menuItemLink && menu) {
      input.focus();
    } 
  });

};

export default regionSearchHandler;
