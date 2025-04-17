<template>
    <div class="container-modal">
        <div class="modal-container">
            <div class="grid">

            </div>
            <div class="grid">
                <div class="form">
                    <AText 
                        contenu="RENDEZ-VOUS" 
                        fontSize="32px"
                        textColor="#fafafa"
                        fontWeight="600"
                        fontFamily="sans-serif"
                        lineHeight="1.5"
                    />
                    <AText 
                        contenu="Prêt à essayer le Stellar Z ? Réservez votre essai en magasin !" 
                        fontSize="16px"
                        textColor="#fafafa"
                        fontWeight="normal"
                        fontFamily="sans-serif"
                        marginBottom="12px"
                        marginTop="-8px"
                        lineHeight="1.5"
                    />
                    <AInput 
                        class="input-from"
                        v-model="inputValue"
                        placeholder="Nom complet"
                        borderColor="#fafafa"
                        borderRadius="4px"
                        width="94%"
                        height="20px"
                        borderWidth="1px"
                        fontSize="16px"
                        textColor="#fafafa"
                        secureTextEntry="false"
                        keyboardType="text"
                    />
                    <AInput 
                        class="input-from"  
                        v-model="inputValue"
                        placeholder="Adresse mail"
                        borderColor="#fafafa"
                        borderRadius="4px"
                        width="94%"
                        height="20px"
                        borderWidth="1px"
                        fontSize="16px"
                        textColor="#fafafa"
                        secureTextEntry="false"
                        keyboardType="text"
                    />
                    <AInput 
                        class="input-from"  
                        v-model="inputValue"
                        placeholder="Numéro de téléphone"
                        borderColor="#fafafa"
                        borderRadius="4px"
                        width="94%"
                        height="20px"
                        borderWidth="1px"
                        fontSize="16px"
                        textColor="#fafafa"
                        secureTextEntry="false"
                        keyboardType="text"
                    />
                    
                </div>
            </div>
            <div class="grid">
                <div class="form">
                    <div class="banga">

                    </div>
                    <AInput 
                        class="input-from"  
                        v-model="inputValue"
                        placeholder="Numéro de téléphone"
                        borderColor="#fafafa"
                        borderRadius="4px"
                        width="94%"
                        height="20px"
                        borderWidth="1px"
                        fontSize="16px"
                        textColor="#fafafa"
                        secureTextEntry="false"
                        keyboardType="date"
                    />
                    
                    <AInput 
                        class="input-from"
                        v-model="inputValue"
                        placeholder="Message"
                        borderColor="#fafafa"
                        borderRadius="4px"
                        width="94%"
                        height="82px"
                        borderWidth="1px"
                        fontSize="16px"
                        textColor="#fafafa"
                        secureTextEntry="false"
                        keyboardType="text"
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
                        :style="{ letterSpacing: '1.7px', marginTop: '30px' }"
                        @click="handleClick"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AText from '@/components/atomes/AText.vue';
import AInput from '@/components/atomes/AInput.vue';
import AButton from '@/components/atomes/AButton.vue';
// import AIcon from '@/components/atomes/AIcon.vue';

export default {
  components: { AText, AInput, AButton },
};
</script>
<style scoped>
.container-modal{
    display: flex;
    align-items: center;
    justify-content: center;

}

.modal-container{
    background: url('http://localhost:8080/images/background-popup2.png') no-repeat center/cover, 
                linear-gradient(90deg, #000000, #131313);
    background-blend-mode: normal;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 40px;
    width: 75%;
}
.grid {
    width: 30%;
    height: 420px;
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    padding: 20px;
}

.form {

    width: 100%;
}

.input-group {
    width: 100%;
  }

  .input-from {
    margin-top: 20px;
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
  .banga {
    width: 100%;
    height: 122px;
  }
</style>