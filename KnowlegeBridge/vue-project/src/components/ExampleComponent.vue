<template>
    <div>
      <ul>
        <li v-for="item in items" :key="item.id">{{ item.name }}</li>
      </ul>
      <button @click="addItem">Add Item</button>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        items: [],
      };
    },
    methods: {
      fetchItems() {
        api.getItems().then(response => {
          this.items = response.data;
        }).catch(error => {
          console.error("Error fetching items:", error);
        });
      },
      addItem() {
        const newItem = { name: 'New Item' };
        api.postItem(newItem).then(() => {
          this.fetchItems();
        }).catch(error => {
          console.error("Error adding item:", error);
        });
      },
    },
    created() {
      this.fetchItems();
    },
  };
  </script>
  
  <style scoped>
  /* Deine Stile hier */
  </style>
  