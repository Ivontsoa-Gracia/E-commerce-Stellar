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
    return;  // Si une commande est déjà en cours, on arrête l'exécution
  }

  try {
    isProcessing = true;

    const cart = getCartItems();
    const socid = sessionStorage.getItem('clientId');

    if (!socid) {
      throw new Error("socid (ID du client) manquant.");
    }

    if (!cart || cart.length === 0) {
      throw new Error("Le panier est vide.");
    }

    // Créer la commande
    const payloadOrder = {
      socid: socid,
      date: Math.floor(Date.now() / 1000), 
      type: 0, 
      lines: cart.map(item => ({
        fk_product: item.id,
        qty: item.quantity,
      })),
    };

    const config = {
      headers: {
        "DOLAPIKEY": API_KEY,
        "Content-Type": "application/json",
      },
    };

    // Créer la commande et obtenir l'ID de la commande
    const orderResponse = await axios.post(API_URL_ORDER, payloadOrder, config);
    const orderId = orderResponse.data;
    console.log("Réponse brute de la commande :", orderResponse.data);
    console.log(`Commande validée avec ID : ${orderId}`);

    // Créer la facture à partir de la commande
    const payloadInvoice = {
      socid: socid,
      line: cart.map(item => ({
        fk_product: item.id,
        qty: item.quantity,
        subprice: item.price,  // Assure-toi de récupérer le prix du produit dans le panier
      })),
      status: 2, // 1 pour "payée" (si tu veux qu'elle soit payée immédiatement)
      date: Math.floor(Date.now() / 1000),
      type: 0, // Facture classique
      origin: orderId,  // Lier la facture à la commande
    };

    // Créer la facture via l'API
    const invoiceResponse = await axios.post(API_URL_INVOICE, payloadInvoice, config);
    const invoiceId = invoiceResponse.data;
    console.log("Réponse brute de la facture :", invoiceResponse.data);
    console.log(`Facture créée avec succès, ID : ${invoiceId}`);

    // Optionnel : Si tu veux marquer la facture comme "payée" immédiatement
    const updateInvoicePayload = {
      status: 2,  // Met l'état de la facture à "payée" (1)
    };

    // Mettre à jour l'état de la facture
    await axios.post(`${API_URL_INVOICE}/${invoiceId}`, updateInvoicePayload, config);
    console.log("Facture mise à jour avec l'état 'payée'.");

    // Optionnel : Vide le panier après la commande et la facture
    sessionStorage.removeItem('cart');

    isProcessing = false;

    return {
      orderId,
      invoiceId,
    };
  } catch (error) {
    throw new Error("Erreur lors de la validation de la commande : " + error.message);
  }
};
