<template>
  <div class="home">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <section class="welcome">
      
    </section>
    <section id="platform" class="platform">
      <h2>Plattform</h2>
      <p>
        Unsere Plattform bietet eine Vielzahl von Funktionen, die Ihre Mitarbeiter unterstützen, ihre Fähigkeiten zu erweitern und beruflich voranzukommen. 
        Zu den Hauptmerkmalen gehören eine benutzerfreundliche Oberfläche, umfassende Schulungsressourcen und ein engagiertes Support-Team.
      </p>
    </section>
    <section id="features" class="features">
      <h2>Hauptmerkmale</h2>
      <ul>
        <li class="feature-item">Intuitive und benutzerfreundliche Oberfläche</li>
        <li class="feature-item">Interaktive Lernmodule und Tests</li>
        <li class="feature-item">Engagiertes Support-Team für schnelle Hilfe</li>
      </ul>
    </section>
    <section id="about" class="about">
      <h2>Über uns</h2>
      <p>
        Wir sind ein Unternehmen, das sich der Entwicklung innovativer Lösungen widmet, um die Weiterbildung und das Wachstum Ihrer Mitarbeiter zu fördern. Unser Ziel ist es, Ihnen die besten Werkzeuge und Ressourcen für eine effektive Schulung zur Verfügung zu stellen.
      </p>
    </section>
  </div>

  <!-- Back Button -->
  <button @click="goBack" id="back-button" class="back-button">Zurück</button>
</template>


<script>
export default {
  data() {
    return {
      benutzerName: '', // Add this field to store the username
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      alert(`Nachricht gesendet von ${this.form.name} (${this.form.email}): ${this.form.message}`);
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
    fetchUserName() {
      const username = localStorage.getItem('username');
      if (username) {
        this.benutzerName = username;
      }
    },
    
    goBack() {
          this.$router.go(-1); // Navigate to the previous page in the browser history
    }

  },
  mounted() {
    this.fetchUserName();
  }
}
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
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

.home {
  font-family: Arial, sans-serif;
  color: #f9f9f9;
  line-height: 1.6;
  background: url('/images/IMG_2747.png/hintergrund2.jpg') no-repeat center center fixed;
  background-size: cover;
 
  min-height: 100vh;
}

.welcome {
  margin-top: 90px;
  text-align: center;
}

.section {
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #34495e;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}

.platform, .features, .about {
  padding: 10px;
  margin: 20px 0;
  border-radius: 10px;
}

.features {
  background:#370f9e; /* Original Hintergrundfarbe beibehalten */
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  background: rgba(255, 255, 255, 0.2); /* Leicht dunklere Hintergrundfarbe für die Listenelemente */
  margin: 5px 0;
  padding: 6px;
  border-radius: 5px;
}

.back-button {
  position: fixed; 
  bottom: 30px; 
  left: 90px; 
  z-index: 1000; 
}

#back-button {
  padding: 10px 30px ;
  font-size: 16px;
  background-color: #4815c2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #370f9e;
}

</style>
