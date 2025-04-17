<template>
    <div class="container">
        <div class="concept">
            <div class="image-container" 
                @mouseover="hoverText = 'legere'" 
                @mouseleave="hoverText = ''"
            >
                <AImage 
                    :url="image1"
                    class="image"
                    :class="{ zoom: hoverText === 'legere' }"
                    width="100%"
                    height="314px"
                />
                <div class="overlay">
                    <AText 
                        contenu="LÉGÈRETÉ" 
                        fontSize="36px" 
                        textColor="#FAFAFA" 
                        fontWeight="bold" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                    <AText v-if="hoverText === 'legere'" 
                        contenu="Fabriqué avec une fibre de carbone ultra-légère, ce vélo permet une grande maniabilité et une meilleure performance." 
                        fontSize="16px" 
                        textColor="#FAFAFA" 
                        fontWeight="normal" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                </div>
            </div>

            <div class="image-container" 
                @mouseover="hoverText = 'robuste'" 
                @mouseleave="hoverText = ''"
            >
                <AImage 
                    :url="image2"
                    class="image"
                    :class="{ zoom: hoverText === 'robuste' }"
                    width="100%"
                    height="314px"
                />
                <div class="overlay">
                    <AText 
                        contenu="ROBUSTESSE" 
                        fontSize="36px" 
                        textColor="#FAFAFA" 
                        fontWeight="bold" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                    <AText v-if="hoverText === 'robuste'" 
                        contenu="Très résistant aux chocs, il est conçu pour résister aux terrains les plus difficiles." 
                        fontSize="16px" 
                        textColor="#FAFAFA" 
                        fontWeight="normal" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                </div>
            </div>

            <div class="image-container" 
                @mouseover="hoverText = 'puissant'" 
                @mouseleave="hoverText = ''"
            >
                <AImage 
                    :url="image3"
                    class="image"
                    :class="{ zoom: hoverText === 'puissant' }"
                    width="100%"
                    height="314px"
                />
                <div class="overlay">
                    <AText 
                        contenu="PUISSANCE" 
                        fontSize="36px" 
                        textColor="#FAFAFA" 
                        fontWeight="bold" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                    <AText v-if="hoverText === 'puissant'" 
                        contenu="Grâce à sa nouvelle technologie de vitesse, il est 15% plus rapide que les autres vélos de la même catégorie." 
                        fontSize="16px" 
                        textColor="#FAFAFA" 
                        fontWeight="normal" 
                        fontFamily="sans-serif" 
                        textAlign="center" 
                        marginBottom="10px" 
                        lineHeight="1.5" 
                    />
                </div>
            </div>
        </div>

        <div class="explaination">
            <AText 
                contenu="STELLAR s'impose comme une référence du vélo tout-terrain. Conçue pour les passionnés de vitesse et d'adrénaline, la marque repousse les limites avec des technologies de pointe et des designs révolutionnaires." 
                fontSize="18px"
                textColor="#131313"
                fontWeight="300"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="20px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Chaque vélo STELLAR est un concentré d'innovation, combinant matériaux ultramodernes, ingénierie avancée et ergonomie optimisée. Destinés aux cyclistes exigeants, ils garantissent une expérience incomparable, sur route comme sur les sentiers les plus extrêmes." 
                fontSize="18px"
                textColor="#131313"
                fontWeight="300"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="20px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Avec le Stellar Z, la marque dévoile son chef-d'œuvre : un vélo ultra-léger et ultra-performant. Sa conception en fibre de carbone, son système de transmission électronique et sa suspension haute précision offrent une puissance et une réactivité exceptionnelles. Idéal pour ceux qui veulent aller plus vite, plus loin, sans compromis." 
                fontSize="18px"
                textColor="#131313"
                fontWeight="300"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="50px"
                lineHeight="1.5"
            />
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
      image1: "/images/image1.png",
      image2: "/images/image2.png",
      image3: "/images/image3.png",
      hoverText: ""
    };
  }
};
</script>

<style scoped>
.container {
    background: #FAFAFA;
}
.concept {
    display: flex;
    width: 100vw;
    max-width: 100%;
    gap: 0px;
    overflow: hidden;
}

.image-container {
    position: relative;
    width: 33vw;
    height: 314px;
    text-align: center;
    overflow: hidden;  /* Ajout pour ne pas laisser l'image déborder lors du zoom */
    opacity: 0;
    animation: fade-in-left 0.8s ease-out forwards;
}

.image-container:nth-child(1) { animation-delay: 0.4s; }
.image-container:nth-child(2) { animation-delay: 0.2s; }
.image-container:nth-child(3) { animation-delay: 0s; }

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;
    filter: brightness(76%);
}

.zoom {
    transform: scale(1.2);  /* Zoom intérieur lors du survol */
    filter: brightness(65%);
}

.overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    color: white;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding: 0px 50px;
}


.explaination {
    padding: 25px 100px;
    opacity: 0; /* Début caché */
    animation: fade-in-left 0.8s ease-out forwards;
    animation-delay: 0.6s; /* Décalage après les images */
}

@keyframes fade-in-left {
    from {
        opacity: 0;
        transform: translateX(-50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

</style>

