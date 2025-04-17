<template>
    <div class="container">
      <div class="accroche" :class="{ 'animate-left': animate }">
        <AText
          contenu="SURPASSEZ-VOUS AVEC STELLAR Z"
          fontSize="36px"
          textColor="#FAFAFA"
          fontWeight="bold"
          fontFamily="PF DIN Text Pro"
          textAlign="left"
          marginBottom="10px"
          lineHeight="1.5"
        />
        <AText
          contenu="Ultra-léger, puissant et précis, il repousse les limites avec son design en fibre de carbone et nanotubes."
          fontSize="18px"
          textColor="#FAFAFA"
          fontWeight="300"
          fontFamily="sans-serif"
          textAlign="left"
          marginBottom="50px"
          lineHeight="1.5"
        />
        <AButton
          value="JE VEUX ESSAYER"
          borderColor="#EA8C1B"
          backgroundColor="#EA8C1B"
          borderRadius="4px"
          width="100%"
          height="50px"
          textColor="white"
          borderWidth="2px"
          fontSize="16px"
          fontWeight="normal"
          fontFamily="PF DIN Text Pro"
          :style="{ letterSpacing: '1.7px' }"
          @click="openAuthModal"
        />
      </div>
  
      <div class="image-hero" :class="{ 'animate-right': animate }">
        <AImage :url="imageHero" width="90%" height="auto" />
      </div>
  
      <!-- Modal correctement intégré -->
      <PopUpPage ref="authModal">
        <PopUp />
      </PopUpPage>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import AImage from '@/components/atomes/AImage.vue';
  import AText from '@/components/atomes/AText.vue';
  import AButton from '@/components/atomes/AButton.vue';
  import PopUp from './PopUp.vue';
  import PopUpPage from '@/components/pages/layouts/PopUpPage.vue';

  
  export default {
    components: { AImage, AText, AButton, PopUp, PopUpPage },
    setup() {
      const imageHero = "/images/bike3.png";
      const animate = ref(false);
      const authModal = ref(null);
  
      onMounted(() => {
        setTimeout(() => {
          animate.value = true;
        }, 300);
      });
  
      function openAuthModal() {
        if (authModal.value) {
          authModal.value.openModal();
        }
      }
  
      return {
        imageHero,
        animate,
        authModal,
        openAuthModal
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    text-align: center;
    background: url('http://localhost:8080/images/background-hero2.png') no-repeat center/cover,
                linear-gradient(90deg, #000000, #131313);
    background-blend-mode: normal;
    margin-top: -3%;
  }
  
  .accroche {
    width: 300px;
    max-width: 400px;
    text-align: left;
    margin-left: 110px;
    margin-top: 6%;
    opacity: 0;
    transform: translateX(-100px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .image-hero {
    width: 100%;
    max-width: 400px;
    margin-top: 30px;
    margin-right: 7%;
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }
  
  .animate-left {
    opacity: 1;
    transform: translateX(0);
  }
  
  .animate-right {
    opacity: 1;
    transform: translateX(0);
  }
  
  @media (min-width: 768px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  
    .accroche {
      max-width: 50%;
    }
  
    .image-hero {
      max-width: 50%;
      margin-top: 0;
    }
  }
  </style>
  