<template>
  <div id="schueler">
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>
    <div class="eingabe-containerSchueler">
      <h2>{{ questionText }}</h2>
      <div class="answers">
        <label v-for="(answer, index) in answers" :key="index">
          <input type="radio" :value="answer" v-model="selectedAnswer" @change="checkAnswer">
          {{ answer }}
        </label>
      </div>
      <div id="formgroup" class="formgroup">
        <button id="prevQuestionBtn" class="prevQuestionBtn" type="button" @click="prevQuestion" :disabled="currentQuestionIndex === 0">Vorherige Frage</button>
        <button id="nextQuestionBtn" class="nextQuestionBtn" type="button" @click="nextQuestion" :disabled="currentQuestionIndex === questions.length - 1">Nächste Frage</button>
      </div>
      <div class="submit-container">
        <button id="abgebenBtn" class="abgebenBtn" @click="abgeben">Abgeben</button>
      </div>
    </div>

    <div id="blockPage" class="sidebar" :class="{ open: isSidebarOpen }">
      <span class="close" @click="toggleSidebar">&times;</span>
      <h2>Fragenübersicht</h2>
      <div id="questionList" class="question-list">
        <div class="question-number" v-for="(question, index) in questions" :key="index" @click="loadQuestion(index)">
          {{ index + 1 }}
        </div>
      </div>
    </div>

    <div class="block-button-container">
      <button v-if="!isSidebarOpen" id="openBlockBtn" @click="toggleSidebar">→</button>
    </div>
<!--Hier veränderung-->
    <div class="tip-button-container">
      <button id="tipBtn" class="tipBtn" @click="showTip">
        <i class="fas fa-lightbulb"></i>
      </button>
      <p v-if="showingTip">{{ currentTip }}</p>
    </div>
    <!--bis hier -->
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
      questions: [],
      currentQuestionIndex: 0,
      questionText: '',
      answers: [],
      selectedAnswer: null,
      isSidebarOpen: false,
      scores: [],
      benutzerName: '', // Benutzername wird dynamisch gesetzt
      // hier wird verändert
      showingTip: false,
      currentTip: 'Sie können zu vorherigen Frage zurück, wenn Sie wollen.' // Standardtipp
      //bis hier
    };
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://localhost:3000/api/fragen');
        this.questions = response.data;
        this.scores = Array(this.questions.length).fill(0);
        console.log('Questions fetched:', this.questions);
        if (this.questions.length > 0) {
          this.loadQuestion(0);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    async fetchUserName() {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          this.benutzerName = username;
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    },
    loadQuestion(index) {
      this.currentQuestionIndex = index;
      const question = this.questions[index];
      this.questionText = question.fragestellung;
      this.answers = [question.antwort1, question.antwort2, question.antwort3, question.antwort4];
      this.selectedAnswer = this.scores[this.currentQuestionIndex] ? this.questions[this.currentQuestionIndex].richtigeantwort : null;
      //hier wird verändert
      this.currentTip = question.tipp || 'Sie können zu vorherigen Frage zurück, wenn Sie wollen.'; // Tipp setzen oder Standardtipp
      this.showingTip = false;
      //bis hier
      console.log('Loaded question:', this.questionText, this.answers);
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.loadQuestion(this.currentQuestionIndex);
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.loadQuestion(this.currentQuestionIndex);
      }
    },
    checkAnswer() {
      const correctAnswer = this.questions[this.currentQuestionIndex].richtigeantwort;
      if (this.selectedAnswer === correctAnswer) {
        this.scores[this.currentQuestionIndex] = 1;
      } else {
        this.scores[this.currentQuestionIndex] = 0;
      }
      console.log("Scores:", this.scores);
    },
    async abgeben() {
      if (confirm('Bist du sicher für deine Abgabe?')) {
        const totalScore = this.scores.reduce((a, b) => a + b, 0);
        console.log('Sending username:', this.benutzerName); // Debugging
        try {
          const response = await axios.post('http://localhost:3000/api/ergebnis', {
            ergebnis: totalScore,
            username: this.benutzerName
          });
          console.log('Result stored:', response.data);
          this.$router.push({ 
            name: 'Ergebnis', 
            params: { 
              username: this.benutzerName, 
              score: totalScore, 
              totalQuestions: this.questions.length 
            } 
          });
        } catch (error) {
          console.error('Error storing result:', error);
        }
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    navigateTo(page) {
      this.$router.push('/');
    },
    //hier wird verändert
    showTip() {
      this.showingTip = true;
    }
    // bis hier
  },
  mounted() {
    this.fetchUserName();
    this.fetchQuestions();
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

#btn:hover {
  background-color: #370f9e;
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

.user-icon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.eingabe-containerSchueler {
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
  color: #fff;
  margin-top: 20px;
}

.eingabe-containerSchueler h2 {
  margin: 0 0 30px;
  padding: 0;
  text-align: center;
  font-weight: bold;
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  height: 5vh;
}

.answers {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.answers label {
  display: flex;
  align-items: center;
  font-size: 18px;
  background-color: #4815c2;
  padding: 12px 20px;
  border-radius: 8px;
  color: #f4f1f1;
  cursor: pointer;
}

.answers input[type="radio"] {
  margin-right: 10px;
  cursor: pointer;
}

.formgroup {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2%;
  height: 5vh;
}

#prevQuestionBtn, #nextQuestionBtn, #abgebenBtn {
  background-color: #4815c2;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  flex: 1;
  margin: 0 10px;
}

#prevQuestionBtn:hover, #nextQuestionBtn:hover, #abgebenBtn:hover {
  background-color: #370f9e;
}

#prevQuestionBtn:disabled, #nextQuestionBtn:disabled, #abgebenBtn:disabled {
  background-color: #2e0b6e;
  cursor: not-allowed;
}

.block-button-container {
  position: fixed;
  top: 50%;
  right: 100px;
  transform: translateY(-50%);
  z-index: 1001;
}

#openBlockBtn {
  background-color: #4815c2;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sidebar {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 60px;
  right: 0;
  width: 250px;
  height: calc(100% - 60px);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  color: white;
}

.sidebar h2 {
  color: white;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.question-number {
  background-color: #4815c2;
  padding: 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-align: center;
}

.question-number:hover {
  background-color: #370f9e;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar .close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  text-align: right;
  display: block;
}

.sidebar .close:hover {
  color: white;
}

.hidden {
  display: none;
}
/* hier wird verändert  */
.tip-button-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1001;
  text-align: right;
}

#tipBtn {
  padding: 10px;
  font-size: 24px;
  background-color: #4815c2;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

#tipBtn:hover {
  background-color: #370f9e;
}

.tip-button-container p {
  margin-top: 10px;
  background-color: rgba(72, 21, 194, 0.5);
  padding: 10px;
  border-radius: 5px;
  color: white;
}
/* bis hier  */
</style>

