<template>
    <p :style="textStyle">
      {{ contenu }}
    </p>
  </template>
  
  <script>
  export default {
    props: {
      contenu: String,
      fontSize: String,
      textColor: String,
      fontWeight: String,
      fontFamily: String,
      textAlign: String,
      marginBottom: String,
      lineHeight: String,
      marginTop: String,
    },
    computed: {
      textStyle() {
        return {
          color: this.textColor,
          fontSize: this.fontSize,
          fontWeight: this.fontWeight,
          fontFamily: this.fontFamily,
          textAlign: this.textAlign,
          marginBottom: this.marginBottom,
          lineHeight: this.lineHeight,
          marginTop: this.marginTop,
        };
      }
    }
  };
  </script>
  
  <style scoped>
  p {
    margin-bottom: 2px;
  }
  </style>
  