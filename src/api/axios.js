import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Asegúrate de que este es el puerto correcto de tu servidor backend
});

export default instance;