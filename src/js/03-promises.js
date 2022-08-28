import Notiflix from 'notiflix';

const refs = document.querySelector('.form');

refs.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget;
  const delayNumber = Number(delay.value);
  const stepNumber = Number(step.value);
  const amountNumber = Number(amount.value);

  for (let i = 0; i < amountNumber; i += 1) {
    createPromise(i + 1, delayNumber + i * stepNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
