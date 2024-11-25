<template>
  <div class="home">

    <div class="header">
      <span class="user-name">{{ benutzerName }}</span>
    </div>

    <section class="welcome">
    </section>
    <section id="team" class="team">
      <h2>Unser Team</h2>
      <div class="team-layout">
        <div class="team-member" v-for="member in team" :key="member.name">
          <img :src="member.photo" :alt="member.name" class="team-photo">
          <div class="team-info">
            <h3>{{ member.name }}</h3>
            <p>{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <button @click="goBack" id="back-button" class="back-button">Zurück</button>
</template>

<script>
export default {
  data() {
    return {
      benutzerName: '', // Add this field to store the username
      team: [
        
        { name: 'Shinwar Ali', photo: '/images/IMG_2746.png', role: 'Rolle', position: 'right' },
        ]
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
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #f9f9f9;
}

.home {
  line-height: 1.6;
  background: url('/images/IMG_2747.png/hintergrund2.jpg') no-repeat center center fixed;
  background-size: cover;
  height: 100%;
}

.welcome {
  text-align: center;
  margin-bottom: 30px;
}

.welcome h1 {
  font-size: 2.5em;
  background: rgba(0, 0, 0, 0.7);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
}

.section {
  margin: 15px 0;
  padding: 15px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
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

.section:hover {
  transform: scale(1.05);
}

.team {

  margin: 30px 0;
  border-radius: 10px;
}

.team h2 {
  margin-top: 80px;
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;
}

.team-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.team-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 45%;
  margin: 10px 0;
}

.team-member:hover {
  transform: translateY(-10px);
}

.team-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #000000;
}

.team-info {
  text-align: center;
}

.team-info h3 {
  margin: 0;
  font-size: 1.3em;
}

.team-info p {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #ddd;
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
