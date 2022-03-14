import sendData from './sendData.js';

const footerForm = document.querySelector('.footer__form');
const footerPhone = footerForm.querySelector('input');
const footerFormTitle = footerForm.querySelector('h2');
const footerFormText = footerForm.querySelector('p');
const footerFormWrap = footerForm.querySelector('.footer__input-wrap');

footerForm.addEventListener('submit', e => {
  e.preventDefault();

  sendData({
    title: 'Телефон обратной связи',
    body: footerPhone.value,
  }, (data) => {
    if (data.id) {
      console.log('data.id: ', data.id);
      footerFormWrap.remove();
      footerFormTitle.textContent = 'Ваша заявка успешно отправлена';
      footerFormText.textContent = `Наши менеджеры свяжутся с Вами в
        течение 3-х рабочих дней`;
    }
  });
});
