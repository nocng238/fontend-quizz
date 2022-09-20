import axios from 'axios';

import siteConfig from '@iso/config/site.config';

const publicHeader = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
});

const privateHeader = () => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('id_token') || undefined,
});

const baseAxios = axios.create({
  baseURL: siteConfig.apiUrl || 'http://localhost:9000/api/v1',
  timeout: 1000,
  headers: publicHeader(),
});

export default baseAxios;
