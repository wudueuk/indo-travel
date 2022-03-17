import getDatabaseData from './db.js';
import { showModal, createOverlay, errorModal } from './modals.js';
import {
  selectDate,
  reservDate,
  selectPeople,
  reservPeople,
  reservPrice,
  reservForm,
} from './setElements.js';
import httpRequest from './sendData.js';

const URL = 'https://jsonplaceholder.typicode.com/posts';

const resetSelects = () => {
  selectPeople.innerHTML = `
      <option value="" class="tour__option">Количество человек</option>
  `;
  reservPeople.innerHTML = `
      <option value="" class="tour__option">Количество человек</option>
  `;
};

const addInSelect = (selectName, value) => {
  selectName.innerHTML += `
    <option value="${value}" class="tour__option">${value}</option>
  `;
};

const updatePeopleSelect = (select1, select2, dates, data) => {
  select1.textContent = '';

  const selected = data.find(elem => {
    if (elem.date === dates.value) {
      return elem['min-people'], elem['max-people'], elem.price;
    }
  });

  for (let i = selected['min-people']; i <= selected['max-people']; i++) {
    if (i === +select2.value) {
      select1.innerHTML += `
        <option value="${i}" class="tour__option" selected>${i}</option>
      `;
    } else {
      addInSelect(select1, i);
    }
  }

  reservPrice.textContent = `${selectPeople.value * selected.price}₽`;
};

const updateDateSelect = (select1, select2, data) => {
  selectPeople.textContent = '';
  reservPeople.textContent = '';

  if (select1.value === '0') {
    resetSelects();
  } else {
    const selected = data.find(elem => {
      if (elem.date === select1.value) {
        return elem['min-people'], elem['max-people'], elem.price;
      }
    });

    for (let i = selected['min-people']; i <= selected['max-people']; i++) {
      addInSelect(selectPeople, i);
      addInSelect(reservPeople, i);
    }

    data.map(item => {
      if (item.date === select1.value) {
        select2.innerHTML += `
            <option value="${item.date}" class="tour__option" 
              selected>${item.date}</option>
          `;
      } else {
        addInSelect(select2, item.date);
      }
    });

    reservPrice.textContent = `${reservPeople.value * selected.price}₽`;
  }
};

const showErrorModal = (err, data) => {
  createOverlay();
  errorModal();
  console.log(err);
};

const renderTour = async () => {
  const data = await getDatabaseData();

  data.map(item => {
    addInSelect(selectDate, item.date);
    addInSelect(reservDate, item.date);
  });

  selectDate.addEventListener('change', () => {
    updateDateSelect(selectDate, reservDate, data);
  });

  reservDate.addEventListener('change', () => {
    updateDateSelect(reservDate, selectDate, data);
  });

  selectPeople.addEventListener('change', () => {
    updatePeopleSelect(reservPeople, selectPeople, reservDate, data);
  });

  reservPeople.addEventListener('change', () => {
    updatePeopleSelect(selectPeople, reservPeople, selectDate, data);
  });
};

renderTour();

reservForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tourData = {
    period: reservDate.value,
    people: reservPeople.value,
    price: reservPrice.textContent,
    phone: reservForm.querySelector('#reservation__phone').value,
    client: reservForm.querySelector('.reservation__input_name').value,
  };

  const orderResult = await showModal(tourData);

  if (orderResult) {
    console.log('Заказ подтвержден');
    httpRequest(URL, {
      method: 'POST',
      title: 'Подтверждение заказа',
      callback: showErrorModal,
      body: tourData,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
});
