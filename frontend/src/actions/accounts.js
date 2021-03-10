import api from '../apis/localApi';

export const addAccount = async (account) => {
  await api.post('/accounts', account);
};
