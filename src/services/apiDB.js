import axios from 'axios';

const apiDB = axios.create({
  baseURL: process.env.REACT_APP_API_DB
})

export default apiDB;