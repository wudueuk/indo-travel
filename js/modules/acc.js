const items = document.querySelectorAll('.travel__item');
const buttons = document.querySelectorAll('.travel__item-title');
const wrappers = document.querySelectorAll('.travel__item-text-wrapper');

let heightWrapper = 0;

wrappers.forEach(elem => {
  if (elem.scrollHeight > heightWrapper) {
    heightWrapper = elem.scrollHeight;
  }
});

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    for (let i = 0; i < items.length; i++) {
      if (index === i) {
        wrappers[i].style.height =
          items[index].classList.contains('travel__item_active') ?
            '' : `${heightWrapper}px`;
        items[i].classList.toggle('travel__item_active');
      } else {
        items[i].classList.remove('travel__item_active');
        wrappers[i].style.height = '';
      }
    }
  });
});
