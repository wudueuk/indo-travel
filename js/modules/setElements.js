export const heroText = document.querySelector('.hero__text');

export const heroTimer = document.querySelector('.hero__timer');

export const timerCountDays = document.querySelector('.timer__count_days');

export const timerUnitsDays = document.querySelector('.timer__units_days');

export const timerCountHours = document.querySelector('.timer__count_hours');

export const timerUnitsHours = document.querySelector('.timer__units_hours');

export const timerCountMinutes =
  document.querySelector('.timer__count_minutes');

export const timerUnitsMinutes =
  document.querySelector('.timer__units_minutes');

export const selectDate = document.getElementById('tour__date');
selectDate.innerHTML = `
  <option value="0" class="tour__option">Выбери дату</option>
`;

export const reservDate = document.getElementById('reservation__date');
reservDate.innerHTML = `
  <option value="0" class="tour__option">Дата путешествия</option>
`;

export const selectPeople = document.getElementById('tour__people');
selectPeople.innerHTML = `
  <option value="" class="tour__option">Количество человек</option>
`;

export const reservPeople = document.getElementById('reservation__people');
reservPeople.innerHTML = `
  <option value="" class="tour__option">Количество человек</option>
`;

export const reservForm = document.querySelector('.reservation__form');

export const reservPrice = reservForm.querySelector('.reservation__price');
reservPrice.textContent = '0₽';

export const reservPhone = document.querySelector('#reservation__phone');
reservPhone.addEventListener('input', () => {
  reservPhone.value = reservPhone.value.replace(/[^\d\+]/g, '');
});

const reservButton = document.querySelector('.reservation__button');
reservButton.disabled = true;

export const reservClient = document.querySelector('.reservation__input_name');
reservClient.addEventListener('input', () => {
  reservClient.value = reservClient.value.replace(/[^А-Яа-яЁё^\s]/g, '');
  if (reservClient.value
    .match(/([А-Яа-яЁё]+)\s([А-Яа-яЁё]+)\s([А-Яа-яЁё]+)/g)) {
    reservButton.disabled = false;
    console.log('good');
  }
});
