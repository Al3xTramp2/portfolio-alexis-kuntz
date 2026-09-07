const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

const fields = {
  nom: document.getElementById('nom'),
  email: document.getElementById('email'),
  objet: document.getElementById('objet'),
  message: document.getElementById('message'),
  accept: document.getElementById('accept'),
};

const errorMessages = {
  nom: 'Le nom est obligatoire.',
  email: 'Une adresse e-mail valide est requise.',
  objet: 'L’objet du message est obligatoire.',
  message: 'Le message ne peut pas être vide.',
  accept: 'Vous devez accepter les conditions.',
};

function validateField(name, value) {
  if (name === 'accept') {
    return value ? '' : errorMessages[name];
  }

  if (!value.trim()) {
    return errorMessages[name];
  }

  if (name === 'email') {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value.trim()) ? '' : errorMessages[name];
  }

  return '';
}

function showError(name, message) {
  const field = fields[name];
  const errorNode = document.querySelector(`[data-error-for="${name}"]`);

  if (field) {
    field.classList.toggle('input-error', Boolean(message));
  }

  if (errorNode) {
    errorNode.textContent = message;
  }
}

Object.keys(fields).forEach((fieldName) => {
  const field = fields[fieldName];

  field.addEventListener('input', () => {
    const message = validateField(fieldName, field.type === 'checkbox' ? field.checked : field.value);
    showError(fieldName, message);
  });

  field.addEventListener('blur', () => {
    const message = validateField(fieldName, field.type === 'checkbox' ? field.checked : field.value);
    showError(fieldName, message);
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let valid = true;

  Object.keys(fields).forEach((fieldName) => {
    const value = fields[fieldName].type === 'checkbox' ? fields[fieldName].checked : fields[fieldName].value;
    const message = validateField(fieldName, value);
    showError(fieldName, message);

    if (message) {
      valid = false;
    }
  });

  if (!valid) {
    successMessage.classList.remove('visible');
    return;
  }

  successMessage.classList.add('visible');
  form.reset();
  Object.keys(fields).forEach((fieldName) => showError(fieldName, ''));
});
