import validator from 'validator';

export const required = (value) => (value ? undefined : 'Campo requerido.');

export const requireValidEmail = (value) =>
  validator.isEmail(value) ? undefined : 'Debes ingresar un email válido.';

export const requireValidPassword = (value) =>
  validator.isLength(value, { min: 6, max: 15 })
    ? undefined
    : 'La contraseña debe de tener mínimo 6 caracteres y máximo 15.';

export const passwordsMustMatch = (pass) => (value) =>
  pass === value ? undefined : 'Las contraseñas no coinciden.';

export const composeValidators = (...validators) => (value) =>
  validators.reduce(
    (error, validator) => error || validator(value),
    undefined
  );
