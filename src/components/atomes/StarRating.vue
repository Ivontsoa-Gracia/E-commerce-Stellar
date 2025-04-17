<template>
    <div class="star-rating">
      <div
        v-for="n in 5"
        :key="n"
        class="star"
        :class="{ filled: n <= convertedNote }"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StarRating',
    props: {
      note: {
        type: [Number, String],
        required: true,
      },
    },
    computed: {
      convertedNote() {
        const numericNote = parseFloat(this.note);
        return Math.round((numericNote / 10) * 5);
      }
    }
  }
  </script>
  
  <style scoped>
  .star-rating {
    display: flex;
    gap: 6px;
  }
  
  .star {
    width: 20px;
    height: 20px;
    background-color: #d3d3d3; /* couleur pour étoiles vides */
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    transition: background-color 0.3s;
  }
  
  .star.filled {
    background-color: #EA8C1B; /* couleur pour étoiles remplies */
  }
  </style>
  