<template>
  <div id="frageLoechen">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <div class="eingabe-containerFragenLoeschen">
      <h2>Welche Fragen sollen gelöscht werden?</h2>
      <div v-for="(question, index) in questions" :key="index" class="form-group">
        <div class="label-text">{{ question.fragestellung }}</div>
        <button type="button" class="frageLoeschenBtn" @click="deleteQuestion(question.id)">löschen</button>
      </div>
      <div>
        <button class="zurueckBtn" @click="navigateToEditor">Zurück</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      questions: []
    };
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/api/fragen');
        this.questions = response.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    async deleteQuestion(id) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/fragen/${id}`);
        if (response.data.success) {
          this.questions = this.questions.filter(question => question.id !== id);
          alert('Frage erfolgreich gelöscht');
        } else {
          alert('Error deleting question: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('An error occurred while deleting the question.');
      }
    },
    navigateToEditor() {
      this.$router.push('/Editor');
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
    this.fetchQuestions();
    this.fetchUserName();
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
  
    /* Stile für die Fragen löschen Seite */
    .eingabe-containerFragenLoeschen {
      width: 800px;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
      box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch; /* Flex-Container auf volle Breite ausdehnen */
      height: auto;
      margin-top: 20px; /* Platz oben hinzufügen */
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
  
    .eingabe-containerFragenLoeschen h2 {
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
  
    .frageLoeschenBtn {
      background-color: #4815c2;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      width: 100px;
    }
  
    .frageLoeschenBtn:hover {
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
  
  