import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const APIClient = axios.create({
  baseURL: API_BASE_URL,
});