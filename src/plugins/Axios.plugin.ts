// api.js
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';



const Axios = axios.create({
  baseURL: process.env.REACT_APP_OPEN_EXCHANGE_RATES_BASE_URL,
});

// before a request is made start the nprogress
Axios.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

// before a response is returned stop nprogress
Axios.interceptors.response.use((response) => {
    nprogress.done();
    return response.data;
  },
  async function (error) {
    nprogress.done();
    return Promise.reject(error);
  }
);

export default Axios;