<template>
  <div id="frageHinzufuegen">
    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <div class="eingabe-containerFragen">
      <h2>Frage hinzufügen</h2>
      <div class="form-group">
        <input type="text" id="fragenText" name="fragenText" v-model="fragenText" required />
        <label for="fragenText">Fragenstellung:</label>
      </div>
      <div class="form-group" v-for="(answer, index) in answers" :key="index">
        <input type="text" :id="'antwort' + (index + 1)" v-model="answers[index]" required />
        <label :for="'antwort' + (index + 1)">Antwort {{ index + 1 }}:</label>
        <input type="checkbox" :id="'richtigeAntwort' + (index + 1)" v-model="correctAnswers[index]" />
      </div>
      <div class="form-group">
        <button type="button" id="frageHinzufuegenBtn" @click="addQuestion">Frage hinzufügen</button>
      </div>
      <div class="form-group">
        <button type="button" id="zurueckBtn" @click="goBack">Zurück</button>
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
  name: 'FragenHinzufuegen',
  data() {
    return {
      benutzerName: '',
      fragenText: '',
      answers: ['', '', '', ''],
      correctAnswers: [false, false, false, false]
    };
  },
  methods: {
    async addQuestion() {
      // Validate the inputs
      if (!this.fragenText) {
        alert('Fragenstellung darf nicht leer sein.');
        return;
      }

      for (let i = 0; i < this.answers.length; i++) {
        if (!this.answers[i]) {
          alert(`Antwort ${i + 1} darf nicht leer sein.`);
          return;
        }
      }

      if (!this.correctAnswers.includes(true)) {
        alert('Es muss mindestens eine richtige Antwort ausgewählt werden.');
        return;
      }

      const correctAnswerIndexes = this.correctAnswers
        .map((isCorrect, index) => isCorrect ? this.answers[index] : null)
        .filter(answer => answer !== null);

      try {
        const response = await axios.post('http://localhost:3000/api/fragen', {
          frageStellung: this.fragenText,
          antwort1: this.answers[0],
          antwort2: this.answers[1],
          antwort3: this.answers[2],
          antwort4: this.answers[3],
          richtigeAntwort: correctAnswerIndexes.join(';')
        });
        if (response.data) {
          alert('Frage hinzugefügt');
          this.fragenText = '';
          this.answers = ['', '', '', ''];
          this.correctAnswers = [false, false, false, false];
        } else {
          alert('Fehler beim Hinzufügen der Frage');
        }
      } catch (error) {
        console.error('Error adding question:', error);
        alert('Ein Fehler ist beim Hinzufügen der Frage aufgetreten.');
      }
    },
    goBack() {
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

    },
    navigateTo(page) {
      this.$router.push('/');
    }
   
  },
  
  mounted() {
    this.fetchUserName(); // Fetch the user's name when the component is mounted
  }
};
</script>



<style scoped>
#frageHinzufuegen {
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

.eingabe-containerFragen {
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
  height: 550px;
  margin-top: 80px;
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

.eingabe-containerFragen h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group input[type="text"] {
  width: 70%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
  margin-bottom: 5px;
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

.form-group input[type="text"]:focus ~ label,
.form-group input[type="text"]:valid ~ label {
  top: -5px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.form-group input[type="checkbox"] {
  margin-left: 10px;
}

#frageHinzufuegenBtn,
#zurueckBtn {
  background-color: #4815c2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 270px;
}

#frageHinzufuegenBtn:hover,
#zurueckBtn:hover {
  background-color: #370f9e;
}
</style>
