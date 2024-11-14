import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ferretodo.onrender.com/', // Asegúrate de que este es el puerto correcto de tu servidor backend
});

export default instance;