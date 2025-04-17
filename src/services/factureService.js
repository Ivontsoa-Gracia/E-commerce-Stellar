import axios from 'axios';

const API_URL_INVOICE = "http://localhost/dolibarr/htdocs/api/index.php/invoices";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L"; // Clé API

export async function getFactureById(factureId) {
    try {
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
          console.warn('Aucune facture trouvée pour cet ID.');
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
  
