import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Cookies from 'js-cookie';

export const api = axios.create({
  baseURL: API_URL, // URL do backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Eu uso este interceptor para adicionar o token à requisição enviada ao backend e não manipular as rotas no frontend. 
// A validação do token e o redirecionamento para a página de login, caso não esteja autenticado, estão no arquivo middleware.ts.
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');

  if (token) {
    config.headers.Authorization = `${token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('authToken');
      Cookies.remove('username');
      Cookies.remove('userId');
    }

    return Promise.reject(error);
  }
);