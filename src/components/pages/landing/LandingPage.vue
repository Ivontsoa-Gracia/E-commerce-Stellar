<template>
    <AcceuilPage />
    <ConceptPage />
    <CaracteristiquePage />
    <VideoPage />
    <ProduitPage />
    <ContactPage />
    <FooterPage />
</template>

<script>

import AcceuilPage from "./AcceuilPage.vue"; 
import ConceptPage from "./ConceptPage.vue";
import CaracteristiquePage from "./CaracteristiquePage.vue";
import VideoPage from "./VideoPage.vue";
import ProduitPage from "./ProduitPage.vue";
import ContactPage from "./ContactPage.vue";
import FooterPage from "./FooterPage.vue";


export default {
    components: { 
        AcceuilPage, 
        ConceptPage, 
        CaracteristiquePage, 
        VideoPage, 
        ProduitPage, 
        ContactPage, 
        FooterPage 
    }
};
</script>

<style scoped>
/* Ajoute des styles spécifiques si nécessaire */
</style>
