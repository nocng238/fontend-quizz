import axios from '../../library/helpers/axios';

export const getUsersApi = async (options) => {
  return await axios.get('/users/', options);
};

export const getUserApi = async (userId) => {
  return await axios.get(`/users/${userId}`);
};

export const createUserApi = () => {};

export const updateUserApi = () => {};

export const deleteUserApi = () => {};
