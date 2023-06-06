export const listAnimate = (listWrapEl, direction = false, duration = 400) => {
  if (!listWrapEl) return;

  const iterations = 1;
  const list = listWrapEl.firstElementChild;
  const items = [...list.children];
  const {height} = list.getBoundingClientRect();
  const durationItem = duration / items.length;
  
  listWrapEl.animate([{height: '0'}, {height: `${height}px`}], {
    duration,
    iterations,
    direction: direction ? 'normal' : 'reverse'
  });

  items.forEach((item, index) => item.animate([{opacity: 0}, {opacity: 1}], {
    duration: durationItem,
    delay: direction ? durationItem * index : durationItem * (items.length - 1 - index),
    iterations,
    direction: direction ? 'normal' : 'reverse'
  }));
};