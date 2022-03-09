import {
  heroText,
  heroTimer,
  timerCountDays,
  timerUnitsDays,
  timerCountHours,
  timerUnitsHours,
  timerCountMinutes,
  timerUnitsMinutes,
} from './setElements.js';

import { parseNumber, parseWords } from './parse.js';

const timer = () => {
  // Время окончания акции по локальному времени
  const deadline = new Date(heroTimer.dataset.timerDeadline).getTime();
  // Корректируем время окончания акции UTC+3
  const deadlineCorrectly = deadline +
    (new Date().getTimezoneOffset() * 60 * 1000) + (3 * 3600 * 1000);

  const getTimeRemaining = () => {
    const dateNow = Date.now();
    const timeRemaining = deadlineCorrectly - dateNow;
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);

    return { timeRemaining, days, hours, minutes };
  };

  const startTimer = () => {
    const timer = getTimeRemaining();

    timerCountDays.textContent = timer.days;
    timerUnitsDays.textContent = parseNumber(+timer.days, parseWords.days);
    timerCountHours.textContent = timer.hours;
    timerUnitsHours.textContent = parseNumber(+timer.hours, parseWords.hours);
    timerCountMinutes.textContent = timer.minutes;
    timerUnitsMinutes.textContent = parseNumber(+timer.minutes,
      parseWords.minutes);

    const timerId = setTimeout(startTimer, 30000);

    if (timer.days === 0) {
      heroTimer.style.backgroundColor = 'green';
    } else {
      heroTimer.style.backgroundColor = 'red';
    }

    if (timer.timeRemaining < 0) {
      heroText.remove();
      heroTimer.remove();
      clearTimeout(timerId);
    }
  };

  startTimer();
};

export default timer;
