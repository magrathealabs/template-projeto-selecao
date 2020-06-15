import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'https://api.github.com',
});

api.interceptors.request.use(async (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `token ${token}`;
    }
    return config;
});

export default api;
