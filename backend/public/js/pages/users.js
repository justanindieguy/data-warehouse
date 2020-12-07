const formRoot = document.querySelector('#register');
const messageRoot = document.querySelector('#message-container');

createRegisterForm({
  root: formRoot,
  messageContainer: messageRoot,
  sendData: async ({
    name,
    lastName,
    email,
    roleId,
    password,
    passwordConfirm,
  }) => {
    const res = axios.post('/api/v1/users', {
      name,
      lastName,
      email,
      roleId,
      password,
      passwordConfirm,
    });

    return res;
  },
});
