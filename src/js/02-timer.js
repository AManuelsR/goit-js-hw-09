import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const faltanDias = document.querySelector('[data-days]');
const faltanHoras = document.querySelector('[data-hours]');
const faltanMinutos = document.querySelector('[data-minutes]');
const faltanSegundos = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let tiempo = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] - currentDate > 0) {
      btnStart.disabled = false;
    } else {
      btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function onTimerStart() {
  const selectedDate = fp.selectedDates[0];

  tiempo = setInterval(() => {
    const inicioConteo = new Date();
    const cuentaRegresiva = selectedDate - inicioConteo;
    btnStart.disabled = true;

    if (cuentaRegresiva < 0) {
      clearInterval(tiempo);
      return;
    }
    updateTimerFace(convertMs(cuentaRegresiva));
  }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  faltanDias.textContent = addLeadingZero(days);
  faltanHoras.textContent = addLeadingZero(hours);
  faltanMinutos.textContent = addLeadingZero(minutes);
  faltanSegundos.textContent = addLeadingZero(seconds);
}

const fp = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onTimerStart);