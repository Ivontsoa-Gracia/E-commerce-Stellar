import axios from 'axios';

const API_URL_ORDER = "http://localhost/dolibarr/htdocs/api/index.php/orders";
const API_URL_INVOICE = "http://localhost/dolibarr/htdocs/api/index.php/invoices";
const API_KEY = 'DSAxxkghj9N6SNub050NEi46kc1EF16L';  // Remplacez par votre clé d'API


// dashboardService.js
export async function getAllCommande() {
    try {
        const response = await axios.get(API_URL_ORDER, {
          headers: {
            'DOLAPIKEY': API_KEY,
            'Accept': 'application/json',
          },
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
          },
        });

        console.log("Commandes récupérées pour le client connecté :", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes", error);
        return [];
    }
}

export async function getFacture() {
  try {
    const response = await axios.get(API_URL_INVOICE, {
        headers: {
            'DOLAPIKEY': API_KEY,
            'Accept': 'application/json',
          },
          params: {
            sortfield: 't.rowid',
            sortorder: 'ASC',
            limit: 100,
          },
        });

        console.log("Commandes récupérées pour le client connecté :", response.data);
        return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des factures", error);
    return 0;
  }
}

export async function chiffreAffair() {
    try {
      const response = await axios.get(API_URL_INVOICE, {
        headers: {
          'DOLAPIKEY': API_KEY,
          'Accept': 'application/json',
        },
        params: {
          sortfield: 't.rowid',
          sortorder: 'ASC',
          limit: 100,
        },
      });
  
      console.log("Factures récupérées :", response.data);
  
      // Calculer le total des factures
      const totalHT = response.data.reduce((sum, invoice) => sum + (invoice.total_ht || 0), 0);
      return totalHT;
    } catch (error) {
      console.error("Erreur lors de la récupération des factures", error);
      return 0;
    }
  }
