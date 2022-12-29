import axios from '../../library/helpers/axios';
const { baseAxios, privateAxios } = axios;
export const loginApi = async (creadentials) => {
  const { userName, password } = creadentials;
  return await baseAxios.post('/auth/signing', { userName, password });
};

export const getTokenApi = async () => {
  return await baseAxios.post('/auth/access', null);
};
