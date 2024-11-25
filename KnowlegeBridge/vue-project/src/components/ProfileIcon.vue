<template>
  <button class="profile-icon" @click="redirectToLogin">
    <img src="@/assets/icons/profile.png" alt="Profile Icon">
  </button>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      this.$router.push('/login');  // Ensure Vue Router is configured properly
    }
  }
}
</script>

<style scoped>
.profile-icon {
  width: 50px;
  height: 50px;
  margin-top: 17px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.profile-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 700px) {
  .profile-icon {
    margin-top: 17px;
  }
}

@media (min-width: 700px) {
  .profile-icon {
    margin-top: 17px;
  }
}

@media (max-width: 480px) {
  .navbar li a {
    padding: 8px 15px;
  }

  .logo {
    margin-top: 3%;
    max-height: 50px;
  }
}
</style>
