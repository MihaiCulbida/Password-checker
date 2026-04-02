const pwInput = document.getElementById('pw');
const eyeIcon = document.getElementById('eyeIcon');
const barsContainer = document.querySelector('.bars');
const strengthLabel = document.getElementById('strengthLabel');

const tips = {
  length: document.getElementById('tip-length'),
  upper: document.getElementById('tip-upper'),
  lower: document.getElementById('tip-lower'),
  number: document.getElementById('tip-number'),
  special: document.getElementById('tip-special'),
};

function toggleVisibility() {
  const isPassword = pwInput.type === 'password';
  pwInput.type = isPassword ? 'text' : 'password';
  eyeIcon.src = isPassword ? 'images/hide.png' : 'images/show.png';
  eyeIcon.alt = isPassword ? 'Hide password'   : 'Show password';
}

pwInput.addEventListener('input', checkStrength);

function checkStrength() {
  const val = pwInput.value;
  const checks = {
    length: val.length >= 8,
    upper: /[A-Z]/.test(val),
    lower: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(val),
  };

  for (const [key, passed] of Object.entries(checks)) {
    tips[key].classList.toggle('passed', passed);
  }

  const score = Object.values(checks).filter(Boolean).length;

  if (val.length === 0) {
    setStrength(0, '—', '');
    return;
  }

  if (score <= 1) setStrength(1, 'Weak password','weak');
  else if (score === 2) setStrength(2, 'Fair password','fair');
  else if (score === 3) setStrength(3, 'Good password','good');
  else setStrength(4, 'Strong password','strong');
}

function setStrength(level, label, className) {
  barsContainer.className = 'bars';
  if (level > 0) barsContainer.classList.add('strength-' + level);
  else barsContainer.classList.add('strength-0');

  strengthLabel.textContent = label;
  strengthLabel.className = 'strength-label' + (className ? ' ' + className : '');
}