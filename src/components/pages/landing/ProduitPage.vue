<template>
    <div class="container">
      <div class="text-header slide-in-right">
        <AText 
          contenu="EXPLOREZ PLUS D’EXCELLENCE" 
          fontSize="32px"
          textColor="#1962AC"
          fontWeight="normal"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="10px"
          lineHeight="1.5"
        />
        <AText 
          contenu="La performance ne s’arrête pas au Stellar Z ! Explorez nos autres modèles et équipements conçus pour repousser vos limites sur tous les terrains." 
          fontSize="15px"
          textColor="#131313"
          fontWeight="300"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="50px"
          lineHeight="1.5"
        />
      </div>
  
      <div class="section-produit">
        <div 
          v-for="(item, index) in products" 
          :key="index" 
          class="card slide-in-right"
          @mouseover="hoverText = index" 
          @mouseleave="hoverText = ''"
        >
          <div class="image-container">
            <AImage 
              :url="item.image"
              class="image"
              :class="{ zoom: hoverText === index }"
              width="100%"
              height="auto"
              borderRadius="4px"
            />
          </div>
          <div class="description">
            <AText 
              :contenu="item.title" 
              fontSize="18px" 
              textColor="#131313" 
              fontWeight="normal" 
              fontFamily="sans-serif" 
              textAlign="left" 
              lineHeight="1.5" 
            />
            <AText 
              class="item-description"
              :contenu="item.description" 
              fontSize="14px" 
              textColor="#131313" 
              fontWeight="normal" 
              fontFamily="sans-serif" 
              textAlign="left" 
              marginBottom="10px" 
              lineHeight="1.5" 
            />
          </div>
        </div>
      </div>
  
      <div class="section-service">
        <div 
            v-for="(service, index) in services" 
            :key="index" 
            class="card-service slide-in-right"
            @mouseover="hoverText = `service-${index}`"
            @mouseleave="hoverText = ''"
        >
            <div class="image">
            <AImage 
                :url="service.image"
                class="image"
                :class="{ zoom: hoverText === `service-${index}` }"
                width="100%"
                height="100%"
            />
            </div>
            <div class="tirer"></div>
            <AText 
            class="texte"
            :contenu="service.texte" 
            fontSize="32px"
            textColor="#FAFAFA"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAlign="left"
            marginBottom="10px"
            lineHeight="1.2"
            />
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
      const products = ref([
        {
          image: "/images/pr1.png",
          title: "Pompe",
          description: "Gonflage rapide & efficace"
        },
        {
          image: "/images/pr2.png",
          title: "Pédale",
          description: "Adhérence & performance"
        },
        {
          image: "/images/pr3.png",
          title: "Gant ",
          description: "Confort & protection"
        },
        {
          image: "/images/pr4.png",
          title: "Casque ",
          description: "Sécurité & style"
        },
        {
          image: "/images/pr5.png",
          title: "Survêt ",
          description: "Légèreté & flexibilité"
        }
      ]);
  
      const services = ref([
        {
          image: "/images/s1.jpeg",
          texte: "Divers accessoires"
        },
        {
          image: "/images/s2.jpeg",
          texte: "D'autres modèles"
        },
        {
          image: "/images/s3.jpeg",
          texte: "Equipements d'entretien"
        },
        {
          image: "/images/s4.jpeg",
          texte: "Explorez plus"
        }
      ]);
  
      const hoverText = ref('');
  
      return { products, hoverText, services };
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
  
  .section-produit {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  
  .card {
    width: 210px;
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-description {
    margin-top: -5px;
  }
  
  .image-container {
    width: 100%;
    height: 180px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .image {
    transition: transform 0.3s ease-in-out;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .zoom {
    transform: scale(1.1);
  }
  
  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
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
  
  .section-service {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.card-service {
  background: white;
  height: 350px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease;
  width: 279px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-service:hover {
  transform: scale(1.05);
}

.card-service .image {
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  filter: brightness(76%);
}

.card-service .image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* Ajoute l'effet sombre */
  transition: opacity 0.3s ease;
  opacity: 0;
}

.card-service:hover .image::before {
  opacity: 1; /* Applique le sombreur au survol */
}

.card-service:hover .image {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tirer {
  background: #EA8C1B;
  width: 60px;
  height: 5px;
  margin-top: -120px;
  margin-left: 30px;
  position: relative;  /* Nécessaire pour appliquer le z-index */
  z-index: 10;         /* Met l'élément au premier plan */
}

.texte {
  margin-left: 30px;
  width: 100px;
  margin-top: 15px;
  position: relative; 
  z-index: 10;
}


.card-service:hover .texte {
  color: #FAFAFA; /* Garde la couleur de texte claire même en survol */
}

.card-service .image .zoom {
  transform: scale(1.1);
}

.card-service .image .zoom:hover {
  transform: scale(1.1);
}
  </style>
  