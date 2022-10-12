import instance from './axios';

const authToken = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default authToken;
