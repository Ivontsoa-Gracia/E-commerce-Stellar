<template>
    <div class="container">
        <!-- Section Images -->
        <div class="section-image">
            <AImage 
                :url="image1"
                class="image-principale"
                :class="{ zoom: hoverText === 'legere' }"
                width="80%"
                height="auto"
            />
            <div class="sub-images">
                <div class="imgcont">
                    <AImage 
                        :url="image2"
                        class="image"
                        width="100%"
                        height="auto"
                    />
                </div>
                <div class="imgcont">
                    <AImage 
                        :url="image3"
                        class="image"
                        width="100%"
                        height="auto"
                    />
                </div>
                <div class="imgcont">
                    <AImage 
                        :url="image4"
                        class="image"
                        width="100%"
                        height="auto"
                    />
                </div>
            </div>
        </div>

        <!-- Section Caractéristiques -->
        <div class="section-caracteristique">
            <AImage 
                :url="image5"
                class="image-principale"
                width="460px"
                height="auto"
            />
            <AText 
                contenu="Conçu pour les passionnés de vitesse et d’adrénaline, il s’adresse à une génération audacieuse en quête de performance et de technologie."
                fontSize="18px"
                textColor="#131313"
                fontWeight="300"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="10px"
                lineHeight="1.5"
            />
            <div class="caracteristique">
                <div class="item">
                    <div class="icon-text">
                        <AImage 
                            :url="icon1"
                            class="image"
                            width="30%"
                            height="auto"
                        />
                        <div class="text-content">
                            <AText 
                                contenu="Ultra-légèreté & Robustesse"
                                fontSize="22px"
                                textColor="#131313"
                                fontWeight="bold"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.2"
                            />
                            <AText 
                                contenu="Fibre de carbone, aluminium forgé, titane, nanotubes de carbone – poids réduit à 5 kg."
                                fontSize="15px"
                                textColor="#131313"
                                fontWeight="300"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.5"
                            />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="icon-text">
                        <AImage 
                            :url="icon2"
                            class="image"
                            width="30%"
                            height="auto"
                        />
                        <div class="text-content">
                            <AText 
                                contenu="Performance & Technologie"
                                fontSize="22px"
                                textColor="#131313"
                                fontWeight="bold"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.2"
                            />
                            <AText 
                                contenu="Transmission électronique 12 vitesses, freins à disques hydrauliques, vitesse augmentée de 15 %."
                                fontSize="15px"
                                textColor="#131313"
                                fontWeight="300"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.5"
                            />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="icon-text">
                        <AImage 
                            :url="icon3"
                            class="image"
                            width="30%"
                            height="auto"
                        />
                        <div class="text-content">
                            <AText 
                                contenu="Confort & Adaptabilité"
                                fontSize="22px"
                                textColor="#131313"
                                fontWeight="bold"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.2"
                            />
                            <AText 
                                contenu="Amortisseur pneumatique ajustable, pneus tubeless, géométrie modulable, guidon ergonomique."
                                fontSize="15px"
                                textColor="#131313"
                                fontWeight="300"
                                fontFamily="sans-serif"
                                textAlign="left"
                                lineHeight="1.5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AImage from '@/components/atomes/AImage.vue';
import AText from '@/components/atomes/AText.vue';

export default {
  components: { AImage, AText },
  data() {
    return {
      image1: "/images/bike0.png",
      image2: "/images/p1.png",
      image3: "/images/p2.png",
      image4: "/images/p3.png",
      image5: "/logo/stellarz.png",
      icon1: "/icones/i4.png",
      icon2: "/icones/i5.png",
      icon3: "/icones/i6.png",
      hoverText: ""
    };
  }
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    width: 100vw;
    max-width: 1200px;
    margin: auto;
    gap: 50px;
    background: #FAFAFA;
    padding: 50px 0px;
}

.section-image, .section-caracteristique {
    flex-grow: 1;
    width: 50%;
    opacity: 0;
    transform: translateX(100px);
    animation: slideIn 1s forwards;
}

.section-image {
    animation-delay: 0s;
}

.section-image .image-principale {
    margin-bottom: 50px;
}

.section-caracteristique {
    animation-delay: 0.5s;
    padding: 20px;
    align-items: flex-start;  
    gap: 20px;
}

.section-caracteristique .image-principale{
    margin-bottom: 50px;
}

/* Animation pour l'entrée de chaque item */
.caracteristique .item {
    opacity: 0;
    transform: translateX(100px);
    animation: slideUp 0.5s forwards;
}

.caracteristique .item:nth-child(1) {
    animation-delay: 1s;
}

.caracteristique .item:nth-child(2) {
    animation-delay: 1.5s;
}

.caracteristique .item:nth-child(3) {
    animation-delay: 2s;
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.sub-images {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;
    gap: 20px;
}

.sub-images .imgcont {
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
}

.sub-images .image {
    width: 100%;
    height: auto;
    transition: transform 0.3s ease;
}

.sub-images .imgcont:hover .image {
    transform: scale(1.2);
}

.imgcont{
    border: 1px solid #EA8C1B;
}

.image {
    width: 32%;
    height: auto;
}

.icon-text {
    display: flex;
    align-items: center; 
}

.text-content {
    display: flex;
    flex-direction: column;
    flex: 1; 
}

@media (max-width: 900px) {
    .container {
        flex-direction: column;
        align-items: center;
    }

    .section-image, .section-caracteristique {
        width: 100%;
        max-width: 100%;
        flex-grow: 0;
    }

    .caracteristique {
        width: 100%;
    }

    .image {
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>
