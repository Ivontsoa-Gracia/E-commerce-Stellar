<template>
    <div class="container">
      <div class="formulaire">
        <AText 
          contenu="Veuillez remplir ses informations" 
          fontSize="26px"
          textColor="#2B5C7E"
          fontWeight="normal"
          fontFamily="sans-serif"
          textAlign="left"
          marginBottom="10px"
        />
        
        <form @submit.prevent="handleSubmit"> <!-- Assurez-vous que c'est handleSubmit et non handleClick -->
          <div class="input-group">
            <!-- Nom complet -->
            <AInput 
              class="input-from"
              v-model="nom"
              placeholder="Votre nom complet"
              borderColor="#AAAAAA"
              backgroundColor="white"
              borderRadius="4px"
              width="92%"
              height="20px"
              borderWidth="1px"
              fontSize="16px"
              textColor="black"
              keyboardType="text"
            />
            <span v-if="errors.nom" class="error-message">{{ errors.nom }}</span>
  
            <!-- Email -->
            <AInput 
              class="input-from"
              v-model="email"
              placeholder="Votre adresse email"
              borderColor="#AAAAAA"
              backgroundColor="white"
              borderRadius="4px"
              width="92%"
              height="20px"
              borderWidth="1px"
              fontSize="16px"
              textColor="black"
              keyboardType="email"
              @input="validateEmailInput"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
  
            <!-- Adresse -->
            <AInput 
              class="input-from"
              v-model="adresse"
              placeholder="Votre adresse"
              borderColor="#AAAAAA"
              backgroundColor="white"
              borderRadius="4px"
              width="92%"
              height="20px"
              borderWidth="1px"
              fontSize="16px"
              textColor="black"
              keyboardType="text"
            />
            <span v-if="errors.adresse" class="error-message">{{ errors.adresse }}</span>
  
            <!-- Ville -->
            <AInput 
              class="input-from"
              v-model="ville"
              placeholder="Votre ville"
              borderColor="#AAAAAA"
              backgroundColor="white"
              borderRadius="4px"
              width="92%"
              height="20px"
              borderWidth="1px"
              fontSize="16px"
              textColor="black"
              keyboardType="text"
            />
            <span v-if="errors.ville" class="error-message">{{ errors.ville }}</span>
          </div>
  
          <AButton 
            value="VALIDER" 
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
          />
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AInput from '@/components/atomes/AInput.vue';
  import AButton from '@/components/atomes/AButton.vue';
  import AText from '@/components/atomes/AText.vue';
  import { saveClient } from '@/services/clientService';
  
  export default {
    components: { AText, AInput, AButton },
    data() {
      return {
        nom: '',
        email: '',
        adresse: '',
        ville: '',
        errors: {
          nom: '',
          email: '',
          adresse: '',
          ville: ''
        }
      };
    },
    methods: {
      validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      },
      validateEmailInput() {
        this.errors.email = !this.email ? "L’adresse email est obligatoire." : this.validateEmail(this.email) ? "" : "L’adresse email n’est pas valide.";
      },
      validateForm() {
        this.errors.nom = this.nom ? '' : "Le nom complet est obligatoire.";
        this.errors.adresse = this.adresse ? '' : "L'adresse est obligatoire.";
        this.errors.ville = this.ville ? '' : "La ville est obligatoire.";
      },
      async handleSubmit() {
        this.validateEmailInput();
        this.validateForm();
  
        if (!Object.values(this.errors).some(error => error)) {
          try {
            const clientData = {
              nom: this.nom,
              email: this.email,
              adresse: this.adresse,
              ville: this.ville
            };
  
            // Démarrer la transaction
            await saveClient(clientData);
  
            console.log("✅ Authentifiation réussie !");
            this.$router.push("/auth"); // Rediriger vers une page de confirmation
          } catch (error) {
            console.error("Échec de la transaction:", error.message);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .formulaire {
    background: #ffffff;
    padding: 40px;
    border-radius: 4px;
  }
  
  .input-group {
    width: 100%;
  }
  
  .input-from {
    margin-top: 30px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
    font-family: sans-serif;
  }
  </style>
  