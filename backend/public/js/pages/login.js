const root = document.querySelector('#login');
createLogin({
  root,
  sendCredentials: async (email, password) => {
    try {
      const res = await axios.post('/api/v1/users/login', { email, password });
      const { headers } = res;
      localStorage.setItem('auth-token', headers['auth-token']);
      return 200;
    } catch (err) {
      return err.response.status;
    }
  },
});
