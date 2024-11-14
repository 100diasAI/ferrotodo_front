import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ferretodo.onrender.com',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default instance;