<template>
  <div class="app-layout">
    <NavBar />
    <div class="content">
      <router-view /> <!-- Affiche les pages dynamiquement -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/pages/layouts/NavBar.vue";

export default {
  components: {
    NavBar
  }
};
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/pf-din-text-pro');
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  flex: 1;
}
</style>
