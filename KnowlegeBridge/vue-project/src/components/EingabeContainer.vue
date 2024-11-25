<template>
  <div class="eingabe-container">
    <h2>Willkommen Admin</h2>
   
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>
    
    <div class="form-group">
      <input type="text" id="nameEin" v-model="nameEin" required>
      <label for="nameEin">Benutzername eingeben:</label>
    </div>
    <div class="form-group">
      <input type="text" id="passwortEin" v-model="passwortEin" required>
      <label for="passwortEin">Passwort eingeben:</label>
    </div>
    <div class="form-group">
      <input type="text" id="emailEin" v-model="emailEin" required>
      <label for="emailEin">Email eingeben:</label>
    </div>
    <div class="form-group1">
      <select id="rolleEin" v-model="rolleEin" required>
        <option value="">Rolle eingeben:</option>
        <option value="Admin">Admin</option>
        <option value="Editor">Editor</option>
        <option value="Schueler">Schueler</option>
      </select>
    </div>
    <div class="form-group">
      <button type="button" @click="addUser" id="benutzerBtn" class="benutzerBtn">Benutzer hinzufügen</button>
    </div>
  
    
    <div class="form-group">
      <button type="button" @click="navigateTo('Admin')" id="backtohomeBtn" class="backtohomeBtn">Zurück</button>
    </div>
  </div>
  <div>
      <button class="btn" id="btn" @click="navigateTo2('HomeSeite')">zurück zur Homeseite</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      benutzerName: '', // Added benutzerName to data
      nameEin: '',
      passwortEin: '',
      emailEin: '',
      rolleEin: ''
    };
  },
  methods: {
    async addUser() {
      // Validate the inputs
      if (!this.nameEin) {
        alert('Benutzername darf nicht leer sein.');
        return;
      }
      if (!this.passwortEin) {
        alert('Passwort darf nicht leer sein.');
        return;
      }
      if (!this.emailEin) {
        alert('Email darf nicht leer sein.');
        return;
      }
      if (!this.rolleEin) {
        alert('Rolle darf nicht leer sein.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/users', {
          username: this.nameEin,
          email: this.emailEin,
          passwort: this.passwortEin,
          rolle: this.rolleEin
        });
        if (response.data) {
          alert('Benutzer hinzugefügt');
          this.nameEin = '';
          this.passwortEin = '';
          this.emailEin = '';
          this.rolleEin = '';
        } else {
          alert('Fehler beim Hinzufügen des Benutzers');
        }
      } catch (error) {
        console.error('Error adding user:', error);
        alert('Ein Fehler ist beim Hinzufügen des Benutzers aufgetreten.');
      }
    },
    navigateTo(page) {
      if (page === 'login') {
        this.$router.push('/login');
      } else if (page === 'Admin') {
        this.$router.push('/admin');
      }
    },
    navigateToUsersLoeschen() {
      this.$router.push('/usersLoeschen');
    },
    fetchUserName() {
      const username = localStorage.getItem('username');
      if (username) {
        this.benutzerName = username;
      }
    },
    navigateTo2(page) {
      this.$router.push('/');
    }
    
  },
  mounted() {
    this.fetchUserName();
  },
};
</script>

<style scoped>
  .eingabe-container {
    width: 500px;
    padding: 20px;
    background: rgba(0, 0, 0, .5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
  }

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

  .form-group {
    position: relative;
    margin-bottom: 20px;
  }

  .form-group input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    margin-bottom: 5px;
  }

  .form-group1 select {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff; /* White text */
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    margin-bottom: 5px;
}

.form-group1 select option {
    background-color: #333;
    color: white;
}

  .form-group label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    padding: 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
  }

  .form-group input:focus ~ label,
  .form-group input:valid ~ label,
  .form-group1 select:focus ~ label,
  .form-group1 select:valid ~ label {
    top: -5px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
  }

  .eingabe-container h2 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 30px;
  }

  #benutzerBtn,
  #backtohomeBtn{
    margin-top: 2px;
    width: 200px;
    background-color: #4815c2;
    color: white;
    padding: 15px 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    
  }

  .form-group1 select option {
    background-color: white;
    color: black;
  }

  #backtohomeBtn:hover,
  #benutzerBtn:hover,
  #benutzerLoeschenBtn:hover {
    background-color: #370f9e;
  }

  .btn {
    position: fixed; 
    bottom: 30px; 
    left: 90px; 
    z-index: 1000; 
  }

  #btn {
    padding: 10px 30px;
    font-size: 16px;
    background-color: #4815c2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #btn:hover {
    background-color: #370f9e;
  }

  @media (max-width: 480px) {
    .navbar li a {
      padding: 8px 15px;
    }

    .logo {
      max-height: 50px;
    }

    .knowledge-bridge {
      max-width: 100px;
    }
  }
</style>
