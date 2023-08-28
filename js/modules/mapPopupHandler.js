const mapPopupHandler = () => {
  const map = document.getElementById('region-map');
  const popup = document.querySelector('.where-buy__popup');

  if (!map || !popup) return;

  let x = 0, y = 0;
  const mouse = { x: 0, y: 0 };
  const [name, store] = popup.querySelectorAll('span');
  
  const move = () => {
    x += (mouse.x - x) * 0.1;
    y += (mouse.y - y) * 0.1;
    popup.style.transform = `matrix(1, 0, 0, 1, ${x}, ${y})`;
    requestAnimationFrame(move);
  };

  move();
  map.addEventListener("mousemove", event => {
    mouse.x = event.offsetX - popup.offsetWidth / 5;
    mouse.y = event.offsetY - popup.offsetHeight - 15;
  });

  popup.addEventListener('mouseover', () =>
    map.querySelector(`[data-region="${popup.getAttribute('href').slice(1)}"]`).classList.add('_active'));
  popup.addEventListener('mouseout', () =>
    map.querySelector(`[data-region="${popup.getAttribute('href').slice(1)}"]`).classList.remove('_active'));

  map.addEventListener('mouseover', ({target}) =>{
    const region = target.closest('.region');

    if (region) {
      const start = popup.offsetWidth;

      popup.classList.add('_show');
      name.textContent = region.dataset.name;
      store.textContent = region.dataset.store;
      map.setAttribute('href', `#${region.dataset.region}`);
      popup.setAttribute('href', `#${region.dataset.region}`);
      popup.animate([{width: `${start}px`}, {width: `${popup.offsetWidth}px`}], {duration: 400, iterations: 1});
    } else {
      popup.classList.remove('_show');
    }
  });
};

export default mapPopupHandler;