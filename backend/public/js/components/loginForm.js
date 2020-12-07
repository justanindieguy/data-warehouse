const createLogin = ({ root, sendCredentials }) => {
  root.innerHTML = `
    <h1>Bienvenido</h1>

    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left">
        <input
          type="email"
          name="email"
          id="login-email"
          class="input"
          placeholder="user@example.com"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
      <p id="email-alert" class="help is-danger"></p>
    </div>

    <div class="field">
      <label class="label">Contraseña</label>
      <div class="control has-icons-left">
        <input
          type="password"
          name="password"
          id="login-password"
          class="input"
          placeholder="Password"
          required
        />
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p id="password-alert" class="help is-danger"></p>
    </div>

    <div class="field">
      <div class="control">
        <button id="login-button" class="button is-link">
          Iniciar sesión
        </button>
      </div>
    </div>
  `;

  const emailInput = root.querySelector('#login-email');
  const emailAlert = root.querySelector('#email-alert');
  const passwordInput = root.querySelector('#login-password');
  const passwordAlert = root.querySelector('#password-alert');

  const validInputs = () => {
    const passLength = passwordInput.value.length;

    if (passLength < 6 || passLength > 15) {
      return false;
    }

    return true;
  };

  emailInput.addEventListener('input', () => {
    if (emailAlert.innerText) {
      emailAlert.innerText = '';
      emailInput.classList.remove('is-danger');
    }
  });

  root.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!validInputs()) {
      return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    const statusCode = await sendCredentials(email, password);

    if (statusCode === 401) {
      emailAlert.innerText = 'Email o contraseña incorrectos.';
      emailInput.classList.add('is-danger');
      passwordAlert.innerText = 'Email o contraseña incorrectos.';
      passwordInput.classList.add('is-danger');
    }
  });
};
