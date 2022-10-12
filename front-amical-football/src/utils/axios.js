import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://amical-football-api.herokuapp.com/',
});

export const apiGouv = axios.create({
  baseURL: 'http://geo.api.gouv.fr',
});

export const cloudinaryApi = axios.create({
  baseURL: 'https://api.cloudinary.com',
});

export default instance;
