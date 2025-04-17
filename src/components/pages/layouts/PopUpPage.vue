<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot />
      <button class="close-button" @click="closeModal">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue';

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}

defineExpose({ openModal, closeModal });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.6);
  backdrop-filter: blur(10px); /* flou */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
  padding: 40px;
}

.modal-content {
    margin-top: -80px;
  /* background: #ffffff; */
  /* padding: 30px; */
  border-radius: 10px;
  position: relative;
  /* max-width: 700px; */
  width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.4s ease;
  margin-left: -100px;
}

.close-button {
  position: absolute;
  top: 12px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #fafafa;
}

@keyframes fadeIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
