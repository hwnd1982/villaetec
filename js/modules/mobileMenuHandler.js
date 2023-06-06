const mobileMenuHandler = () => {
  const burger = document.querySelector('.mobile-menu-btn');

  burger.addEventListener('click', ({currentTarget}) => currentTarget.classList.toggle('_active'));
};

export default mobileMenuHandler;
