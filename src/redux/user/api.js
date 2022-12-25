import axios from '../../library/helpers/axios';
const { privateAxios } = axios;
export const getUsersApi = async (options) => {
  return await privateAxios.get('/user', { params: options });
};

export const getUserApi = async () => {
  return await privateAxios.get(`/user/profile`);
};

export const createUserApi = async (user) => {
  return await privateAxios.post(`/user`, user);
};

export const updateUserApi = async ({ user }) => {
  return await privateAxios.patch(`/user/profile`, user);
};

// export const deleteUserApi = async (userId) => {
//   return await privateAxios.delete(`/user/${userId}`);
// };

// export const resetPasswordApi = async (userId) => {
//   return await privateAxios.post(`/user/reset-password/${userId}`);
// };
