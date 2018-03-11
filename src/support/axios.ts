import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://119.29.76.240:3000/',
  withCredentials: true
});

export default instance;