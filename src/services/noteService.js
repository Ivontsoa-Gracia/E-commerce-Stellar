import axios from 'axios';

// URL de base de l'API Dolibarr
const API_URL = "http://localhost/dolibarr/htdocs/api/index.php/products";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L";

export async function setNote(productId, valeurNote) {
    try {
        const payloadOrder = {
            array_options: {
                options_notep: valeurNote,
            }    
        };
    
          const config = {
            headers: {
              "DOLAPIKEY": API_KEY,
              "Content-Type": "application/json",
            },
          };
      
          const orderResponse = await axios.put(`${API_URL}/${productId}`, payloadOrder, config);
      
          if (orderResponse.status !== 200) {
            throw new Error(`Erreur lors de la création de la commande : ${orderResponse.statusText}`);
          }
        } catch (error) {
            if (error.response) {
              console.error(`Erreur du serveur (HTTP ${error.response.status}) :`, error.response.data);
            } else if (error.request) {
              console.error("Aucune réponse du serveur :", error.request);
            } else {
              console.error("Erreur lors de la requête :", error.message);
            }
            return null;
         }

}


const calculeMoyenneNote(valeurNote) {
    
}