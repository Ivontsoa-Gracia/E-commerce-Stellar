import axios from 'axios';

// URL de base de l'API Dolibarr
const API_URL = "http://localhost/dolibarr/htdocs/api/index.php/products";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L";

/**
 * Liste les produits à vendre via l'API Dolibarr
 * @returns {Promise<Array>} Liste des produits à vendre
 */
export async function getProduitsAVendre() {
  const config = {
    headers: {
      'DOLAPIKEY': API_KEY,
      'Accept': 'application/json'
    },
    params: {
      sortfield: 't.ref',
      sortorder: 'ASC',
      limit: 100,
      sqlfilters: '(t.tosell:=:1)'
    }
  };

  try {
    const response = await axios.get(API_URL, config);
    console.log("Produits à vendre récupérés :", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erreur du serveur:", error.response.status);
      console.error("Détails de l'erreur:", error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse du serveur:", error.request);
    } else {
      console.error("Erreur dans la requête :", error.message);
    }
    return [];
  }
}

/**
 * Récupère un produit spécifique par son ID via l'API Dolibarr
 * @param {number} productId - ID du produit à récupérer
 * @returns {Promise<Object>} Détails du produit
 */
export async function getById(productId) {
  const config = {
    headers: {
      'DOLAPIKEY': API_KEY,
      'Accept': 'application/json'
    },
    params: {
      sortfield: 't.ref',
      sortorder: 'ASC',
      limit: 100,
      // sqlfilters: '(t.tosell:=:1)' // Si nécessaire, décommente cette ligne
    }
  };

  try {
    const response = await axios.get(`${API_URL}/${productId}`, config);  // Correction avec template string
    console.log("Produit récupéré :", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Erreur du serveur:", error.response.status);
      console.error("Détails de l'erreur:", error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse du serveur:", error.request);
    } else {
      console.error("Erreur dans la requête :", error.message);
    }
    return null;  // Retourner null pour un seul produit, plutôt que [].
  }
}


export async function setNote(productId, valeurNote) {
  try {

    // const moyenNote = calculeMoyenneNote(productId, valeurNote);
    // const mnote = calculeMoyenneNote(productId, valeurNote);
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

export async function calculeMoyenneNote(productId, valeurNote) {
    const produit = await getById(productId);

    const moyenneNote = (produit.array_options.options_notep + valeurNote) / 2;
    return moyenneNote
}