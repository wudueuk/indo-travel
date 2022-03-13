const body = document.querySelector('body');

//const headerContainer = document.querySelector('.header__container');

const burgerButton = document.querySelector('.header__menu-button');
/* burgerButton.style.position = 'fixed';
burgerButton.style.right = '20px';
const headerWidth = (document.documentElement.clientWidth -
  headerContainer.clientWidth) / 2 + 35;
burgerButton.style.right = `${headerWidth}px`; */

/* window.addEventListener('resize', () => {
  const headerWidth = (document.documentElement.clientWidth -
    headerContainer.clientWidth) / 2 + 35;
  burgerButton.style.right = `${headerWidth}px`;
}); */

const headerMenu = document.querySelector('.header__menu');
headerMenu.style.transform = `scaleX(0)`;

const menuDuration = 300;
let startMenuAnimationTime = NaN;
let menuScale = 0;

const menuAnimation = (timestamp) => {
  startMenuAnimationTime ||= timestamp;

  const progress = (timestamp - startMenuAnimationTime) / menuDuration;
  menuScale = progress;
  headerMenu.style.transform = `scaleX(${menuScale})`;
  if (progress < 1) {
    requestAnimationFrame(menuAnimation);
  } else {
    startMenuAnimationTime = NaN;
  }
};

body.addEventListener('click', e => {
  const target = e.target;

  if (target === burgerButton) {
    headerMenu.classList.toggle('header__menu_active');
    if (headerMenu.classList.contains('header__menu_active')) {
      requestAnimationFrame(menuAnimation);
    } else headerMenu.style.transform = `scaleX(0)`;
  } else if (target !== headerMenu || target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
    headerMenu.style.transform = `scaleX(0)`;
  }
});
