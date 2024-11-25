<template>
  <div class="home">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <section class="welcome">
    </section>
    <section id="services" class="services">
      <h2>Unsere Dienstleistungen</h2>
      <div class="service">
        <h3>Individuelle Schulungen</h3>
        <p>
          Unsere individuellen Schulungen sind auf die spezifischen Bedürfnisse Ihrer Mitarbeiter zugeschnitten. Diese Dienstleistung bietet personalisierte Lerninhalte und praxisnahe Übungen, um die Fähigkeiten Ihrer Mitarbeiter effektiv zu verbessern.
        </p>
        <blockquote>
          "Die beste Schulung, die ich je erlebt habe!" - Zufriedener Teilnehmer
        </blockquote>
      </div>
      <div class="service">
        <h3>Online-Seminare</h3>
        <p>
          Unsere Online-Seminare bieten eine flexible und interaktive Möglichkeit, neue Fähigkeiten zu erlernen. Sie umfassen aufgezeichnete Sessions und umfangreiche Materialien, um das Lernen zu unterstützen.
        </p>
        <blockquote>
          "Sehr hilfreich und gut strukturiert." - Glücklicher Teilnehmer
        </blockquote>
      </div>
      <div class="service">
        <h3>Support und Beratung</h3>
        <p>
          Unser engagiertes Support-Team steht Ihnen zur Verfügung, um bei allen Fragen und Herausforderungen zu helfen. Diese Dienstleistung bietet kontinuierliche Unterstützung und Beratung, um sicherzustellen, dass Sie das Beste aus unseren Schulungsangeboten herausholen.
        </p>
        <blockquote>
          "Exzellenter Support und immer verfügbar." - Zufriedener Kunde
        </blockquote>
      </div>
      <!-- Weitere Dienstleistungen können hier hinzugefügt werden -->
    </section>
  </div>

  <!-- Back Button -->
  <button @click="goBack" id="back-button" class="back-button">Zurück</button>
</template>


<script>
export default {
  data() {
    return {
      benutzerName: '' // Add this field to store the username
    };
  },
  methods: {
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
.home {
  font-family: Arial, sans-serif;
  color: #f9f9f9;
  line-height: 1.6;
  background: url('/images/IMG_2747.png/hintergrund2.jpg') no-repeat center center fixed;
  background-size: cover;
  
  min-height: 100vh; /* Sicherstellen, dass der Inhalt mindestens die Höhe des Viewports hat */
  overflow-y: auto; /* Ermöglicht das vertikale Scrollen */
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

.header .navigation ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center; /* Zentriert die Navigationselemente */
  flex-wrap: wrap; /* Erlaubt das Umbruch bei kleinen Bildschirmen */
}

.header .navigation li {
  margin: 0 15px; /* Abstand zwischen den Navigationselementen */
}

.header .navigation a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  
}

.welcome {
  margin-top: 90px; /* Abstand nach oben hinzugefügt */
  text-align: center;
}

.section {
  margin: 20px 0;
  padding: 20px;
  border-bottom: 1px solid #34495e;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}

.services {
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
}

.service {
  margin-bottom: 20px;
}

.service h3 {
  margin-top: 0;
}

.service blockquote {
  background:#370f9e; /* Dunklere Hintergrundfarbe */
  padding: 10px;
  border-radius: 5px;
  font-style: italic;
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
