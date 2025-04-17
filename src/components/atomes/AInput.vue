<template>
    <div 
      class="input-container" 
      :style="containerStyle"
    >
      <input 
        :type="secureTextEntry ? 'password' : keyboardType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :style="inputStyle"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String, // Utilisé pour v-model
      placeholder: String,
      borderColor: String,
      backgroundColor: String,
      borderRadius: String,
      width: String,
      height: String,
      borderWidth: String,
      fontSize: String,
      textColor: String,
      secureTextEntry: Boolean, // Mode mot de passe
      keyboardType: String // Type de clavier (email, number, text, etc.)
    },
    computed: {
      containerStyle() {
        return {
          borderColor: this.borderColor,
          backgroundColor: this.backgroundColor,
          borderRadius: this.borderRadius,
          width: this.width,
          height: this.height,
          borderWidth: this.borderWidth,
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderStyle: "solid",
        };
      },
      inputStyle() {
        return {
          fontSize: this.fontSize,
          color: this.textColor,
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .input-container {
    display: flex;
    justify-content: center;
  }
  </style>
  