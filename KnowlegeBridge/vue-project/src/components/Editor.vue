<template>
  <div id="editorFrageHinzufuegen">
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <div class="eingabe-container">
      <h2>Willkommen Editor</h2>
      <div class="form-group">
        <button type="button" id="frageHinzufuegenBtn" @click="navigateTo('FragenHinzufuegen')">Neue Frage hinzufügen</button>
      </div>
      <div class="form-group">
        <button type="button" id="frageLoeschenBtn" @click="navigateTo('FragenLoeschen')">Vorhandene Fragen löschen</button>
      </div>
      <div class="form-group">
        <button type="button" id="abmeldenBtn" @click="navigateTo('Login')">Abmelden</button>
      </div>
    </div>
  </div>
</template>

  
<script>
export default {
  name: 'Editor',
  data() {
    return {
      benutzerName: '' // Define benutzerName
    };
  },
  methods: {
    navigateTo(url) {
      window.location.href = url;
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
    this.fetchUserName(); // Fetch the user's name when the component is mounted
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
  #frageAktualisierenBtn,
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
  #frageAktualisierenBtn:hover,
  #abmeldenBtn:hover {
    background-color: #370f9e;
  }
  </style>
  