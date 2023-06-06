const headerScroll = () => {
  const header = document.querySelector('.header');
  
  if (!header) return;

  const headerScroll = () => {
    const {top} = document.body.getBoundingClientRect();

    if (top < -10) {
      header.classList.add('_scroll');
    } else {
      header.classList.remove('_scroll');
    }
  };

  headerScroll();
  window.addEventListener('scroll', headerScroll);
};

export default headerScroll;