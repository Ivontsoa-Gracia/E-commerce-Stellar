<template>
  <nav class="navbar">
    <div class="logo">
      <AImage 
        :url="logo"
        width="130px"
        height="auto"
        marginBottom="10px"
      />
    </div>
    
    <div class="burger-menu" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <ul :class="['nav-links', { 'active': isMenuOpen }]">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/list">Boutiques</router-link></li>
      <li><router-link to="/commande">Mes commandes</router-link></li>
      <li><router-link to="/panier">Mon panier</router-link></li>
      <li><router-link to="/auth">Se connecter</router-link></li>
      <!-- <li><router-link to="/panier">
        <AImage 
        url="/icones/i10.png"
        width="30px"
        height="30px"
        marginBottom="10px"
      />
      </router-link></li>
      <li><router-link to="/auth">
        <AImage 
        url="/icones/i9.png"
        width="30px"
        height="30px"
        marginBottom="10px"
      />
      </router-link></li> -->
    </ul>
  </nav>
</template>

<script>
import { ref } from 'vue';
import AImage from '@/components/atomes/AImage.vue';

export default {
  components: { AImage },
  setup() {
    const logo = "/logo/logo.svg";
    const isMenuOpen = ref(false);
    
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };
    
    return { logo, isMenuOpen, toggleMenu };
  }
};
</script>

<style scoped>

.navbar {
  background: linear-gradient(90deg, #000000, #131313);;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 10px 130px;
}

.logo {
  flex-shrink: 0;
  /* margin-left: 95px; */
  margin-top: 15px;
}

.nav-links {
  display: flex; /* Ajout du flexbox pour l'alignement */
  align-items: center; /* Centrer verticalement */
  justify-content: center; 
  list-style: none;
  padding: 0;
  margin: 0;
  /* margin-right: 110px; */
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: #FAFAFA;
  text-decoration: none;
  font-family: 'PF DIN Text Pro', sans-serif;
  font-weight: 300;
  letter-spacing: 1px;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* Burger Menu */
.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
}

.burger-menu span {
  background: white;
  height: 3px;
  width: 25px;
  margin: 3px 0;
  transition: 0.3s;
}

/* Responsive */
@media (max-width: 768px) {
  .burger-menu {
    display: flex;
  }
  
  .nav-links {
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #131313;
    flex-direction: column;
    align-items: center;
    display: none;
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links li {
    margin: 15px 0;
  }
}
</style>
