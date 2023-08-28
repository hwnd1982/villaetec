export const listAnimate = (listWrapEl, direction = false, itemAnimate = true, duration = 400) => {
  if (!listWrapEl) return;

  const iterations = 1;
  const list = listWrapEl.firstElementChild;
  const items = [...list.children];
  const {height} = list.getBoundingClientRect();
  const durationItem = duration / items.length;

  const animate = listWrapEl.animate([{height: '0'}, {height: `${height}px`}], {
    duration,
    iterations,
    direction: direction ? 'normal' : 'reverse'
  });

  if (itemAnimate)
    items.forEach((item, index) => item.animate([{opacity: 0}, {opacity: 1}], {
      duration: durationItem,
      delay: direction ? durationItem * index + 50 : durationItem * (items.length - 1 - index) - 50,
      iterations,
      direction: direction ? 'normal' : 'reverse'
    }));

  return animate;
};


export const catalogAnimate = (listWrapEl, direction = false, duration = 400) => {
  if (!listWrapEl) return;

  const iterations = 1;
  const list = listWrapEl.firstElementChild;
  const itemsList = [...list.children].map(child => child.querySelectorAll('li'));
  const {height} = list.getBoundingClientRect();

  listWrapEl.animate([{height: '0'}, {height: `${height}px`}], {
    duration,
    iterations,
    direction: direction ? 'normal' : 'reverse'
  });

  itemsList.forEach(items => {
    const durationItem = duration / items.length;

    items.forEach((item, index) => {
      item.style.opacity = +!direction;
      item.animate([{opacity: 0}, {opacity: 1}], {
        duration: durationItem,
        delay: direction ? durationItem * index : durationItem * (items.length - 1 - index),
        iterations,
        direction: direction ? 'normal' : 'reverse'
      }).onfinish = () => item.style.opacity = +direction;
    });
  });
};

export const listMinimizeAnimate = (listWrapEl, className = '_show', duration = 400) => {
  if (!listWrapEl) return;

  const iterations = 1;
  const list = listWrapEl.firstElementChild;
  const currentHeight = list.getBoundingClientRect().height;

  list.classList.toggle(className);
  
  return listWrapEl.animate([{height: `${currentHeight}px`}, {height: `${list.getBoundingClientRect().height}px`}], {
    duration,
    iterations,
    direction: 'normal'
  });
};