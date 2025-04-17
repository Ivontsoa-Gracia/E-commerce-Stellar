<template>
    <div class="icon-container">
      <button 
        class="icon-button"
        :style="buttonStyle"
        @click="onClick"
      >
        <img 
          :src="imageSrc" 
          :style="imageStyle"
          alt="Icon"
        />
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      url: String, // URL de l'image
      width: String,
      height: String,
      borderColor: String,
      backgroundColor: String,
      borderRadius: String, // Pour le bouton
      borderRadiusIcon: String, // Pour l'image
      widthback: String, // Largeur du bouton
      heightBack: String, // Hauteur du bouton
      borderWidth: String,
      color: String,
    },
    computed: {
      imageSrc() {
        return this.url; // Peut être une URL en ligne ou locale
      },
      buttonStyle() {
        return {
          borderColor: this.borderColor,
          backgroundColor: this.backgroundColor,
          borderRadius: this.borderRadius,
          width: this.widthback,
          height: this.heightBack,
          borderWidth: this.borderWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          borderStyle: "solid",
          cursor: "pointer",
          color: this.color,
        };
      },
      imageStyle() {
        return {
          width: this.width,
          height: this.height,
          borderRadius: this.borderRadiusIcon,
          objectFit: "cover"
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .icon-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .icon-button:hover {
    opacity: 0.8;
  }
  </style>
  