import axios from 'axios';

const API_URL = "http://localhost/dolibarr/htdocs/api/index.php/thirdparties";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L";

// Fonction pour récupérer tous les clients et vérifier s'il existe déjà
async function checkClientExistence(clientData) {
    const config = {
        headers: {
            "DOLAPIKEY": API_KEY,
            "Content-Type": "application/json",
        },
        params: {
            limit: 1000 // On récupère jusqu'à 1000 clients, adapte si tu veux + ou -
        }
    };

    try {
        const response = await axios.get(API_URL, config);
        const clients = response.data;

        const matchingClient = clients.find(client =>
            client.name === clientData.nom &&
            client.email === clientData.email &&
            client.address === clientData.adresse &&
            client.town === clientData.ville 
        );

        if (matchingClient) {
            sessionStorage.setItem("clientId", matchingClient.id);
            return matchingClient.id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des clients :", error.response ? error.response.data : error.message);
        return null;
    }
}

// Fonction pour sauvegarder un client (avec insertion uniquement si non existant)
export async function saveClient(clientData) {
    const existingClientId = await checkClientExistence(clientData);

    if (existingClientId) {
        console.log("🔁 Le client existe déjà, rowid :", existingClientId);
        return existingClientId;
    } else {
        const config = {
            headers: {
                "DOLAPIKEY": API_KEY,
                "Content-Type": "application/json",
            },
        };

        const clientPayload = {
            name: clientData.nom,
            email: clientData.email,
            address: clientData.adresse,
            town: clientData.ville,
            client: 1,
            fournisseur: 0,
            entity: 1,
            statut: 0,
            status: 1,
            zip: clientData.zip,
        };

        console.log("🆕 Données à insérer dans l'API Dolibarr :", clientPayload);

        try {
            const response = await axios.post(API_URL, clientPayload, config);
            const newClientRowId = response.data.id;
            console.log("✅ Client inséré avec succès, rowid :", newClientRowId);
            sessionStorage.setItem("clientId", newClientRowId);
            return newClientRowId;
        } catch (error) {
            throw new Error("❌ Échec de l'ajout du client: " + error.message);
        }
    }
}

export async function getClientById(clientId) {
    try {
        const response = await axios.get(`${API_URL}/${clientId}`, {
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
  
