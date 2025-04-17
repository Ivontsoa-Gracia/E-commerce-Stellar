<template>
    <div class="container">
        <div class="marque">
            <AImage 
                :url="imageHero"
                width="90%"
                height="auto"
            />
            <AText 
                contenu="Domptez chaque terrain, surpassez-vous." 
                fontSize="20px"
                textColor="#FAFAFA"
                fontWeight="italic"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="3px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Conçu pour les passionnés de vitesse et d’adrénaline, il s’adresse à une génération audacieuse en quête de performance et de technologie." 
                fontSize="14px"
                textColor="#FAFAFA"
                fontWeight="300"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="50px"
                lineHeight="1.5"
            />
            <div class="coordonnees">
                <AIcon 
                    class="test"
                    url="/icones/i2.png"
                    width="100%"
                    height="100%"
                    borderColor="#EA8C1B"
                    backgroundColor="#EA8C1B"
                    borderRadius="15px"
                    borderRadiusIcon="10px"
                    widthback="50px"
                    heightBack="50px"
                    borderWidth="2px"
                />
                <div class="cont">
                    <AText 
                        contenu="+261 34 23 30 349 12" 
                        fontSize="16px"
                        textColor="#FAFAFA"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        :class="{ marginTop: '-10px' }"
                    />
                </div>
            </div>
        </div>
        <div class="navigation">
            <AText 
                contenu="Navigation" 
                fontSize="26px"
                textColor="#FAFAFA"
                fontWeight="normal"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="20px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Accueil" 
                fontSize="18px"
                textColor="#FAFAFA"
                fontWeight="normal"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="-5px"
                lineHeight="1.5"
            />
            <AText 
                contenu="A propos" 
                fontSize="18px"
                textColor="#FAFAFA"
                fontWeight="normal"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="-5px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Produits" 
                fontSize="18px"
                textColor="#FAFAFA"
                fontWeight="normal"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="-5px"
                lineHeight="1.5"
            />
            <AText 
                contenu="Contact" 
                fontSize="18px"
                textColor="#FAFAFA"
                fontWeight="normal"
                fontFamily="PF DIN Text Pro"
                textAlign="left"
                marginBottom="-5px"
                lineHeight="1.5"
            />

            <div class="lien">
                <AIcon 
                    class="test"
                    url="/icones/i8.png"
                    width="100%"
                    height="100%"
                    borderColor="#EA8C1B"
                    backgroundColor="#EA8C1B"
                    borderRadius="15px"
                    borderRadiusIcon="10px"
                    widthback="50px"
                    heightBack="50px"
                    borderWidth="2px"
                />
                <AIcon 
                    class="test"
                    url="/icones/i7.png"
                    width="100%"
                    height="100%"
                    borderColor="#EA8C1B"
                    backgroundColor="#EA8C1B"
                    borderRadius="15px"
                    borderRadiusIcon="10px"
                    widthback="50px"
                    heightBack="50px"
                    borderWidth="2px"
                />
            </div>
        </div>
        <div class="footer-image">
            <AImage 
                :url="imageFooter"
                width="85%"
                height="85%"
            />
        </div>
    </div>
</template>

<script>
import AText from '@/components/atomes/AText.vue';
import AImage from '@/components/atomes/AImage.vue';
import AIcon from '@/components/atomes/AIcon.vue';


export default {
    components: { AText, AImage, AIcon },
    data() {
        return {
            imageHero: '/logo/stellarz2.png',
            imageFooter: '/images/bike3.png' // Remplace par ton image réelle
        };
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    background: #131313;
    overflow: hidden;
    height: 521px;
    gap: 50px;
    padding: 30px 0px

}

.marque, .navigation {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    position: relative;  /* Nécessaire pour appliquer le z-index */
    z-index: 10; 
    opacity: 0; /* Initialement invisible */
    transform: translateX(100px); /* Décalé à gauche */
    animation: slideInRight 0.5s forwards;
    animation-delay: 1s; /* Retard pour les coordonnées */
    margin-top: 80px;


}

.marque {
    margin-left: 100px;    

}

.navigation {
    margin-right: -200px;
    padding: 0px 0px 0px 60px;
 }

.footer-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -190px;
    margin-top: -5px;
    opacity: 0.39;
    transform: translateX(800px); /* Décalé à gauche */
    animation: slideInRight 0.5s forwards;
    animation-delay: 0.9s; /* Retard pour les coordonnées */
}

.test {
    background: #EA8C1B;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out; /* Transition pour un zoom fluide */
}

.test:hover {
    transform: scale(1.1); /* Zoom sur l'élément au survol */
}


.lien {
    display:  flex;
    gap: 10px;
    margin-top: 100px;
    margin-bottom: 50px;
    opacity: 0; /* Initialement invisible */
    transform: translateX(100px); /* Décalé à gauche */
    animation: slideInRight 0.5s forwards;
    animation-delay: 1.6s; /* Retard pour les coordonnées */
}

.cont {
    margin-top: -10px;
}

.coordonnees {
    display: flex;
    align-items: center; /* Alignement vertical */
    gap: 30px; /* Espacement entre l'icône et le texte */
    margin-bottom: 30px;
    margin-top: 50px;
    opacity: 0; /* Initialement invisible */
    transform: translateX(100px); /* Décalé à gauche */
    animation: slideInRight 0.5s forwards;
    animation-delay: 1.5s; /* Retard pour les coordonnées */

  }

  @keyframes slideInRight {
    0% {
        transform: translateX(100px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.navigation .marque {
    animation-delay: 1s; /* Retard pour la marque après l'image */
}

.navigation .coordonnees {
    animation-delay: 2s; /* Retard pour les coordonnées */
}
</style>
