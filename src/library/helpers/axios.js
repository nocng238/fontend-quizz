import axios from 'axios';

import siteConfig from '@iso/config/site.config';

const publicHeader = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const privateHeader = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: localStorage.getItem('id_token'),
});

const baseAxios = axios.create({
  baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
  headers: publicHeader(),
});
const privateAxios = axios.create({
  baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const privateAxios2 = axios.create({
  baseURL: siteConfig.apiUrl || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Authorization: localStorage.getItem('id_token') || undefined,
  },
});
privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('id_token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default { baseAxios, privateAxios, privateAxios2 };
