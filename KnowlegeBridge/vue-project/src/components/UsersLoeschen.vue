<template>
  <div id="benutzerLoeschen">
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <div class="eingabe-containerBenutzerLoeschen">
      <h2>Welche Benutzer sollen gelöscht werden?</h2>
      <div v-for="(user, index) in users" :key="index" class="form-group">
        <div class="label-text">{{ user.username }}</div>
        <button type="button" class="benutzerLoeschenBtn" @click="deleteUser(user.id)">löschen</button>
      </div>
      <div>
        <button class="zurueckBtn" @click="navigateToAdmin">Zurück</button>
      </div>
    </div>
  </div>
  <div>
    <button class="btn" id="btn" @click="navigateTo('HomeSeite')">zurück zur Homeseite</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      benutzerName: '',
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async deleteUser(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/users/${id}`);
        if (response.data.success) {
          this.users = this.users.filter(user => user.id !== id);
          alert('Benutzer erfolgreich gelöscht');
        } else {
          alert('Fehler beim Löschen des Benutzers: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Ein Fehler ist beim Löschen des Benutzers aufgetreten.');
      }
    },
    navigateToAdmin() {
      this.$router.push('/Admin');
    },
    fetchUserName() {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          this.benutzerName = username;
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    },
    navigateTo(page) {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchUsers();
    this.fetchUserName();
  }
};
</script>



<style scoped>

.header {
  position: absolute;
  top: 90px;
  right: 25px;
  display: flex;
  align-items: center;
  color: white;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
}

/* Globale Stile für die gesamte Anwendung */
body {
  margin: 0;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Stile für die Benutzer löschen Seite */
.eingabe-containerBenutzerLoeschen {
      width: 500px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      height: auto;
      margin-top: 80px; 
}

.btn {
  position: fixed; 
  bottom: 30px; 
  left: 90px; 
  z-index: 1000; 
}

#btn {
  padding: 10px 30px ;
  font-size: 16px;
  background-color: #4815c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.eingabe-containerBenutzerLoeschen h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Platz zwischen den Elementen */
  margin-bottom: 20px;
}

.label-text {
  color: #fff;
  font-size: 16px;
  margin-right: 20px;
  flex: 1; /* Füllt den verfügbaren Platz aus */
  text-align: left;
}

.benutzerLoeschenBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100px;
}

.benutzerLoeschenBtn:hover {
  background-color: #370f9e;
}

.zurueckBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  margin-top: 20px;
}

.zurueckBtn:hover {
  background-color: #370f9e;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 120px;
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.navbar li {
  margin: 0 10px;
}

.navbar li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
}

.navbar li a:hover {
  background-color: #4815c2;
}
</style>
