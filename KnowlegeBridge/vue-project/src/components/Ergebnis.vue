<template>
  <div id="ergebnis">
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>
    
    <div class="eingabe-containerEr">
      <div id="result-content" class="result-box">
        <h2>Test Ergebnis</h2>
      
        <div>
          <label for="teilnehmer" class="teilnehmer" id="teilnehmer">Teilenehmer: {{ benutzerName }}</label>
        </div>
        <div>
          <label for="score" class="score" id="score">Dein Ergebnis: {{ score }} von {{ totalQuestions }}</label>
        </div>
        <div>
          <label for="bestanden" class="bestanden" id="bestanden">Bestanden: {{ bestanden ? 'Ja' : 'Nein' }}</label>
        </div>
      </div>
      <div>
        <button class="abmeldenBtn" id="abmeldenBtn" @click="navigateTo('login')">Abmelden</button>
      </div>
      <div>
        <button class="zurueckZurHomeseiteBtn2" id="zurueckZurHomeseiteBtn2" @click="navigateTo('homeSeite')">Zurück zur Homeseite</button>
      </div>
      <div>
        <button class="downloadPdfBtn" @click="downloadPdf">Ergebnis als PDF herunterladen</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  name: 'Ergebnis',
  data() {
    return {
      benutzerName: '',
      teilnehmer: this.$route.params.teilnehmer,
      score: this.$route.params.score,
      totalQuestions: this.$route.params.totalQuestions,
      bestanden: false
    };
  },
  methods: {
    navigateTo(page) {
      if (page === 'login') {
        this.$router.push('/login');
      } else if (page === 'homeSeite') {
        this.$router.push('/');
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
    },
    downloadPdf() {
      const element = document.getElementById('result-content');
      const opt = {
        margin: 1,
        filename: 'Ergebnis.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(opt).save();
    },
    updateDatabase() {
      // This is a placeholder function to demonstrate updating the database
      const status = this.bestanden ? 'Bestanden' : 'Nicht bestanden';
      // Replace this with actual code to update your database
      console.log(`Updating database for ${this.benutzerName}: Status - ${status}`);
    }
  },
  mounted() {
    this.bestanden = (this.score > this.totalQuestions / 2);
    console.log(`Score: ${this.score}, Total Questions: ${this.totalQuestions}, Bestanden: ${this.bestanden}`);
    this.fetchUserName();
    this.updateDatabase();
  }
};

</script>

<style scoped>
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

#ergebnis {
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

.eingabe-containerEr {
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

.result-box {
  background-color: #4815c2;
  color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.abmeldenBtn, .zurueckZurHomeseiteBtn2, .downloadPdfBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 270px;
  margin-top: 20px;
  font-size: 12px;
}

.abmeldenBtn:hover, .zurueckZurHomeseiteBtn2:hover, .downloadPdfBtn:hover {
  background-color: #370f9e;
}

.eingabe-containerEr h2 {
  margin: 0 0 30px;
  padding: 0;
  text-align: center;
  font-weight: 600;
}

.teilnehmer, .score, .bestanden {
  font-size: 20px;
  margin: 10px 0;
}

.score, .bestanden {
  font-size: 25px;
}
</style>
