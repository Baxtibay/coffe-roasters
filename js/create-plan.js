const questions = document.querySelectorAll('.question'),
      summaryEl = document.querySelector('.order-summary__text'),
      content = document.querySelector('.collection__content')
      steps = document.querySelectorAll('.plan-steps__item'),
      creatMePlan = document.querySelector('.create-me-plan'),
      orderModal = document.querySelector('#order-modal');

const state = {
  method: null,
  bean: null,
  quantity: null,
  grind: null,
  delivery: null,
};


function openQuestionByKey(key) {
  questions.forEach(question => {
    const questionKey = question.dataset.question;

    if (questionKey === key) {
      question.classList.add('question--open');
    } else {
      question.classList.remove('question--open');
    }
  });
}

function updateSummary() {
  summaryEl.innerHTML = `
    “I drink my coffee as <span class="order-summary__chosen">${state.method ?? '____'}</span>,
    with a <span class="order-summary__chosen">${state.bean ?? '____'}</span> type of bean.
    <span class="order-summary__chosen">${state.quantity ?? '____'}</span>
    ${state.grind ? ` ground ala <span class="order-summary__chosen">${state.grind}</span>` : ''},
    sent to me <span class="order-summary__chosen">${state.delivery ?? '____'}</span>.”
  `;
}


// NEW FUNCTIONAL
content.addEventListener('click', (e) => {
  const card = e.target.closest('.option-card');
  const toggle = e.target.closest('.question__header');

  // is card clicked
  if (card) {
    const question = card.closest('.question');
    const key = question.dataset.question;
    const value = card.dataset.value;

    // active card
    question
      .querySelectorAll('.option-card')
      .forEach(opt => opt.classList.remove('option-card--active'));
    card.classList.add('option-card--active');

    // state
    state[key] = value;

    // sidebar active
    updateActiveStep(key);

    // accordion sync
    openQuestionByKey(key);

    // summary
    updateSummary();

    return;
  }

  if (toggle) {
    const question = toggle.closest('.question');
    const key = question.dataset.question;

    updateActiveStep(key);
    openQuestionByKey(key);

    return;
  }
});


function updateActiveStep(key) {
  document
    .querySelectorAll('.plan-steps__item')
    .forEach(step => step.classList.remove('plan-steps__item--active'));

  const activeStep = document.querySelector(
    `.plan-steps__item[data-step="${key}"]`
  );

  if (activeStep) {
    activeStep.classList.add('plan-steps__item--active');
  }
}


steps.forEach(step => {
  step.addEventListener('click', () => {
    const key = step.dataset.step;
    const target = document.getElementById(key);

    if (!target) return;

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    updateActiveStep(key);
    openQuestionByKey(key);
  });
});


creatMePlan.addEventListener('click', () => {
  openModal(orderModal)
})

// close modal logic
orderModal.addEventListener('click', (e) => {
  const isOverlay = e.target.classList.contains('modal__overlay');
  const isCloseBtn = e.target.closest('.modal__close');

  if (isOverlay || isCloseBtn) {
    closeModal(orderModal);
  }
});


// OPEN-MODAL 
function openModal(modal) {
  modal.classList.add('modal--open')
  orderModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

// CLOSE-MODAL 
function closeModal(modal) {
  modal.classList.remove('modal--open');
  document.body.classList.remove('is-locked');
}