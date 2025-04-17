  <template>
    <button 
      :style="buttonStyle" 
      @click="onClick"
      class="a-button"
    >
      {{ value }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      value: String,
      borderColor: String,
      backgroundColor: String,
      borderRadius: String,
      width: String,
      height: String,
      textColor: String,
      borderWidth: String,
      fontSize: String,
      fontWeight: String,
      margin: String,
      fontFamily: String,
      marginTop: String,
    },
    computed: {
      buttonStyle() {
        return {
          borderColor: this.borderColor,
          backgroundColor: this.backgroundColor,
          borderRadius: this.borderRadius,
          width: this.width,
          height: this.height,
          color: this.textColor,
          borderWidth: this.borderWidth,
          fontSize: this.fontSize,
          fontWeight: this.fontWeight,
          margin: this.margin,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          borderStyle: "solid",
          cursor: "pointer",
          fontFamily: this.fontFamily,
          marginTop: this.marginTop,
        };
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  </script>
  
  <style scoped>
  .a-button {
    transition: all 0.3s ease;
  }
  .a-button:hover {
    opacity: 0.8;
  }
  </style>
  