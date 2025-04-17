<template>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <div class="action">
        <button @click="goBack" class="back-button">
            <!-- Icône SVG flèche retour -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
            </svg>
        </button>
        <button class="export" @click="exporterPDF" v-if="facture && commande">
            <span>
                <i class="fa fa-file-pdf" style="margin-right: 8px;"></i>
            </span>
        </button>
    </div>

    <div v-if="facture && commande" class="container" >
      <a :href="getFacturePDF(facture.ref)" target="_blank">Télécharger la facture PDF</a>
      <!-- <a :href="getFacturePDF(facture.ref)" target="_blank">Télécharger la facture PDF</a> -->

        <div id="facture">
        <div class="en-tete">
          <h1>Facture N° {{ facture.ref }}</h1>
          <p>Date facturation : {{ formaterDate(facture.date_validation) }}</p>
          <p>Réf. commande : {{ commande.commande.ref }} / {{ formaterDate(commande.commande.date_creation) }}</p>
        </div>
    
        <div class="information">
          <div class="societe">
            <div class="for-societe">
              <AImage class="logo" :url="logo" width="100px" height="auto" />
              <p>STELLAR</p>
              <p>Antananarivo 101, Madagascar</p>
              <p>www.stellar-bike.com</p>
            </div>
          </div>
          <div class="client">
            <h2>Adressé à</h2>
            <div class="for-client">
              <p>{{ client.name }}</p>
              <p>{{ client.address }}</p>
              <p>{{ client.town }}</p>
            </div>
          </div>
        </div>
    
        <div class="corps">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>TVA</th>
                  <th>P.U. HT</th>
                  <th>Qté</th>
                  <th>Total HT</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ligne in commande.lignes" :key="ligne.rowid">
                  <td v-if="ligne.produit">{{ ligne.produit.ref }} - {{ ligne.produit.label }}</td>
                  <!-- <td>{{ ligne.tva_tx }}</td> -->
                  <td>{{ (ligne.tva_tx * 1).toFixed(1) }}%</td>
                  <td v-if="ligne.produit">{{ (ligne.produit.price * 1).toFixed(2) }} €</td>
                  <td>{{ ligne.qty }}</td>
                  <td>{{ (ligne.total_ht * 1).toFixed(2) }} €</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    
        <div class="footer">
          <div class="footer-content">
            <div class="conditions">
              <h3>Conditions de paiement</h3>
              <p>{{ getCondition(facture.cond_reglement_id) }}</p>
              <p>Tout retard entraînera des pénalités selon l'article L441-6 du Code de commerce.</p>
            </div>
            <div class="total">
              <table style="border-collapse: collapse; width: 100%; max-width: 400px;">
                <tbody>
                  <tr>
                    <td style="padding: 8px; text-align: left; font-weight: 700;">Total HT</td>
                    <td style="padding: 8px;">{{ convertirEtArrondir(commande.commande.total_ht) }} €</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; text-align: left; font-weight: 700;">Total TVA</td>
                    <td style="padding: 8px;">{{ convertirEtArrondir(commande.commande.total_tva) }} €</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; text-align: left; font-weight: 700;">Total TTC</td>
                    <td style="padding: 8px;">{{ convertirEtArrondir(commande.commande.total_ttc) }} €</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AImage from '@/components/atomes/AImage.vue';
  import html2pdf from 'html2pdf.js';
  import { getFactureById } from '@/services/factureService'; 
  import { getDetail } from '@/services/panierService'; 
  import { getById } from '@/services/produitService'; 
  import { getClientById } from '@/services/clientService';
  
  export default {
    components: { AImage },
    data() {
      return {
        commande: null,
        facture: null, 
        client: null, 
        logo: "/logo/logo2.png",
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

      goBack() {
        this.$router.go(-1); 
      },
      async exporterPDF() {
        try {
          const element = document.getElementById('facture');
          if (element) {
            const options = {
              margin: 0.5,
            //   filename: 'facture.pdf',
              filename: `facture_${this.facture.ref}.pdf`,
              image: { type: 'png', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
    
            await html2pdf().set(options).from(element).save();
          } else {
            console.error('Élément facture introuvable');
          }
        } catch (error) {
          console.error("Erreur lors de l'exportation en PDF:", error);
        }
      },
      async recupererProduitDetails(fk_product) {
        try {
          const produit = await getById(fk_product);
          if (produit) {
            const ligne = this.commande.lignes.find((l) => l.fk_product === fk_product);
            if (ligne) {
              ligne.produit = produit;
            }
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des détails du produit:", error);
        }
      },
      async recupererClientDetails() {
        const clientId = sessionStorage.getItem('clientId');
        console.log("LE CLIENT " + clientId)

        if (clientId) {
          try {
            this.client = await getClientById(clientId);
            console.log("LE CLIENT " + this.client)
          } catch (error) {
            console.error("Erreur lors de la récupération des détails du client:", error);
          }
        }
      },
      formaterDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("fr-FR");
      },
      getCondition(statut) {
        const conditions = {
          1: "À payer à réception",
          2: "À payer dans 30 jours",
          3: "À payer dans 30 jours, fin de mois",
          4: "À payer dans 60 jours, fin de mois",
          5: "À payer dans 60 jours, fin de mois",
          6: "À payer à la commande",
          7: "À payer à la livraison",
          8: "50% à la commande, 50% à la livraison",
          9: "À payer dans 10 jours",
          10: "À payer dans 10 jours, fin de mois",
          11: "À payer dans 14 jours",
          12: "À payer dans 14 jours, fin de mois",
          13: "30% d'acompte, solde à la livraison"
        };
        return conditions[statut] || "Statut inconnu";
      },

      getFacturePDF(refFacture) {
        const BASE_URL = "http://localhost/dolibarr/htdocs";
        return `${BASE_URL}/document.php?modulepart=facture&file=${refFacture}/${refFacture}.pdf`;
      }
    },
    mounted() {
      const ref = this.$route.params.reference;
      const idFacture = this.$route.params.idFacture;
      console.log("Commande ref:" + ref);
      console.log("Facture id:" + idFacture);

      // Appel des données client
        this.recupererClientDetails();
  
      // Récupérer la facture par ID
      getFactureById(idFacture).then((data) => {
        if (data) {
          this.facture = data;
          console.log("Facture Data:", this.facture);
        }
      }).catch((error) => {
        console.error("Erreur de récupération de la facture:", error);
      });
  
      // Récupérer les détails de la commande
      getDetail(ref).then((data) => {
        if (data) {
          this.commande = data;
          console.log("Commande Data:", this.commande);
  
          // Récupérer les détails des produits pour chaque ligne de commande
          this.commande.lignes.forEach(ligne => {
            this.recupererProduitDetails(ligne.fk_product);
          });
        } else {
          console.error('Commande introuvable');
        }
      }).catch((error) => {
        console.error("Erreur de récupération de la commande:", error);
      });
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 50px;
    font-family: sans-serif;
    background-color: #fff;
  }
  
  .en-tete {
    text-align: right;
    padding: 30px;
    border-bottom: 2px solid #ccc;
  }
  
  h1 {
    font-size: 20px;
    font-weight: 600;
    color: #131313;
  }
  
  h2, h3 {
    font-size: 14px;
    font-weight: bold;
    color: #131313;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 13px;
    line-height: 1.5;
    color: #252525;
    margin: 2px 0;
  }
  
  .information {
    display: flex;
    gap: 20px;
    padding: 20px 0;
  }
  
  .societe {
    width: 50%;
    padding: 20px;
    box-sizing: border-box;
    background: #fafafa;
  }
  .for-societe {
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
  }
  
  .logo {
    margin-bottom: 15px;
    display: block;
  }
  
  .client {
    width: 50%;
    border: 1px solid #131313;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .corps {
    padding: 20px 0;
  }
  
  .table-container {
    width: 100%;
  }
  
  .table-container table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  
  .table-container th,
  .table-container td {
    border: 1px solid #292828;
    padding: 10px 15px;
    text-align: left;
  }
  
  .table-container th {
    background-color: #f4f4f4;
  }
  
  .table-container td {
    background-color: #fafafa;
  }
  
  .table-container tr:hover td {
    background-color: #f0f8ff;
    transition: 0.3s ease;
  }
  
  .footer {
    margin-top: 40px;
    border-top: 2px solid #ccc;
    padding: 20px 0;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
  }
  
  .conditions {
    width: 50%;
  }
  
  .total {
    width: 24%;
    border: 1px solid #292828;
    text-align: right;
    padding: 10px;
    justify-content: center;
    align-items: center;


  }
  
  .total p {
    font-size: 16px;
    color: #131313;
  }

  .montant {
    display: flex;
    gap: 30px;
    align-items: center;
  }

  .back-button {
  padding: 10px 20px;
  background-color: #ffffff;
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
  background-color: #ffffff;
  transform: scale(1.1);
}

.action {
    display: flex;
    justify-content: space-between;
  }

  .fa-file-pdf {
    color: #EA8C1B;
    font-size: 50px;
  }

  .export {
    background: transparent;
    border: none;
    padding: 20px 50px;
    cursor: pointer;

  }

  .export:hover {
    color: #1c3d57;
    background-color: transparent;
    transform: scale(1.1);
  }

  </style>
  