import axios from 'axios';
import siteConfig from '@iso/config/site.config';
export const getUsersApi = async (options) => {
  const privateAxios2 = axios.create({
    baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  return await privateAxios2.get('/user', { params: options });
};

// export const getUserApi = async (userId) => {
//   return await privateAxios2.get(`/user/${userId}`);
// };

export const createUserApi = async (user) => {
  const privateAxios2 = axios.create({
    baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: localStorage.getItem('id_token') || undefined,
    },
  });
  return await privateAxios2.post(`/user`, user);
};

// export const updateUserApi = async ({ userId, user }) => {
//   return await privateAxios2.put(`/user/${userId}`, user);
// };

// export const deleteUserApi = async (userId) => {
//   return await privateAxios2.delete(`/user/${userId}`);
// };

// export const resetPasswordApi = async (userId) => {
//   return await privateAxios2.post(`/user/reset-password/${userId}`);
// };
