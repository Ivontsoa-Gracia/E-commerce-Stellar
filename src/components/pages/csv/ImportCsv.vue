<template>
    <div class="container">
      <AText 
        contenu="Importer des fichiers CSV" 
        fontSize="29px"
        fontWeight="bold"
        textColor="#333"
        textAlign="center"
        marginBottom="20px"
      />
  
      <input 
        type="file" 
        multiple 
        accept=".csv"
        @change="handleFileUpload"
        class="file-input"
      />
  
      <ul v-if="selectedFiles.length > 0" class="file-list">
        <li v-for="(file, index) in selectedFiles" :key="index">
          <AIcon 
            :url="iconImport"
            width="20px"
            height="20px"
            borderRadiusIcon="50%"
            widthback="30px"
            heightBack="30px"
            borderColor="#4CAF50"
            backgroundColor="#E8F5E9"
          />
          {{ file.name }}
          <button @click="removeFile(index)" class="remove-btn">❌</button>
        </li>
      </ul>
  
      <AButton 
        value="Valider l'importation"
        backgroundColor="#4CAF50"
        textColor="#fff"
        borderRadius="5px"
        width="100%"
        height="45px"
        fontSize="16px"
        fontWeight="bold"
        borderWidth="0"
        margin="20px 0"
        @click="submitFiles"
      />
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import AText from "@/components/atomes/AText.vue";
  import AButton from "@/components/atomes/AButton.vue";
  import AIcon from "@/components/atomes/AIcon.vue";
  import { handleFilesUpload } from "@/services/importService.js"; // Importation du service
  
  export default {
    components: { AText, AButton, AIcon },
    setup() {
      const selectedFiles = ref([]);
      const iconImport = "/icones/import.png";
  
      /**
       * 📤 Supprimer un fichier de la liste
       * @param {number} index - Index du fichier à supprimer
       */
      const removeFile = (index) => {
        selectedFiles.value.splice(index, 1);
      };
  
      /**
       * 📤 Soumettre les fichiers sélectionnés pour l'importation
       */
      const submitFiles = async () => {
        if (selectedFiles.value.length === 0) {
          alert("Veuillez sélectionner au moins un fichier CSV.");
          return;
        }
  
        try {
          // Appel du service pour traiter les fichiers CSV
          await handleFilesUpload(selectedFiles.value);
  
          console.log("Importation réussie !");
          alert("Importation réussie !");
          selectedFiles.value = []; // Réinitialiser la liste des fichiers après importation
        } catch (error) {
          console.error("Erreur lors de l'importation :", error);
          alert("Erreur lors de l'importation !");
        }
      };
  
      /**
       * 📤 Gérer l'événement de téléchargement des fichiers
       * @param {Event} event - L'événement de changement
       */
      const handleFileUpload = (event) => {
        // Ajoute les nouveaux fichiers à la liste existante sans les remplacer
        selectedFiles.value = [...selectedFiles.value, ...Array.from(event.target.files)];
      };
  
      return { selectedFiles, handleFileUpload, removeFile, submitFiles, iconImport };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  
  .file-input {
    width: 100%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 15px;
  }
  
  .file-list {
    list-style: none;
    padding: 0;
  }
  
  .file-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 5px 0;
    justify-content: space-between;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 16px;
  }
  </style>
  