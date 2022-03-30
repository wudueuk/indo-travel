import getDatabaseData from './db.js';
import {showModal, createOverlay, errorModal} from './modals.js';
import {
  selectDate,
  reservDate,
  selectPeople,
  reservPeople,
  reservPrice,
  reservForm,
  reservPhone,
  reservClient,
} from './setElements.js';
import httpRequest from './sendData.js';
import JustValidate
  from '../../node_modules/just-validate/dist/just-validate.es.js';

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

const justValidate = new JustValidate('.reservation__form');
justValidate
    .addField('#reservation__date',
        [
          {
            rule: 'required',
            errorMessage: 'Выберите дату',
          },
          {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Некорректное значение',
          },
        ])
    .addField('#reservation__people',
        [
          {
            rule: 'required',
            errorMessage: 'Некорректное значение',
          },
          {
            rule: 'minLength',
            value: 1,
            errorMessage: 'Некорректное значение',
          },
        ])
    .addField('.reservation__input_name', [
      {
        rule: 'required',
        errorMessage: 'Укажите ФИО полностью по-русски',
      },
      {
        rule: 'minLength',
        value: 5,
        errorMessage: 'Слишком короткое значение',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Слишком длинное значение',
      },
      {
        rule: 'customRegexp',
        value: /([А-Яа-яЁё]+)\s([А-Яа-яЁё]+)\s([А-Яа-яЁё]+)/g,
        errorMessage: 'Некорректное значение',
      },
    ])
    .addField('#reservation__phone', [
      {
        rule: 'required',
        errorMessage: 'Укажите свой телефон',
      },
      {
        validator(value) {
          const phone = reservPhone.inputmask.unmaskedvalue();
          return !!(Number(phone) && phone.length === 10);
        },
      },
    ])
    .onSuccess(async (e) => {
      e.preventDefault();

      const tourData = {
        period: reservDate.value,
        people: reservPeople.value,
        price: reservPrice.textContent,
        phone: reservPhone.value,
        client: reservClient.value,
      };

      const orderResult = await showModal(tourData);

      if (orderResult) {
        console.log('Заказ подтвержден');
        reservForm.reset();
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
