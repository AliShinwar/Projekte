// Installiere axios
// npm install axios

// In einer Vue-Komponente oder einem Service
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  withCredentials: false, // Dies je nach Bedarf ändern
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
