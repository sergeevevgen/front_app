import axios from 'axios';
// const BASE_URL = 'https://back.dev-moio.online:31115/api/v1/';
const BASE_URL = 'http://localhost:5021/api/v1/';


export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});