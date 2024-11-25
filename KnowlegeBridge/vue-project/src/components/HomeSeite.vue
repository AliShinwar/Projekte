<template>
  <div id="homeSeite">
    <div class="container1" id="container1">
      <h1>Willkommen bei Knowledge Bridge</h1>
      <p>Effektive Weiterbildung für Mitarbeiter. 
         Steigern Sie die Kompetenzen Ihres Teams und sichern Sie den Erfolg Ihres Unternehmens.</p>
    </div>
    <button class="startBtn" @click="navigateToLogin">starten</button>
  </div>
</template>

<script>
export default {
  name: 'HomeSeite',
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
#homeSeite {
  margin: 0;
  padding: 0;
  background-image: url('/homeSeite.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start; 
  position: relative;
}

.navbar ul {
  display: flex;
  list-style-type: none;
}

.navbar ul li {
  margin: 0 10px;
}

.navbar ul li a {
  text-decoration: none;
  color: #333;
}

.container1 {
  color: white;
  margin-top: 45vh; 
  margin-left: 14vw; 
}

.startBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  margin-top: 20px; 
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 72vw;
}

.startBtn:hover {
  background-color: #555;
}

@media (max-width: 1000px) {
  .knowledge-bridge {
    display: none;
  }
}

</style>