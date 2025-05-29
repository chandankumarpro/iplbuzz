import axios from 'axios';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const API_BASE_URL = process.env.API_BASE_URL;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
const HEADERS = {
  "Content-Type": "application/json",
  "x-rapidapi-host": RAPIDAPI_HOST,
  "x-rapidapi-key": RAPIDAPI_KEY,
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: HEADERS
});