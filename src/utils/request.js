const Axios = require('axios');

const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    if (config?.token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${config?.token}`;
    }
    return config;
  },
  (error) => error.response.data,
  // Promise.reject(error);
);

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => ({ error: error?.response?.data || error.message }),
  // return Promise.reject(error);
);

function request({ url, method, data, params, token }) {
  const options = { url, method };
  if (method !== 'GET') {
    options.data = JSON.stringify(data);
  }
  if (params) {
    options.params = params;
  }
  if (token) {
    options.token = token;
  }
  return axios(options);
}

module.exports = {
  request,
};
