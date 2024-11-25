import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getItems() {
    return apiClient.get('/items');
  },
  postItem(item) {
    return apiClient.post('/items', item);
  },
};
