const zIndexDelay = () => {
  let timeoutId = null;
  const items = document.querySelectorAll('.z-index-delay');


  items.forEach(item => {
    item.addEventListener('mouseenter', ({target}) => {
      if (target !== item || innerWidth <= 992) return;

      item.style.zIndex = '10';
      clearTimeout(timeoutId);
    }, false);

    item.addEventListener('mouseleave', ({target}) => {
      if (target !== item || innerWidth <= 992) return;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => item.style.zIndex = '', 400);
    });
  }, false);
}

export default zIndexDelay;