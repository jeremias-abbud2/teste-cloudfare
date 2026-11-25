// Menu móvel
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileNav.hidden = isExpanded;
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mobileNav.hidden) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
      menuToggle.focus();
    }
  });
}

// Filtro de projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((btn) => {
      const isCurrent = btn === button;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', String(isCurrent));
    });

    projectCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const shouldShow =
        selectedCategory === 'todos' || cardCategory === selectedCategory;
      card.hidden = !shouldShow;
    });
  });
});

// Fallback resiliente caso alguma imagem falhe ao carregar
document.querySelectorAll('.media-frame img').forEach((img) => {
  img.addEventListener('error', () => {
    img.closest('.media-frame')?.classList.add('is-broken');
  });
});

// Validação do formulário de contato
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const successSummary = document.getElementById('successSummary');
const resetFormBtn = document.getElementById('resetFormBtn');

const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function setFieldError(input, errorElement, message) {
  if (!input || !errorElement) return;
  if (message) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.hidden = false;
  } else {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
    errorElement.hidden = true;
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm && formSuccess && successSummary) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    let hasError = false;

    if (nameValue.length < 2) {
      setFieldError(nameInput, nameError, 'Erro: informe seu nome completo.');
      hasError = true;
    } else {
      setFieldError(nameInput, nameError, '');
    }

    if (!isValidEmail(emailValue)) {
      setFieldError(emailInput, emailError, 'Erro: digite um e-mail válido.');
      hasError = true;
    } else {
      setFieldError(emailInput, emailError, '');
    }

    if (messageValue.length < 10) {
      setFieldError(
        messageInput,
        messageError,
        'Erro: descreva seu projeto com pelo menos 10 caracteres.'
      );
      hasError = true;
    } else {
      setFieldError(messageInput, messageError, '');
    }

    if (hasError) return;

    contactForm.hidden = true;
    successSummary.textContent = `Obrigado, ${nameValue}. Recebemos sua solicitação para ${emailValue} e responderemos em até 1 dia útil.`;
    formSuccess.hidden = false;
  });
}

if (resetFormBtn && contactForm && formSuccess) {
  resetFormBtn.addEventListener('click', () => {
    contactForm.reset();
    contactForm.hidden = false;
    formSuccess.hidden = true;
    nameInput?.focus();
  });
}
