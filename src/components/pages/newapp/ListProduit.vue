<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

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

      <div class="search-bar">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Rechercher un produit..." 
          class="search-input"
        />
        <input 
          v-model.number="minPrice" 
          type="number" 
          placeholder="Prix min" 
          class="search-input price-input"
        />
        <input 
          v-model.number="maxPrice" 
          type="number" 
          placeholder="Prix max" 
          class="search-input price-input"
        />
        <select v-model="selectedCategory" class="filter-select">
          <option value="">Toutes les catégories</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

      </div>

  
      <div class="section-produit">
        <div 
          v-for="(item, index) in filteredProducts" 
          :key="index" 
          class="card slide-in-right"
        >

          <div class="image-container">
            <AImage 
              :url="item.image"
              class="image"
              @mouseover="hoverText = index" 
              @mouseleave="hoverText = ''"
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
              borderColor="#ffffff"
              lineHeight="1.5" 
              backgroundColor="#ffffff"
            />
            <AText 
              class="item-description"
              :contenu="item.price" 
              fontSize="14px" 
              textColor="#131313" 
              fontWeight="normal" 
              fontFamily="sans-serif" 
              textAlign="left" 
              marginBottom="10px" 
              lineHeight="1.5" 
            />
            <StarRating :note="item.note" />
             <div class="note">
              <input 
                v-model.number="note" 
                type="number" 
                placeholder="Notez" 
                class="note-input"
              />
              <button @click="addNote(item.id, note)">Ajouter</button>

            </div>
            <div class="coordonnees">
                <AIcon 
                    class="test"
                    url="/icones/i11.png"
                    width="100%"
                    height="100%"
                    borderColor="#ffffff"
                    backgroundColor="#ffffff"
                    borderRadius="15px"
                    borderRadiusIcon="10px"
                    widthback="50px"
                    heightBack="50px"
                    borderWidth="2px"
                    @click="handleClick(item)"
                />
                <div class="cont">
                  <AText 
                      contenu="Ajouter au panier" 
                      fontSize="14px"
                      textColor="#EA8C1B"
                      fontWeight="normal"
                      fontFamily="sans-serif"
                      textAlign="left"
                      :class="{ marginTop: '-10px' }"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>
      <div 
        v-if="showNotification" 
        class="notification-popup flex items-center gap-2 p-4 rounded-lg shadow-lg bg-white text-gray-800"
      >
      <i class="fas fa-bell" style="color: #EA8C1B; font-size: 30px;"></i>
        <span>{{ notificationMessage }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import AText from '@/components/atomes/AText.vue';
  import AImage from '@/components/atomes/AImage.vue';
  import { getProduitsAVendre, setNote } from '@/services/produitService.js';
  import AIcon from '@/components/atomes/AIcon.vue';
  import { addToCart } from '@/services/panierService.js'; 
  import StarRating from '@/components/atomes/StarRating.vue';
  
  export default {
    components: { AText, AImage, AIcon, StarRating },
    setup() {
      const products = ref([]);
      const hoverText = ref('');
      const searchQuery = ref('');
      const minPrice = ref(null);
      const maxPrice = ref(null);
      const selectedCategory = ref('');
      const categories = ref([]);
      const note = ref(null);
      const showNotification = ref(false);
      const notificationMessage = ref('');

  
      const afficherProduits = async () => {
        const produitsApi = await getProduitsAVendre();
  
        const produitsMap = produitsApi.map(p => ({
          id: p.id,
          title: p.label || 'Produit',
          price: parseFloat(p.price) || 0,
          tva: parseFloat(p.tva_tx) || 0,
          category: p.category || 'Autre',
          image: p.url
            ? `http://localhost/dolibarr/htdocs/viewimage.php?modulepart=product&id=${p.rowid}`
            : '/images/bike1.png',
          note: (p.array_options.options_notep * 1).toFixed(2),
        }));
  
        products.value = produitsMap;
  
        // Optionnel : Extraire toutes les catégories uniques
        categories.value = [...new Set(produitsMap.map(p => p.category))];
      };
  
      const filteredProducts = computed(() => {
        return products.value.filter(item => {
          const matchSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase());
          const matchMin = minPrice.value === null || item.price >= minPrice.value;
          const matchMax = maxPrice.value === null || item.price <= maxPrice.value;
          const matchCat = !selectedCategory.value || item.category === selectedCategory.value;
          return matchSearch && matchMin && matchMax && matchCat;
        });
      });
  
      const handleClick = (item) => {
        addToCart(item);
        notificationMessage.value = `Produit "${item.title}" ajouté au panier.`;
        showNotification.value = true;
        
        setTimeout(() => {
          showNotification.value = false;
        }, 3000); // cache la notification après 3 secondes
      };

  
      const addNote = async (productId, valeurNote) => {
        try {
          const produit = products.value.find(p => p.id === productId);
          const ancienneNote = parseFloat(produit.note) || 0;
          const moyenneNote = ((ancienneNote + valeurNote) / 2).toFixed(2);
          console.log("Note acienne :", ancienneNote);
  
          await setNote(productId, moyenneNote);
          produit.note = moyenneNote;
          console.log("Note mise à jour :", moyenneNote);
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la note :", error.message);
        }
      };
  
      onMounted(() => {
        afficherProduits();
      });
  
      return { 
        products, hoverText, handleClick, searchQuery, filteredProducts, 
        minPrice, maxPrice, selectedCategory, categories, note, addNote,
        showNotification, notificationMessage 
      };
    }
  };
  </script>
  
   
  <style scoped>

  .test {
    background: #ffffff;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out; /* Transition pour un zoom fluide */
  }

  .cont {
    margin-top: -10px;
  }

  .coordonnees {
    display: flex;
    align-items: center; /* Alignement vertical */
    gap: 3px; /* Espacement entre l'icône et le texte */
    margin-bottom: 20px;

  }

  .coordonnees:hover {
    transform: scale(1.05); /* Zoom sur l'élément au survol */
  }

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
    gap: 30px;
  }
  
  .card {
    width: 280px;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: #ffffff;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

  }
  
  .item-description {
    margin-top: -5px;
  }
  
  .image-container {
    width: 100%;
    height: 200px;
    border-radius: 4px;
    overflow: hidden;
    /* box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1); */
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
  /* background: #131313; */
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

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  background: #FAFAFA;
  padding: 20px;
  gap: 20px;
}

.search-input, select {
  width: 300px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
}

.note {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.note-input {
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
  outline: none;
  transition: border-color 0.3s ease;
}

.note-input:focus {
  border-color: #1962AC;
}

.note button {
  padding: 6px 12px;
  background-color: #131313;
  color: #FAFAFA;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.note button:hover {
  background-color: rgb(0, 0, 0);
}

.notification-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #131313;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 9999;
  animation: fadeInOut 3s ease-in-out;
  font-family: sans-serif;
  /* justify-content: center;
  align-items: center; */

}

@keyframes fadeInOut {
  0%   { opacity: 0; transform: translateY(-10px); }
  10%  { opacity: 1; transform: translateY(0); }
  90%  { opacity: 1; }
  100% { opacity: 0; transform: translateY(-10px); }
}

.fa-bell {
 margin: 20px;
}
  </style>
  