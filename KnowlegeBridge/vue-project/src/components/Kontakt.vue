<template>
  <div class="contact-page">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <!-- Back Button -->
    <button @click="goBack" id="back-button" class="back-button">Zurück</button>

    <h1>Kontaktieren Sie uns</h1>
    <section class="contact-form-section">
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="form-group">
          <label for="email">E-Mail:</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="form-group">
          <label for="message">Nachricht:</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>
        <button type="submit" class="submit-button">Senden</button>
      </form>
    </section>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Ihre Nachricht wird gesendet...</p>
      </div>
    </div>
  </div>
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
      },
      showModal: false // State to control modal visibility
    };
  },
  methods: {
    submitForm() {
      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
        alert(`Nachricht gesendet von ${this.form.name} (${this.form.email}): ${this.form.message}`);
        this.form.name = '';
        this.form.email = '';
        this.form.message = '';
      }, 2000); // Simulate a delay for sending the message
    },
    fetchUserName() {
      const username = localStorage.getItem('username');
      if (username) {
        this.benutzerName = username;
      }
    },
    closeModal() {
      this.showModal = false;
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
  font-family: Arial, sans-serif;
  color: #f9f9f9;
  background: url('/images/IMG_2747.png/hintergrund2.jpg') no-repeat center center fixed;
  background-size: cover;
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

.contact-page {
  line-height: 1.6;
  padding: 10px 20px; /* Adjusted padding */
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-page h1 {
  font-size: 2.5em;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  color:#ecf0f1;
}

.contact-form-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.contact-form {
  background: #370f9e;
  padding: 10px 20px; /* Adjusted padding */
  border-radius: 15px; /* Reduced border-radius */
  box-shadow: 0 10px 20px rgba(30, 25, 25, 0.1);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  color: #ecf0f1;
}

.form-group input,
.form-group textarea {
  width: 95%; /* Full width for inputs */
  padding: 10px;
  border: 1px solid #6855a3;
  border-radius: 5px;
  background: #ecf0f1;
  color: #2c3e50;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}
 
.submit-button {
  width: 100%;
  padding: 10px;
  background: #5d51a1;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-button:hover {
  background: #9f5cc3;
}

/* Modal styles */
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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
