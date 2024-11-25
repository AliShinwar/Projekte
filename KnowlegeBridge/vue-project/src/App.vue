<template>
  <div id="app">
    <Header v-if="showHeader" />
    <ProfileIcon />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import ProfileIcon from '@/components/ProfileIcon.vue';

export default {
  name: 'App',
  components: {
    Header,
    ProfileIcon
  },
  computed: {
    showHeader() {
      return this.$route.path !== '/login';
    }
  },
  created() {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authenticated');
    if (!isAuthenticated && this.$route.path !== '/login') {
      this.$router.push('/login');
    }
  },
  watch: {
    $route(to) {
      // Check authentication on route change
      const isAuthenticated = localStorage.getItem('authenticated');
      if (!isAuthenticated && to.path !== '/login') {
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/icons/editorHintergrund.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.profile-icon {
  position: fixed;
  top: 20px;
  right: 20px;
}

</style>