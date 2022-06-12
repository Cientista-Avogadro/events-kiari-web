import { parseCookies } from 'nookies';
import axios from 'axios';

const { 'nextauth.token': token } = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
