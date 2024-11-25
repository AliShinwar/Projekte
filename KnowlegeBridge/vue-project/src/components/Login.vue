<template>
  <div class="login-container">
    <h2>Anmelden</h2>
    <div class="form-group">
      <input type="text" v-model="username" required>
      <label for="username">Benutzername</label>
    </div>
    <div class="form-group">
      <input type="password" v-model="password" required>
      <label for="password">Passwort</label>
    </div>
    <div class="form-group">
      <button type="button" @click="login">Anmelden</button>
    </div>
  </div>
  <div>
      <button class="btn" id="btn" @click="navigateTo('HomeSeite')">zurück zur Homeseite</button>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '@/services/auth'; // Import the auth service

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
  console.log('Attempting to login with:', this.username, this.password); // Debugging
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password
    });
    console.log('Server response:', response.data); // Debugging

    if (response.data.success) {
      const role = response.data.role;
      console.log('User role:', role); // Debugging

      if (role === 'Admin') {
        this.$router.push({ name: 'Admin' });
      } else if (role === 'Editor') {
        this.$router.push({ name: 'Editor' });
      } else if (role === 'Schueler') {
        this.$router.push({ name: 'Schueler' });
      } else {
        alert('Unknown role');
      }
    } else {
      alert('Login failed: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login.');
  }
}

  }


};


</script>

<style scoped>
  @import '@/assets/login.css';
</style>
