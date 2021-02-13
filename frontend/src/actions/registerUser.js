import _ from 'lodash';
import localApi from '../apis/localApi';

export const registerUser = async (formObj) => {
  try {
    const response = await localApi.post('/users', formObj);

    console.log(response);
  } catch (err) {
    return _.mapValues(err.response.data.errors, (err) => err.msg);
  }
};
