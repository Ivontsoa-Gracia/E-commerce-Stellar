import axios from 'axios';

// URL de l'API Dolibarr pour insérer des produits
const API_URL = "http://localhost/dolibarr/htdocs/api/index.php/products";
const API_KEY = "DSAxxkghj9N6SNub050NEi46kc1EF16L"; // Clé API

/**
 * Fonction pour insérer un produit dans Dolibarr via l'API
 * @param {Object} productData - Données du produit à insérer
 */
export async function insertProduct(productData) {
  const config = {
    headers: {
      "DOLAPIKEY": API_KEY,
      "Content-Type": "application/json",
    },
  };

  const productPayload = {
    ref: productData.ref,
    label: productData.label,
    price: productData.price,
    stock: productData.stock,
  };

  try {
    const response = await axios.post(API_URL, productPayload, config);
    console.log("Produit inséré avec succès :", response.data);
  } catch (error) {
    // Gérer les erreurs
    if (error.response) {
      // Erreur retournée par le serveur
      console.error("Erreur du serveur:", error.response.status);
      console.error("Détails de l'erreur:", error.response.data);
    } else if (error.request) {
      // La requête a été faite mais il n'y a pas eu de réponse
      console.error("Aucune réponse du serveur:", error.request);
    } else {
      // Quelque chose a mal tourné dans la configuration de la requête
      console.error("Erreur dans la requête :", error.message);
    }
  }
}

/**
 * Fonction pour lire et traiter les fichiers CSV
 * @param {FileList} files - Liste des fichiers CSV sélectionnés
 */
export async function handleFilesUpload(files) {
  // Parcours chaque fichier CSV sélectionné
  Array.from(files).forEach(file => {
    const reader = new FileReader();

    reader.onload = async function(event) {
      const csvData = event.target.result;
      const rows = csvData.split('\n');

      // Tableau pour stocker les produits extraits du fichier
      const products = [];

      // Itérer sur chaque ligne (en ignorant la première ligne si c'est l'en-tête)
      rows.forEach((row, index) => {
        if (index === 0) return; // Ignorer la première ligne d'en-tête

        const columns = row.split(',');

        // Vérifier que la ligne a le bon nombre de colonnes
        if (columns.length < 4) {
          console.error(`Ligne mal formatée (index ${index + 1}) dans le fichier :`, row);
          return; // Sauter les lignes mal formatées
        }

        // Préparer les données du produit
        const productData = {
          ref: columns[0].trim(), // Référence produit
          label: columns[1].trim(), // Libellé produit
          price: parseFloat(columns[2].trim()), // Prix produit
          stock: parseInt(columns[3].trim()), // Stock produit
        };

        // Vérifier si les données sont valides
        if (isNaN(productData.price) || isNaN(productData.stock)) {
          console.error(`Données invalides pour le produit (index ${index + 1}) :`, row);
          return; // Ignorer si les données sont invalides
        }

        // Ajouter le produit au tableau
        products.push(productData);
      });

      // Après avoir lu le fichier, insérer les produits un par un
      for (const product of products) {
        try {
          await insertProduct(product);
          console.log(`Produit ${product.ref} inséré avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du produit ${product.ref} :`, error);
        }
      }
    };

    // Lire le fichier CSV
    reader.readAsText(file);
  });
}
