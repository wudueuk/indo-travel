import getDatabaseData from './db.js';
import sendData from './sendData.js';
import {
  createOverlay,
  createModal, successModal, errorModal
} from './modals.js';

const selectDate = document.getElementById('tour__date');
selectDate.innerHTML = `
  <option value="0" class="tour__option">Выбери дату</option>
`;

const reservDate = document.getElementById('reservation__date');
reservDate.innerHTML = `
  <option value="0" class="tour__option">Дата путешествия</option>
`;

const selectPeople = document.getElementById('tour__people');
selectPeople.innerHTML = `
  <option value="" class="tour__option">Количество человек</option>
`;

const reservPeople = document.getElementById('reservation__people');
reservPeople.innerHTML = `
  <option value="" class="tour__option">Количество человек</option>
`;

// const reservTourDate = document.querySelector('.reservation__data');
const reservPrice = document.querySelector('.reservation__price');

const renderTour = async () => {
  const data = await getDatabaseData();

  data.map(item => {
    selectDate.innerHTML += `
      <option value="${item.date}" class="tour__option">${item.date}</option>
    `;
    reservDate.innerHTML += `
      <option value="${item.date}" class="tour__option">${item.date}</option>
    `;
  });

  selectDate.addEventListener('change', () => {
    selectPeople.textContent = '';
    reservPeople.textContent = '';

    if (selectDate.value === '0') {
      selectPeople.innerHTML = `
        <option value="" class="tour__option">Количество человек</option>
      `;
      reservPeople.innerHTML = `
        <option value="" class="tour__option">Количество человек</option>
      `;
    } else {
      const selected = data.find(elem => {
        if (elem.date === selectDate.value) {
          return elem['min-people'], elem['max-people'];
        }
      });

      for (let i = selected['min-people']; i <= selected['max-people']; i++) {
        selectPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
        reservPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
      }

      data.map(item => {
        if (item.date === selectDate.value) {
          reservDate.innerHTML += `
            <option value="${item.date}" class="tour__option" 
              selected>${item.date}</option>
          `;
        } else {
          reservDate.innerHTML += `
            <option value="${item.date}" 
              class="tour__option">${item.date}</option>
          `;
        }
      });
    }
  });

  reservDate.addEventListener('change', () => {
    selectPeople.textContent = '';
    reservPeople.textContent = '';

    if (reservDate.value === '0') {
      selectPeople.innerHTML = `
        <option value="" class="tour__option">Количество человек</option>
      `;
      reservPeople.innerHTML = `
        <option value="" class="tour__option">Количество человек</option>
      `;
    } else {
      const selected = data.find(elem => {
        if (elem.date === reservDate.value) {
          return elem['min-people'], elem['max-people'];
        }
      });

      for (let i = selected['min-people']; i <= selected['max-people']; i++) {
        selectPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
        reservPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
      }

      data.map(item => {
        if (item.date === reservDate.value) {
          selectDate.innerHTML += `
            <option value="${item.date}" class="tour__option" 
              selected>${item.date}</option>
          `;
        } else {
          selectDate.innerHTML += `
            <option value="${item.date}" 
              class="tour__option">${item.date}</option>
          `;
        }
      });
    }
  });

  selectPeople.addEventListener('change', () => {
    reservPeople.textContent = '';

    const selected = data.find(elem => {
      if (elem.date === selectDate.value) {
        return elem['min-people'], elem['max-people'], elem.price;
      }
    });

    for (let i = selected['min-people']; i <= selected['max-people']; i++) {
      if (i === +selectPeople.value) {
        reservPeople.innerHTML += `
          <option value="${i}" class="tour__option" selected>${i}</option>
        `;
      } else {
        reservPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
      }
    }

    reservPrice.textContent = `${selectPeople.value * selected.price}₽`;
  });

  reservPeople.addEventListener('change', () => {
    selectPeople.textContent = '';

    const selected = data.find(elem => {
      if (elem.date === reservDate.value) {
        return elem['min-people'], elem['max-people'], elem.price;
      }
    });

    for (let i = selected['min-people']; i <= selected['max-people']; i++) {
      if (i === +reservPeople.value) {
        selectPeople.innerHTML += `
          <option value="${i}" class="tour__option" selected>${i}</option>
        `;
      } else {
        selectPeople.innerHTML += `
          <option value="${i}" class="tour__option">${i}</option>
        `;
      }
    }

    reservPrice.textContent = `${reservPeople.value * selected.price}₽`;
  });
};

renderTour();

// Отправка формы бронирования
const reservForm = document.querySelector('.reservation__form');
reservForm.addEventListener('submit', e => {
  e.preventDefault();

  sendData({
    title: reservForm.dates.value,
    body: reservForm.people.value,
  }, (data) => {
    const overlay = createOverlay();
    if (!data.id) {
      const success = createModal(successModal());
      document.body.append(overlay, success);
    } else {
      const unsuccess = createModal(errorModal());
      document.body.append(overlay, unsuccess);
    }
  });
});
