import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const token = typeof window !== 'undefined' ? localStorage.getItem("auth-key") : '';

export const APIClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: token ||  ''
  }
});