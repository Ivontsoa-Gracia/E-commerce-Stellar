<template>
    <div class="image-container">
      <img 
        :src="imageSrc" 
        :style="imageStyle" 
        alt="Custom Image"
        @click="handleClick"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      url: [String, Object],
      width: String,
      height: String,
      borderRadius: String,
      marginBottom: String,
      border: String,
    },
    computed: {
      imageSrc() {
        // Vérifie si l'URL est une chaîne de type HTTP(S)
        if (typeof this.url === "string" && (this.url.startsWith("http") || this.url.startsWith("https"))) {
          return this.url;
        }
        return this.url; // Peut être une image locale
      },
      imageStyle() {
        return {
          width: this.width,
          height: this.height,
          borderRadius: this.borderRadius,
          marginBottom: this.marginBottom,
          border: this.border,
          objectFit: "cover"
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .image-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  </style>
  