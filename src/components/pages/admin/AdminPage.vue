<template>
    <div class="reset-database">
      <button @click="confirmReset" class="btn btn-danger">Réinitialiser la base de données</button>
      
      <!-- Fenêtre de confirmation -->
      <div v-if="showConfirmation" class="confirmation-modal">
        <div class="modal-content">
          <h3>Êtes-vous sûr de vouloir réinitialiser la base de données ?</h3>
          <p>Cette action supprimera toutes les données. Vous ne pourrez pas les récupérer.</p>
          <div class="modal-actions">
            <button @click="resetDatabase" class="btn btn-confirm">Oui, réinitialiser</button>
            <button @click="cancelReset" class="btn btn-cancel">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { resetDatabase } from '@/services/databaseService';
  
  export default {
    data() {
      return {
        showConfirmation: false, // Contrôle l'affichage de la fenêtre de confirmation
      };
    },
    methods: {
      // Affiche la fenêtre de confirmation
      confirmReset() {
        this.showConfirmation = true;
      },
      // Annule la réinitialisation
      cancelReset() {
        this.showConfirmation = false;
      },
      // Appelle la fonction pour réinitialiser la base de données
      async resetDatabase() {
        try {
          const response = await resetDatabase();
          this.showConfirmation = false; // Ferme la fenêtre de confirmation
          alert(response.message); // Affiche un message de succès
        } catch (error) {
          console.error('Erreur lors de la réinitialisation de la base de données:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-database {
    text-align: center;

    margin-top: 100px;
  }
  
  .confirmation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    text-align: center;
  }
  
  .modal-actions {
    margin-top: 20px;
  }
  
  button {
    margin: 5px;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .btn-danger {
    background-color: #d9534f;
    color: white;
    border-radius: 4px;
  }
  
  .btn-confirm {
    background-color: #EA8C1B;
    color: white;
    border-radius: 4px;

  }
  
  .btn-cancel {
    background-color: #5cb85c;
    color: white;
    border-radius: 4px;
  }
  </style>
  