import axios from 'axios';

const API_URL_ORDER = "http://localhost/dolibarr/htdocs/api/index.php/orders";
const API_URL_INVOICE = "http://localhost/dolibarr/htdocs/api/index.php/invoices";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L"; // Clé API

export const addToCart = (product) => {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Augmenter la quantité si le produit existe déjà
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartItems = () => {
  return JSON.parse(sessionStorage.getItem('cart')) || [];
};

export const updateProductQuantity = (id, quantity) => {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const productIndex = cart.findIndex(item => item.id === id);

  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const removeProductFromCart = (id) => {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  sessionStorage.setItem('cart', JSON.stringify(cart));
};


let isProcessing = false;

// Valider la commande
export const valideCommande = async () => {
  if (isProcessing) {
    console.log("Une commande est déjà en cours de traitement.");
    return;
  }

  try {
    isProcessing = true;

    const cart = getCartItems();
    const socid = sessionStorage.getItem('clientId');

    if (!socid) {
      throw new Error("socid (ID du client) manquant.");
    }

    // if (!cart || cart.length === 0) {
    //   throw new Error("Le panier est vide.");
    // }

    // // 🔍 Affichage des données du panier
    // console.log("🛒 Contenu du panier :");
    // cart.forEach((item, index) => {
    //   console.log(`Produit ${index + 1}:`, {
    //     id: item.id,
    //     nom: item.label,
    //     quantité: item.quantity,
    //     prix: item.price,
    //     TVA: item.tva_tx,
    //     description: item.description
    //   });
    // });

    if (!cart || cart.length === 0) {
      throw new Error("Le panier est vide.");
    } else {
      console.log("Contenu du panier:", JSON.stringify(cart, null, 2));
    }
    

    // Créer la commande
    const payloadOrder = {
      socid: socid,
      date: Math.floor(Date.now() / 1000), 
      type: 0, 
      lines: cart.map(item => ({
        fk_product: item.id,
        qty: item.quantity,
        price: item.price,
        subprice: item.price,
        tva_tx: item.tva,
        label: item.title
      }))
      
    };

    const config = {
      headers: {
        "DOLAPIKEY": API_KEY,
        "Content-Type": "application/json",
      },
    };

    const orderResponse = await axios.post(API_URL_ORDER, payloadOrder, config);

    if (orderResponse.status !== 200) {
      throw new Error(`Erreur lors de la création de la commande : ${orderResponse.statusText}`);
    }

    console.log("✅ Commande créée avec succès");

  } catch (error) {
    console.error("❌ Erreur lors de la validation de la commande : " + error.message);
    throw error;
  } finally {
    isProcessing = false;
    sessionStorage.removeItem('cart');
    console.log("🧹 Le panier a été vidé.");
  }
};


// export const valideCommande = async () => {
//   if (isProcessing) {
//     console.log("Une commande est déjà en cours de traitement.");
//     return;  // Si une commande est déjà en cours, on arrête l'exécution
//   }

//   try {
//     isProcessing = true;

//     const cart = getCartItems();
//     const socid = sessionStorage.getItem('clientId');

//     if (!socid) {
//       throw new Error("socid (ID du client) manquant.");
//     }

//     if (!cart || cart.length === 0) {
//       throw new Error("Le panier est vide.");
//     }

//     // Créer la commande
//     const payloadOrder = {
//       socid: socid,
//       date: Math.floor(Date.now() / 1000), 
//       type: 0, 
//       lines: cart.map(item => ({
//         fk_product: item.id,
//         qty: item.quantity,
//         price: item.price,
//         tva_tx: item.tva_tx,
//         description: item.description
//       })),
//     };

//     const config = {
//       headers: {
//         "DOLAPIKEY": API_KEY,
//         "Content-Type": "application/json",
//       },
//     };

//     // Créer la commande
//     const orderResponse = await axios.post(API_URL_ORDER, payloadOrder, config);

//     // Vérifier la réponse de l'API
//     if (orderResponse.status !== 200) {
//       throw new Error(`Erreur lors de la création de la commande : ${orderResponse.statusText}`);
//     }

//     // Afficher un message de succès sans avoir besoin d'ID
//     console.log("Commande créée avec succès");

//   } catch (error) {
//     console.error("Erreur lors de la validation de la commande : " + error.message);
//     throw error;  // Propager l'erreur pour la gestion ultérieure
//   } finally {
//     isProcessing = false;  // Réinitialiser l'état après traitement

//     sessionStorage.removeItem('cart');
//     console.log("Le panier a été vidé.");
//   }
// };

export async function getCommande() {
  try {
    const clientId = sessionStorage.getItem("clientId");

    if (!clientId) {
      console.warn("Aucun clientId trouvé dans le sessionStorage.");
      return [];
    }

    const sqlFilter = `(t.fk_soc:=:${clientId})`; // Filtrer par fk_soc = clientId

    const response = await axios.get(API_URL_ORDER, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
      params: {
        sortfield: 't.ref',
        sortorder: 'ASC',
        limit: 100,
        sqlfilters: sqlFilter,
      },
    });

    console.log("Commandes récupérées pour le client connecté :", response.data);
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error(`Erreur du serveur (HTTP ${error.response.status}) :`, error.response.data);
    } else if (error.request) {
      console.error("Aucune réponse du serveur. Vérifiez votre connexion :", error.request);
    } else {
      console.error("Erreur lors de la requête :", error.message);
    }
    return [];
  }
}

export async function getDetail(ref) {
  try {
    // Étape 1 : Récupérer l'ID de la commande en fonction de la référence
    const sqlFilter = `(t.ref:=:'${ref}')`; 

    const responseCommande = await axios.get(API_URL_ORDER, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
      params: {
        sqlfilters: sqlFilter,
        limit: 1, // On ne veut qu’un seul résultat
      },
    });

    if (responseCommande.data.length === 0) {
      console.warn(`Aucune commande trouvée pour la référence ${ref}`);
      return null;
    }

    // On récupère les données complètes de la commande (y compris l'ID et les autres informations)
    const commande = responseCommande.data[0]; 
    const commandeId = commande.id; // L'ID de la commande
    console.log(`Détails de la commande pour ${ref} :`, commande);

    // Étape 2 : Récupérer les lignes de la commande en fonction de l'ID
    const responseLignes = await axios.get(`${API_URL_ORDER}/${commandeId}/lines`, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (responseLignes.data.length === 0) {
      console.warn(`Aucune ligne trouvée pour la commande ${commandeId}`);
      return null;
    }

    // Étape 3 : Retourner les détails de la commande et des lignes
    const commandeDetails = {
      commande: commande,  // Inclure toutes les données de la commande
      lignes: responseLignes.data,  // Inclure les lignes de la commande
    };

    console.log(`Détails de la commande ${ref} :`, commandeDetails);
    return commandeDetails;

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


export async function updateCommande(commandeId) {
  try {
    // Créer l'objet de données à envoyer pour la mise à jour
    const lastOrderRef = await getLastOrderReference();
    console.log("new ref" + lastOrderRef);


    // Si la dernière référence est trouvée, générer la nouvelle référence
    if (lastOrderRef) {
      const newReference = generateNewReference(lastOrderRef);
      console.log("new ref" + newReference);

    const data = {
      statut: 1,  // Statut que vous voulez mettre à jour (1 pour validée)
      ref: newReference,
    };

    // Requête PUT pour mettre à jour la commande avec l'ID spécifié
    const response = await axios.put(`${API_URL_ORDER}/${commandeId}`, data, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log(`Commande ${commandeId} mise à jour avec succès`);
      return response.data;
    } else {
      console.warn(`Échec de la mise à jour de la commande ${commandeId}`);
      return null;
    }
  } else {
    console.warn('Impossible de récupérer la dernière commande pour générer une nouvelle référence');
    return null;
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

// Fonction pour récupérer la dernière référence de commande
async function getLastOrderReference() {
  try {
    const sqlFilter = "(t.ref:like:'SO2504-%')";

    const response = await axios.get(`${API_URL_ORDER}`, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
      params: {
        sortfield: 't.ref', 
        sortorder: 'DESC',
        limit: 100,
        sqlfilters: sqlFilter, // Application du filtre SQL
      },
    });

    if (response.status === 200 && response.data.length > 0) {
      // Récupérer la dernière référence de la commande
      return response.data[0].ref;
    } else {
      console.warn('Aucune commande trouvée pour générer une nouvelle référence');
      return 'SO2504-0000';  // Référence par défaut si aucune commande n'est trouvée
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la dernière commande :', error);
    return 'SO2504-0000';  // Référence par défaut en cas d'erreur
  }
}

// Fonction pour générer la nouvelle référence
function generateNewReference(lastRef) {
  // Si la dernière référence est 'SO2504-0000', commencer à partir de ce point
  if (lastRef === 'SO2504-0000') {
    return 'SO2504-0001'; // Générer la première référence suivante
  }

  // Supposons que la référence a un format comme SO2504-0001, SO2504-0002, etc.
  const [prefix, lastNumber] = lastRef.split('-');
  const newNumber = (parseInt(lastNumber, 10) + 1).toString().padStart(4, '0');
  return `${prefix}-${newNumber}`;
}


// Fonction pour récupérer la dernière référence de commande
// async function getLastOrderReference() {
//   try {
//     const sqlFilter = "(t.ref:like:'SO2504-%')";

//     // Encodage du filtre SQL pour s'assurer qu'il est valide dans l'URL
//     // const encodedSqlFilter = encodeURIComponent(sqlFilter);

//     const response = await axios.get(`${API_URL_ORDER}`, {
//       headers: {
//         'DOLAPIKEY': API_KEY,
//         'Accept': 'application/json',
//       },
//       params: {
//         sortfield: 't.ref', 
//         sortorder: 'DESC',
//         limit: 100,
//         sqlfilters: sqlFilter, // Application du filtre SQL
//       },
//     });

//     if (response.status === 200 && response.data.length > 0) {
//       // Récupérer la dernière référence de la commande
//       return response.data[0].ref;
//     } else {
//       console.warn('Aucune commande trouvée pour générer une nouvelle référence');
//       return null;
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la dernière commande :', error);
//     return null;
//   }
// }

// // Fonction pour générer la nouvelle référence
// function generateNewReference(lastRef) {
//   // Supposons que la référence a un format comme SO2504-0001, SO2504-0002, etc.
//   const [prefix, lastNumber] = lastRef.split('-');
//   const newNumber = (parseInt(lastNumber, 10) + 1).toString().padStart(4, '0');
//   return `${prefix}-${newNumber}`;
// }



// // Fonction pour récupérer la dernière référence de commande
// export async function isFactureCreatedForCommande(commandeId) {
//   try {
//     const sqlFilter = `(t.fk_source='${commandeId}')`; 

//     // Encodage du filtre SQL pour s'assurer qu'il est valide dans l'URL
//     // const encodedSqlFilter = encodeURIComponent(sqlFilter);

//     const response = await axios.get(`${API_URL_INVOICE}`, {
//       headers: {
//         'DOLAPIKEY': API_KEY,
//         'Accept': 'application/json',
//       },
//       params: {
//         sortfield: 't.rowid',
//         sortorder: 'ASC',
//         limit: 100,
//         sqlfilters: sqlFilter, // Application du filtre SQL
//       },
//     });

//     if (response.status === 200 && response.data.length > 0) {
//       // Récupérer la dernière référence de la commande
//       return response.data[0].ref;
//     } else {
//       console.warn('Aucune commande trouvée pour générer une nouvelle référence');
//       return null;
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la dernière commande :', error);
//     return null;
//   }
// }


// export async function isFactureCreatedForCommande(commandeId) {
//   try {
//     // Filtre SQL pour vérifier la relation avec la facture
//     const sqlFilter = "(t.facture = 1)";

//     // Faire la requête GET pour récupérer les données de la commande
//     const response = await axios.get(`${API_URL_ORDER}/${commandeId}`, {
//       headers: {
//         'DOLAPIKEY': API_KEY,
//         'Accept': 'application/json',
//       },
//       params: {
//         sortfield: 't.rowid',
//         sortorder: 'ASC',
//         limit: 100,
//         sqlfilters: sqlFilter,  // Utilisation du filtre pour vérifier la facture
//       },
//     });

//     // Vérification de la réponse
//     if (response.status === 200 && response.data.length > 0) {
//       // Si la facture est trouvée, retourner sa référence
//       return response.data[0].ref;  // La référence de la facture liée à la commande
//     } else {
//       console.warn('Aucune facture trouvée pour cette commande.');
//       return null;  // Aucun lien trouvé entre la commande et une facture
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la facture :', error);
//     return null;  // Gestion des erreurs
//   }
// }


export async function isFactureCreatedForCommande(commandeId) {
  try {
    // Effectuer une requête GET vers l'API Node.js
    const response = await axios.get(`http://localhost:3000/api/getInvoiceForOrder/${commandeId}`);
    
    // Vérifier si l'ID de la facture existe dans la réponse
    if (response.data.id_facture) {
      console.log(`Facture trouvée avec ID : ${response.data.id_facture}`);
      return response.data.id_facture; // Retourner l'ID de la facture
    } else {
      console.log('Aucune facture trouvée pour cette commande.');
      return null; // Aucune facture trouvée
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API:', error);
    return null; // En cas d'erreur
  }
}


export async function isFacturePaye(factureId) {
  try {

    // Ne pas encoder de nouveau le filtre, envoyons-le tel quel
    const response = await axios.get(`${API_URL_INVOICE}/${factureId}`, {
      headers: {
        'DOLAPIKEY': API_KEY,
        'Accept': 'application/json',
      },
    });

       // Loguer la réponse pour mieux comprendre la structure
       console.log("Réponse de l'API:", response.data);
    
       if (response.status === 200) {
         // Si la réponse contient des données et est un tableau
         if (Array.isArray(response.data) && response.data.length > 0) {
           return response.data[0];  // Retourner la première facture du tableau
         } else if (response.data && response.data.id) {
           return response.data;  // Retourner directement la facture si elle existe
         } else {
           console.warn('Aucune client trouvée pour cet ID.');
           return null;  // Aucune facture dans la réponse
         }
       } else {
         console.warn('Réponse de l\'API invalide, code de statut:', response.status);
         return null;
       }
     } catch (error) {
       console.error('Erreur lors de la récupération de la facture :', error);
       return null;
}

}
