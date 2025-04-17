<template>
  <div class="container">
    <button @click="goBack" class="back-button">
      <!-- Icône SVG flèche retour -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
        <path d="M19 12H5"></path>
        <path d="M12 19l-7-7 7-7"></path>
      </svg>
    </button>

    <div class="title">
      <h2>Détails de la commande</h2>
    </div>
    
    <div v-if="commande">
      <div class="com">
        <div class="left">
          <div class="desc-commande">
            <!-- <p><strong>Référence :</strong> {{ commande.commande.id }}</p> -->
            <p><strong>Référence :</strong> {{ commande.commande.ref }}</p>
            <p><strong>Date :</strong> {{ formaterDate(commande.commande.date_creation) }}</p>
            <p><strong>Montant total TTC :</strong> {{ convertirEtArrondir(commande.commande.total_ttc) }} Ar</p>
            <p><strong>État :</strong> {{ getStatutTexte(commande.commande.statut) }}</p>
          </div>
        </div>

        <div class="right">
          <!-- Le bouton ne s'affiche que si fk_statut vaut 0 -->
          <button v-if="commande.commande.fk_statut === 0" @click="validerCommande">
            Valider la commande
          </button>

          <!-- Afficher "Facture créée" si une facture est liée à cette commande -->
          <p class="reussi" v-if="factureCreer" style="color: green; font-weight: bold; font-size: medium; font-family: sans-serif;">
            <br>
            <router-link :to="{ name: 'facture', params: { reference: commande.commande.ref, idFacture: factureId } }">Facture créée</router-link>
          </p>
          <p class="non-reussi" v-else style="color: red; font-weight: bold; font-size: medium; font-family: sans-serif;">Facture non créée</p>
          
          <!-- Afficher "Paiement effectué" si la facture est payée -->
          <p class="reussi" v-if="facturePaye" style="color: green; font-weight: bold; font-size: medium; font-family: sans-serif;">Paiement effectué</p>
          <p class="non-reussi" v-else style="color: red; font-weight: bold; font-size: medium; font-family: sans-serif;">Paiement non effectué</p>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in commande.lignes" :key="ligne.rowid">
              <td v-if="ligne.produit">{{ ligne.produit.label }}</td>
              <td>{{ ligne.qty }}</td>
              <td v-if="ligne.produit">{{ (ligne.produit.price * 1).toFixed(2) }} Ar</td>
              <td>{{ (ligne.total_ttc * 1).toFixed(2) }} Ar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>Commande introuvable.</p>
    </div>
  </div>
</template>


<script>
import { getDetail, isFactureCreatedForCommande, isFacturePaye } from '@/services/panierService'; 
import { getById } from '@/services/produitService'; 

export default {
  name: "DetailCommande",
  data() {
    return {
      commande: null,
      factureCreer: false,  // Etat indiquant si la facture a été créée
      facturePaye: false,   // Etat indiquant si la facture a été payée
      factureId: null,
    };
  },
  methods: {
    convertirEtArrondir(valeur) {
        // Convertir la chaîne de caractères en un nombre flottant
        const nombre = parseFloat(valeur);

        // Vérifier si la conversion a réussi (si c'est un nombre valide)
        if (!isNaN(nombre)) {
          // Arrondir le nombre à 2 chiffres après la virgule
          return nombre.toFixed(2);
        } else {
          // Si la valeur n'est pas un nombre valide, renvoyer une valeur par défaut ou erreur
          console.error("La valeur n'est pas un nombre valide");
          return "0.00";  // Valeur par défaut si la conversion échoue
        }
      },
    getStatutTexte(statut) {
      if (statut == 1) {
        return "Validée";
      } else if (statut == 2) {
        return "En cours";
      } else if (statut == 3) {
        return "Livrée";
      } else if (statut == 4) {
        return "Validée + En cours";
      } else if (statut == 5) {
        return "Validée + En cours + Livrée";
      } else {
        return "Annulée"; // Valeur par défaut si le statut n'est pas reconnu
      }
    },
    goBack() {
      this.$router.go(-1); 
    },
    validerCommande() {
      if (this.commande && this.commande.commande.fk_statut !== "Validée") {
        this.commande.commande.fk_statut = "Validée";
        alert("Commande validée avec succès !");
      }
    },
    formaterDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("fr-FR"); // Format jj/mm/aaaa
    },
    // Récupérer les détails du produit par ID
    recupererProduitDetails(fk_product) {
      getById(fk_product).then((produit) => {
        if (produit) {
          // Ajouter les détails du produit à la ligne de commande
          const ligne = this.commande.lignes.find((l) => l.fk_product === fk_product);
          if (ligne) {
            ligne.produit = produit; // Stocke les détails du produit dans la ligne
          }
        } else {
          console.error("Produit non trouvé pour l'ID:", fk_product);
        }
      });
    },
    // // Vérifier si une facture a été créée pour la commande
    // async verifierFacture() {
    //   if (this.commande && this.commande.commande.id) {
    //     const factureId = await isFactureCreatedForCommande(this.commande.commande.id);

    //     console.log("ID Commande" + this.commande.commande.rowid);
    //     console.log("ID FACTURE" + factureId);
    //     if (factureId) {
    //       this.factureCreer = true;

    //     } else {
    //       this.factureCreer = false;
    //     }
    //   }
    // },
    async verifierFacture() {
      if (this.commande && this.commande.commande.id) {
        try {
          // Vérifier si une facture existe pour cette commande
          const factureId = await isFactureCreatedForCommande(this.commande.commande.id);

          console.log("ID Commande: " + this.commande.commande.id);
          console.log("ID FACTURE: " + factureId);

          if (factureId) {
            this.factureId = factureId;
            this.factureCreer = true; // Facture créée

            // Vérifier si la facture a été payée
            const paiementResponse = await isFacturePaye(factureId);

            // Afficher l'objet JSON de la réponse dans la console
            console.log("donnees facture : ", JSON.stringify(paiementResponse, null, 2));
            console.log("État du paiement statut : ", paiementResponse.statut);
            console.log("État du paiement status : ", paiementResponse.status);
            console.log("État du paiement paye : ", paiementResponse.paye);


            // Vérification si la facture est payée
            if (paiementResponse.paye == 1 && paiementResponse.statut == 2) {
              // Si la facture est payée (paye == 1) et le statut est égal à 2 (paye confirmé ou validé)
              this.facturePaye = true; // Marque la facture comme payée
            } else {
              // Si la facture n'est pas payée ou si elle n'a pas encore été confirmée (statut différent de 2)
              this.facturePaye = false; // Marque la facture comme non payée
            }


          } else {
            this.factureCreer = false; // Aucune facture créée
            this.facturePaye = false; // Pas de facture et donc pas de paiement
          }
        } catch (error) {
          console.error("Erreur lors de la vérification de la facture:", error);
        }
      }
    },

  },
  mounted() {
    const ref = this.$route.params.reference;  // Récupérer la référence depuis l'URL
    getDetail(ref).then((data) => {
      if (data) {
        this.commande = data;  // Stocker les données de la commande

        // Vérifier si une facture a été créée pour cette commande
        this.verifierFacture();

        // Récupérer les détails des produits pour chaque ligne de commande
        this.commande.lignes.forEach(ligne => {
          this.recupererProduitDetails(ligne.fk_product);
        });
      } else {
        console.error('Commande introuvable');
      }
    });
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  /* max-width: 700px; */
  margin: auto;
  background: #fafafa;
  border-radius: 8px;
  /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); */
}

h2 {
  text-align: center;
}
.title {
  font-family: sans-serif;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2B5C7E;
  font-weight: 300;
}

p {
  font-size: 16px;
  margin: 10px 0;
}
.com {
  display: flex;
  gap: 50px;
}

.desc-commande {
  margin-left: 100px;
  font-family: sans-serif;
}

.right {
  margin-right: 100px;
  margin-left: auto;
}
.table-container {
  width: 100%;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  font-size: 16px;
  /* background: #EA8C1B; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-container table {
  border-collapse: separate; /* Permet d’utiliser border-spacing */
  border-spacing: 0 10px; /* 10px d’espace vertical entre les lignes */
  width: 85%;
}

.table-container th,
.table-container td {
  border: 1px solid #ccc;
  padding: 15px 20px;
  text-align: left;
  background-color: #fafafa; 
}

.table-container th {
  background-color: #f5f5f5;
  color: #131313;
  font-weight: bold;
  /* opacity: 0.5; */
}

.table-container tr:nth-child(even) td {
  background-color: #fafafa;
}

.table-container tr:hover td {
  background-color: #f0f8ff;
  transition: 0.3s ease;
}

.back-button {
  padding: 10px 20px;
  background-color: #fafafa;
  color: #2B5C7E;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 26px;
  margin-top: 20px;
  display: inline-block;
  text-align: center;
  width: 100px;
  font-size: xx-small;
}

.back-button:hover {
  color: #1c3d57;
  background-color: #fafafa;
  transform: scale(1.1);
}
</style>
