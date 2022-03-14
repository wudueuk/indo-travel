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

  return overlay;
};

export const createModal = body => {
  const modalWindow = document.createElement('div');
  modalWindow.style.cssText = `
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

  modalWindow.append(body);

  return modalWindow;
};


export const successModal = () => {
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
    <h2 class="reservation__title">Ваша заявка успешно отправлена</h2>
    <p class="reservation__data">Наши менеджеры свяжутся с вами в течение 
    3-х рабочих дней</p>
  `;

  const button = document.createElement('button');
  button.style.cssText = `margin-top: 60px`;
  button.innerHTML = `
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#78EC6E"/>
      <path d="M42.2618 60.8332L31.4285 49.9999L27.8174 53.611L42.2618 
      68.0554L73.2142 37.1031L69.6031 33.4919L42.2618 60.8332Z" fill="white"/>
    </svg>
  `;

  button.addEventListener('click', () => {
    body.parentElement.remove();
    document.getElementById('overlay').remove();
  });

  body.append(button);

  return body;
};

export const errorModal = () => {
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
  button.textContent = 'Забронировать';

  button.addEventListener('click', () => {
    body.parentElement.remove();
    document.getElementById('overlay').remove();
  });

  body.append(button);

  return body;
};
