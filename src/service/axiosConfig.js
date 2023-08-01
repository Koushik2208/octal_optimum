import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.205.182.249:4001/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default instance
