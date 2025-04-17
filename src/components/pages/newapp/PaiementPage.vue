<template>
    <div class="container">
      <div class="confirme-commande">
        <AText 
          contenu="Summary" 
          fontSize="26px"
          textColor="#2B5C7E"
          fontWeight="normal"
          fontFamily="sans-serif"
          textAlign="left"
        />
        <div class="tirer"></div>
  
        <div class="prix">
          <AText 
            class="prix-texte"
            contenu="Produits" 
            fontSize="16px"
            textColor="#131313"
            fontWeight="normal"
            fontFamily="sans-serif"
            textAlign="left"
          />
          <AText 
            class="prix-texte"
            :contenu="totalPrice + ' Ar'" 
            fontSize="20px"
            textColor="#131313"
            fontWeight="normal"
            fontFamily="sans-serif"
            textAlign="left"
          />
        </div>
  
        <div class="total">
          <AText 
            class="prix-texte"
            contenu="TOTAL" 
            fontSize="20px"
            textColor="#131313"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAlign="left"
          />
          <AText 
            class="prix-texte"
            :contenu="totalPrice + ' Ar'" 
            fontSize="20px"
            textColor="#131313"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAlign="left"
          />
        </div>
  
        <AButton 
          value="PAYER" 
          borderColor="#EA8C1B"
          backgroundColor="#EA8C1B"
          borderRadius="4px"
          width="94%"
          height="50px"
          textColor="white"
          borderWidth="2px"
          fontSize="16px"
          fontWeight="normal"
          fontFamily="PF DIN Text Pro"
          :style="{ letterSpacing: '1.7px' }"
          @click="paiement"
        />
      </div>
    </div>
  </template>
  
  <script>
  import AText from '@/components/atomes/AText.vue';
  import AImage from '@/components/atomes/AImage.vue';
  import AIcon from '@/components/atomes/AIcon.vue';
  import AButton from '@/components/atomes/AButton.vue';
  import { getCartItems, updateProductQuantity, removeProductFromCart } from '@/services/panierService.js';
  import AuthPage from './AuthPage.vue';
  import ModalPage from '@/components/pages/layouts/ModalPage.vue';
  
  export default {
    components: { AText, AImage, AIcon, AButton,  ModalPage, AuthPage },
    data() {
      return {
        cartItems: [],
        totalPrice: 0,
      };
    },
    methods: {
      openAuthModal() {
        this.$refs.authModal.openModal(); // Open the modal
      },
      increaseQuantity(id) {
        const item = this.cartItems.find(i => i.id === id);
        if (item) {
          item.quantity += 1;
          updateProductQuantity(id, item.quantity);
          this.calculateTotalPrice();
        }
      },
      decreaseQuantity(id) {
        const item = this.cartItems.find(i => i.id === id);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          updateProductQuantity(id, item.quantity);
          this.calculateTotalPrice();
        }
      },
      updateQuantity(id, quantity) {
        updateProductQuantity(id, quantity);
        this.calculateTotalPrice();
      },
      removeProduct(id) {
        removeProductFromCart(id);
        this.cartItems = getCartItems();
        this.calculateTotalPrice();
      },
      calculateTotalPrice() {
        this.totalPrice = this.cartItems.reduce((sum, item) => {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity);
            return sum + (isNaN(price) || isNaN(quantity) ? 0 : price * quantity);
        }, 0);

        this.totalPrice = this.totalPrice.toFixed(2);
      },

    },
    mounted() {
      this.cartItems = getCartItems();
      this.calculateTotalPrice();
    },
  };
  </script>
  
  <style scoped>
  /* Styles here */
  </style>
  
<style scoped>

.container {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 50px;
    background: #FAFAFA;

  }
.section-list-panier, .confirme-commande {
    /* flex: 1; */
    background: #FAFAFA;

}

.section-list-panier {
    width: 65%;
}

.confirme-commande {
    width: 25%;
}

.mini-card {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  gap: 10px;
  background: #FAFAFA;
  padding: 10px;
  border-bottom: 1px solid #131313; /* Bordure ajoutée */
}

.card-image {
    background: yellow;
    width: 100px;
    height: 100px;
    border-radius: 4px;

}

.card-description { 
    /* background: yellow; */
    width: 450px;
    height: 100px;            
    justify-content: center;    
    align-items: center;        
}

.card-quantity {
    width: 350px;
    height: 100px;     
    align-items: center;     
    display: flex; /* Ajout du flexbox pour l'alignement */
  align-items: center; /* Centrer verticalement */
  justify-content: center; /* Centrer horizontalement */   
}

.card-suppr {
  width: 180px;
  height: 100px;
  display: flex; /* Ajout du flexbox pour l'alignement */
  align-items: center; /* Centrer verticalement */
  justify-content: center; /* Centrer horizontalement */
}

.test {
    background: #FAFAFA;
    width: 55px;
    height: 55px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out; /* Transition pour un zoom fluide */
    align-items: center;
    justify-content: center;

}

.test:hover {
    transform: scale(1.1); /* Zoom sur l'élément au survol */
}

button {
    /* background: #FAFAFA; */
    margin-right: 10px;
    margin-left: 10px;
    width: 40px;
    height: 40px;
    font-size: 26px;
    color: #131313;
    border: none;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

}

.quantity-input {
    width: 70px;
    height: 40px;
    color: #131313;
    border: none;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    text-align: center;


}

.confirme-commande {
    overflow: hidden;
    border-radius: 4px;
    background: #ffffff;
    padding: 20px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    

}

/* .tirer {
    background: #AAAAAA;
    width: 100%;
    height: 1px;
    position: relative;  
    z-index: 10;   
    margin-top: 10px;  
    margin-bottom: 15px;   
} */

.prix {
  display: flex;
  justify-content: space-between;
  margin: auto;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #131313; /* Bordure ajoutée */
  margin-bottom: 20px;
}

.prix-texte {
    width: 50%;
    display: flex; /* Ajout du flexbox pour l'alignement */
    align-items: center; /* Centrer verticalement */
}

.total {
  display: flex;
  justify-content: space-between;
  margin: auto;
  gap: 10px;
  padding: 10px;
  margin-bottom: 30px;
  margin-top: -30px;
}
</style>