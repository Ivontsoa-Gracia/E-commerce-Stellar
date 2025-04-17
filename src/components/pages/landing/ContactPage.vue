<template>
    <div class="container">
      <div class="text-header slide-in-right">
        <AText 
          contenu="CONTACTEZ-NOUS" 
          fontSize="32px"
          textColor="#1962AC"
          fontWeight="normal"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="10px"
          lineHeight="1.5"
        />
        <AText 
          contenu="Une question, un besoin ou juste envie d’échanger ? Notre équipe est là pour vous répondre avec plaisir !" 
          fontSize="15px"
          textColor="#131313"
          fontWeight="300"
          fontFamily="sans-serif"
          textAlign="center"
          marginBottom="50px"
          lineHeight="1.5"
        />
      </div>
  
      <div class="contact">
        <div class="affiche-contact slide-in-right">
          <AText 
            contenu="Entrer en contact" 
            fontSize="26px"
            textColor="#2B5C7E"
            fontWeight="normal"
            fontFamily="sans-serif"
            textAlign="left"
            marginBottom="10px"
          />
          <AText 
            contenu="Ne restez pas avec vos questions ! Contactez-nous et nous vous répondrons rapidement." 
            fontSize="15px"
            textColor="#131313"
            fontWeight="300"
            fontFamily="sans-serif"
            marginBottom="50px"
            lineHeight="1.5"
          />
          
          <div class="affiche">
            <div class="coordonnees">
                <AIcon 
                    class="test"
                    url="/icones/i1.png"
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
                        contenu="Lieu de vente" 
                        fontSize="18px"
                        textColor="#2B5C7E"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        marginBottom="-12px"

                    />
                    <AText 
                        contenu="Antananarivo 101, Madagascar" 
                        fontSize="16px"
                        textColor="#131313"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        :class="{ marginTop: '-10px' }"
                    />
                </div>

            </div>
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
                        contenu="Numéro de téléphone" 
                        fontSize="18px"
                        textColor="#2B5C7E"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        marginBottom="-12px"

                    />
                    <AText 
                        contenu="+261 34 23 30 349 12" 
                        fontSize="16px"
                        textColor="#131313"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        :class="{ marginTop: '-10px' }"
                    />
                </div>
            </div>
            <div class="coordonnees">
                <AIcon 
                    class="test"
                    url="/icones/i3.png"
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
                        contenu="Email" 
                        fontSize="18px"
                        textColor="#2B5C7E"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        marginBottom="-12px"

                    />
                    <AText 
                        contenu="stellaz.bike@gmail.com" 
                        fontSize="16px"
                        textColor="#131313"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        textAlign="left"
                        :class="{ marginTop: '-10px' }"
                    />
                </div>
            </div>
          </div>
          <div class="tirer"></div>

          <div class="liens">
            <AText 
                contenu="Entrer en contact" 
                fontSize="26px"
                textColor="#2B5C7E"
                fontWeight="normal"
                fontFamily="sans-serif"
                textAlign="left"
                marginBottom="10px"
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
         
        </div>
  
        <div class="formulaire-contact slide-in-right">
            <div class="formulaire">
                <AText 
                    contenu="Envoyer un message" 
                    fontSize="26px"
                    textColor="#2B5C7E"
                    fontWeight="normal"
                    fontFamily="sans-serif"
                    textAlign="left"
                    marginBottom="10px"
                />
                
                <form>
                    <div class="input-group">
                        <AInput 
                            class="input-from"
                            v-model="inputValue"
                            placeholder="Nom complet"
                            borderColor="#AAAAAA"
                            backgroundColor="white"
                            borderRadius="4px"
                            width="92%"
                            height="20px"
                            borderWidth="1px"
                            fontSize="16px"
                            textColor="black"
                            secureTextEntry="false"
                            keyboardType="text"
                        />
                        <AInput 
                            class="input-from"  
                            v-model="inputValue"
                            placeholder="Adresse mail"
                            borderColor="#AAAAAA"
                            backgroundColor="white"
                            borderRadius="4px"
                            width="92%"
                            height="20px"
                            borderWidth="1px"
                            fontSize="16px"
                            textColor="black"
                            secureTextEntry="false"
                            keyboardType="text"
                        />
                        <AInput 
                            class="input-from"
                            v-model="inputValue"
                            placeholder="Message"
                            borderColor="#AAAAAA"
                            backgroundColor="white"
                            borderRadius="4px"
                            width="92%"
                            height="60px"
                            borderWidth="1px"
                            fontSize="16px"
                            textColor="black"
                            secureTextEntry="false"
                            keyboardType="text"
                        />
                    </div>
                    <AText 
                        contenu="Nous sommes là pour vous aider, n’hésitez pas à nous écrire !" 
                        fontSize="14px"
                        textColor="#131313"
                        fontWeight="300"
                        fontFamily="sans-serif"
                        marginBottom="12px"
                        lineHeight="1.5"
                    />
                    <AButton 
                        value="ENVOYER" 
                        borderColor="#EA8C1B"
                        backgroundColor="#EA8C1B"
                        borderRadius="4px"
                        width="100%"
                        height="50px"
                        textColor="white"
                        borderWidth="2px"
                        fontSize="16px"
                        fontWeight="normal"
                        fontFamily="PF DIN Text Pro"
                        :style="{ letterSpacing: '1.7px' }"
                        @click="handleClick"
                    />
                </form>
            </div>
        </div>
      </div>
      <div class="map slide-in-right">

      </div>
    </div>
  </template>
  
  <script>
  import AText from '@/components/atomes/AText.vue';
  import AInput from '@/components/atomes/AInput.vue';
  import AButton from '@/components/atomes/AButton.vue';
  import AIcon from '@/components/atomes/AIcon.vue';
  
  export default {
    components: { AText, AInput, AButton, AIcon },
  };
  </script>
  
  <style scoped>

  .cont {
    margin-top: -10px;
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

  .text-header {
    text-align: center;
    width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .contact {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 50px;
    background: #FAFAFA;

  }
  
  .affiche-contact, .formulaire-contact {
    flex: 1; /* Divise l'espace en deux parties égales */
  }
  
  .affiche-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 100px;
    margin-bottom: 200px;
  }
  
  .coordonnees {
    display: flex;
    align-items: center; /* Alignement vertical */
    gap: 30px; /* Espacement entre l'icône et le texte */
    margin-bottom: 20px;

  }

  .tirer {
    background: #AAAAAA;
    width: 440px;
    height: 1px;
    position: relative;  
    z-index: 10;   
    margin-top: 30px;  
    margin-bottom: 15px;   
    }

    .lien {
        display:  flex;
        gap: 10px;
    }
  .formulaire-contact {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 100px;
  }
  
  .formulaire {
    background: #ffffff;
    padding: 40px;
    border-radius: 4px;
  }
  .input-group {
    width: 100%;
  }

  .input-from {
    background: red;
    margin-top: 30px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
    height: 150px;
  }
  
  .map {
    /* background: red; */
    background: url('http://localhost:8080/images/map.png') no-repeat center/cover;

    height: 260px;
    width: 85%;
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    margin-top: -130px;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    .contact {
      flex-direction: column;
      align-items: center;
    }
  
    .affiche-contact, .formulaire-contact {
      margin-bottom: 20px;
    }
  }

  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    animation: slideInRight 0.8s ease-out forwards;
  }
  
  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  </style>
  