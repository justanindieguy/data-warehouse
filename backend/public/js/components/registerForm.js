const createRegisterForm = ({ root, messageContainer, sendData }) => {
  root.innerHTML = `
    <h1 class="title">Crear Usuario</h1>

    <div class="field">
      <label class="label">Nombre:</label>
      <input required class="input" id="name" name="name" />
    </div>

    <div class="field">
      <label class="label">Apellido:</label>
      <input required class="input" id="last-name" name="lastName" />
    </div>

    <div class="field">
      <label class="label">Email:</label>
      <input required class="input" placeholder="ejemplo@ejemplo.com" id="email" name="email" />
      <p id="email-alert" class="help is-danger"></p>
    </div>

    <div class="field">
      <label class="label">Perfil:</label>
      <div class="select">
        <select>
          <option>Básico</option>
          <option>Admin</option>
        </select>
      </div>
    </div>

    <div class="field">
      <label class="label">Contraseña:</label>
      <input required class="input" id="password" name="password" type="password" />
      <p id="password-alert" class="help is-danger"></p>
    </div>

    <div class="field">
      <label class="label">Repetir contraseña:</label>
      <input required class="input" id="passwordConfirm" name="passwordConfirm" type="password" />
      <p id="password-confirm-alert" class="help is-danger"></p>
    </div>

    <button class="button is-link">Enviar</button>
  `;

  // DOM Elements.
  const emailInput = root.querySelector('#email');
  const roleSelect = root.querySelector('select');
  const passwordInput = root.querySelector('#password');
  const passwordConfirmInput = root.querySelector('#passwordConfirm');

  const inputs = Array.from(root.querySelectorAll('input'));

  // Alert DOM Elements.
  const emailAlert = root.querySelector('#email-alert');
  const passwordAlert = root.querySelector('#password-alert');
  const passwordConfirmAlert = root.querySelector('#password-confirm-alert');

  let passValue = '';

  const validInputs = () => {
    const passLength = passwordInput.value.length;
    const passValue = passwordInput.value;
    const passConfirmValue = passwordConfirmInput.value;

    if (passLength < 6 || passLength > 15) {
      return false;
    }

    if (passValue !== passConfirmValue) {
      return false;
    }

    return true;
  };

  emailInput.addEventListener('input', () => {
    if (emailAlert.innerText !== '') {
      emailAlert.innerText = '';
    }
  });

  passwordInput.addEventListener('input', () => {
    const passLength = passwordInput.value.length;
    passValue = passwordInput.value;

    if (passLength >= 6 && passLength <= 15) {
      passwordAlert.innerText = '';
    } else {
      passwordAlert.innerText =
        'La contraseña debe tener un mínimo de 6 caracteres y un máximo de 15.';
    }
  });

  passwordConfirmInput.addEventListener('input', () => {
    const passConfirmValue = passwordConfirmInput.value;

    if (passValue === passConfirmValue) {
      passwordConfirmAlert.innerText = '';
    } else {
      passwordConfirmAlert.innerText = 'Las contraseñas no coinciden.';
    }
  });

  root.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!validInputs) {
      return;
    }

    try {
      const requestData = {};

      for (let input of inputs) {
        requestData[input.name] = input.value;
      }

      const result = await sendData({
        ...requestData,
        roleId: roleSelect.value === 'Admin' ? 2 : 1,
      });

      const { data } = result.data;

      createMessage({
        root: messageContainer,
        title: 'Usuario Creado.',
        content: `Nuevo usuario con nombre <strong>${data.name}</strong> y correo electrónico <strong>${data.email}</strong> creado exitosamente.`,
        onAccept: () => location.reload(),
      });

      console.log(result);
    } catch (err) {
      try {
        const { errors } = err.response.data;

        emailAlert.innerText = errors['email'].msg;
      } catch (err) {
        return;
      }
    }
  });
};
