<template>
    <div class="container">
      <div class="text-header slide-in-right">
        <AText 
          contenu="STELLAR Z EN ACTION" 
          fontSize="32px"
          textColor="#1962AC"
          fontWeight="normal"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="10px"
          lineHeight="1.5"
        />
        <AText 
          contenu="Découvrez le Stellar Z en pleine action ! Que ce soit sur des sentiers escarpés ou des routes sinueuses, ce vélo repousse les limites de la performance. Regardez la vidéo et explorez la galerie pour ressentir l’adrénaline et la liberté qu’il procure." 
          fontSize="15px"
          textColor="#131313"
          fontWeight="300"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="50px"
          lineHeight="1.5"
        />
      </div>
  
      <div class="media-section slide-in-right">
        <div class="section-image slide-in-right">
          <AText 
            class="text-bottom"
            contenu="LÉGÈRETÉ, ROBUSTESSE ET PERFORMANCE POUR DOMINER TOUS LES TERRAINS"
            fontSize="18px"
            textColor="#EA8C1B"
            fontWeight="normal"
            fontFamily="sans-serif"
            textAlign="center"
            lineHeight="1.5"
          />
        </div>
  
        <video controls class="video slide-in-right" width="140%" height="100%">
          <source :src="videoUrl" type="video/mp4">
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
  
      <!-- CAROUSEL D'IMAGES -->
      <div class="carousel-container slide-in-right">
        <div ref="carousel" class="photo-cards">
          <div class="card slide-in-right" v-for="(image, index) in images" :key="index">
            <AImage :url="image" width="100%" height="auto" />
          </div>
        </div>
        
        <!-- Boutons de navigation -->
        <div class="carousel-controls slide-in-right">
          <button @click="scrollLeft" class="carousel-button prev">❮</button>
          <button @click="scrollRight" class="carousel-button next">❯</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import AText from '@/components/atomes/AText.vue';
  import AImage from '@/components/atomes/AImage.vue';
  
  export default {
    components: { AText, AImage },
    setup() {
      const images = [
        "/images/image5.jpeg",
        "/images/image6.jpeg",
        "/images/image8.jpeg",
        "/images/image8.jpeg",
        "/images/image9.jpeg",
        "/images/image10.jpeg",
        "/images/image11.jpeg"
      ];
      const videoUrl = "/video/Download.mp4";
      const carousel = ref(0);
  
      const scrollRight = () => {
        if (carousel.value) {
          carousel.value.scrollBy({ left: 250, behavior: "smooth" });
        }
      };
  
      const scrollLeft = () => {
        if (carousel.value) {
          carousel.value.scrollBy({ left: -250, behavior: "smooth" });
        }
      };
  
      return { images, videoUrl, carousel, scrollLeft, scrollRight };
    }
  };
  </script>
  
  <style scoped>
  .text-header {
    text-align: center;
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .media-section {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 40px;
  }
  
  .section-image {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    width: 300px;
    height: 378px;
    background: url('http://localhost:8080/images/image4.png') no-repeat center/cover;
    padding-bottom: 15px;
  }
  
  .section-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(370deg, rgba(250, 250, 250, 0.8), rgba(19, 19, 19, 0.3));
    z-index: 1;
  }
  
  .text-bottom {
    position: relative;
    width: 90%;
    color: #EA8C1B;
    font-size: 15px;
    font-weight: 300;
    z-index: 2;
    padding: 10px;
    border-radius: 5px;
    text-align: left;
  }
  
  .video {
    max-width: 700px;
    object-fit: cover;
  }
  
  /* === CAROUSEL === */
  .carousel-container {
    position: relative;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  
  .photo-cards {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
  }
  
  .photo-cards::-webkit-scrollbar {
    display: none;
  }
  
  .card {
    min-width: 270px;
    height: 350px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    scroll-snap-align: center;
  }
  
  /* === BOUTONS DE NAVIGATION === */
  .carousel-controls {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
  }
  
  .carousel-button {
    background: rgba(250, 250, 250, 0.5);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    color: #FAFAFA;
    font-size: 42px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .carousel-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  /* === ANIMATION D'ENTRÉE DE DROITE === */
  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    animation: slideInRight 0.8s ease-out forwards;
  }
  
  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  </style>
  