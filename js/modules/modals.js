import loadStyle from './loadStyle.js';

export const showModal = async (tourData) => {
  await loadStyle('css/modal.css');

  const overlay = document.createElement('div');
  overlay.className = 'overlay overlay_confirm';

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h2 class="modal__title">Подтверждение заявки</h2>
    <p class="modal__text">Бронирование путешествия в Индонезию
      на ${tourData.people} человек(а)</p>
    <p class="modal__text">В даты: ${tourData.period}</p>
    <p class="modal__text">Стоимость тура ${tourData.price}</p>
  `;

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'modal__button';

  const buttonConfirm = document.createElement('button');
  buttonConfirm.className = 'modal__btn modal__btn_confirm';
  buttonConfirm.textContent = 'Подтверждаю';

  const buttonEdit = document.createElement('button');
  buttonEdit.className = 'modal__btn modal__btn_edit';
  buttonEdit.textContent = 'Изменить данные';

  buttonGroup.append(buttonConfirm, buttonEdit);
  modal.append(buttonGroup);
  overlay.append(modal);

  document.body.append(overlay);

  return new Promise(resolve => {
    buttonConfirm.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });

    buttonEdit.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });
  });
};

export const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.8;
    z-index: 9;
  `;

  document.body.append(overlay);
};

export const errorModal = () => {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  `;

  const body = document.createElement('div');
  body.style.cssText = `
    width: 980px;
    background-color: #FFF;
    padding: 77px 200px 85px;
    border: 1px solid #AFAFAF;
    border-radius: 30px;
    opacity: 1;
    text-align: center;
  `;
  body.innerHTML = `
    <h2 class="reservation__title">Упс... Что-то пошло не так</h2>
    <p class="reservation__data">Не удалось отправить заявку.
    Пожалуйста, повторите отправку еще раз</p>
  `;

  const button = document.createElement('button');
  button.className = 'button reservation__button';
  button.style.cssText = `margin-top: 60px`;
  button.textContent = 'Закрыть';

  button.addEventListener('click', () => {
    modal.remove();
    document.getElementById('overlay').remove();
  });

  body.append(button);

  modal.append(body);

  document.body.append(modal);
};
