<template>
  <header>
    <div class="logo-container">
      <img src="@/assets/icons/logo2.png" alt="Logo" class="logo">
      <img src="@/assets/icons/khnowlogebrige.png" alt="Knowledge Bridge" class="knowledge-bridge">
    </div>
    <nav class="navbar">
      <ul>
        <li><a @click.prevent="navigateTo('/platforminfo')">Plattform</a></li>
        <li><a @click.prevent="navigateTo('/services')">Services</a></li>
        <li><a @click.prevent="navigateTo('/team')">Team</a></li>
        <li><a @click.prevent="navigateTo('/kontakt')">Kontakt</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showInfo: false
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
/* Header Styling */
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

  .logo {
    max-height: 170px;
    width: auto;
  }

  .logo-container {
    position: absolute;
    top: 0;
    left: 0;
    margin: 10px;
    display: flex;
    align-items: center;
    z-index: 1001;
  }

  .knowledge-bridge {
    height: auto;
    max-width: 200px;
    margin-left: 10px;
  }

  /* Responsive styles */
  @media (max-width: 1000px) {
    .logo {
      max-height: 100px;
      max-width: 100px;
    }
  }
  @media (max-width: 480px) {
    .logo {
      max-height: 100px;
      max-width: 100px;
    }
  }
  @media (max-width: 1000px) {
    .knowledge-bridge {
      display: none;
    }
  }

  @media (min-width: 480px) {
    .navbar li a {
      padding: 8px 5px ;
    }


  }
</style>
