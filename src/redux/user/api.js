import axios from '../../library/helpers/axios';

export const getUsersApi = async (options) => {
  return await axios.get('/users/', options);
};

export const getUserApi = async (userId) => {
  return await axios.get(`/users/${userId}`);
};

export const createUserApi = async (user) => {
  return await axios.post(`/users`, user);
};

export const updateUserApi = async ({ userId, user }) => {
  return await axios.put(`/users/${userId}`, user);
};

export const deleteUserApi = async (userId) => {
  return await axios.delete(`/users/${userId}`);
};

export const resetPasswordApi = async (userId) => {
  return await axios.post(`/users/reset-password/${userId}`);
};
