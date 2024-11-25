<template>
  <div id="editorFrageHinzufuegen">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <div class="eingabe-container">
      <h2>Willkommen Admin</h2>
      <div class="form-group">
        <button type="button" id="frageHinzufuegenBtn" @click="navigateTo('BenutzerHinzufuegen')">Neue User hinzufügen</button>
      </div>
      <div class="form-group">
        <button type="button" id="frageLoeschenBtn" @click="navigateTo('Usersloeschen')">Vorhandene User löschen</button>
      </div>
      <div class="form-group">
        <button type="button" id="statusBtn" @click="navigateTo('StatusDesTeilnehmers')">Status des Teilnehmers</button>
      </div>
      <div class="form-group">
        <button type="button" id="abmeldenBtn" @click="navigateTo('Login')">Abmelden</button>
      </div>
      <div class="btn">
        <button type="button" id="btn" @click="navigateTo('HomeSeite')">Zurück zur Homeseite</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      benutzerName: '' // Add this field to store the username
    };
  },
  methods: {
    navigateTo(page) {
      switch (page) {
        case 'BenutzerHinzufuegen':
          this.$router.push('/benutzerHinzufuegen');
          break;
        case 'Usersloeschen':
          this.$router.push('/usersloeschen');
          break;
        case 'StatusDesTeilnehmers':
          this.$router.push('/statusDesTeilnehmers');
          break;
        case 'Login':
          this.$router.push('/login');
          break;
        case 'HomeSeite':
          this.$router.push('/');
          break;
        default:
          console.error(`Unknown page: ${page}`);
      }
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
    }
  },
  mounted() {
    this.fetchUserName();
  }
};
</script>

<style scoped>
#editorFrageHinzufuegen {
  margin: 0;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

.eingabe-container {
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
  height: auto;
}

.eingabe-container h2 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 30px;
}

.form-group {
  margin-bottom: 20px;
}

#frageHinzufuegenBtn,
#frageLoeschenBtn,
#statusBtn,
#abmeldenBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 270px;
  margin-bottom: 10px; 
}

#frageHinzufuegenBtn:hover,
#frageLoeschenBtn:hover,
#statusBtn:hover,
#abmeldenBtn:hover {
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
</style>
