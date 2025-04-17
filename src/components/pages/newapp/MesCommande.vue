<template>
  <div class="container">
    <!-- Filtres par état -->
    <div class="filter-etat" v-if="commandes.length > 0">
      <label for="etatSelect">Filtrer par état :</label>
      <select id="etatSelect" v-model="selectedEtat" @change="filterByEtat">
        <option value="">Tous les états</option>
        <option v-for="etat in etatsDisponibles" :key="etat" :value="etat">{{ etat }}</option>
      </select>
    </div>

    <!-- Liste des commandes filtrées -->
    <div class="list" v-if="paginatedCommandes.length > 0">
      <div class="title">
        <h2>Commande effectuée</h2>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Référence</th>
              <th>Date</th>
              <th>Montant HT</th>
              <th>État</th>
              <th>Facture</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="commande in paginatedCommandes" :key="commande.reference">
              <td>
                <router-link
                  v-if="commande.etat !== 'Brouillon'"
                  :to="`/detail-commande/${commande.reference}`"
                >
                  {{ commande.reference }}
                </router-link>
                <span v-else>{{ commande.reference }}</span>
              </td>
              <td>{{ commande.date }}</td>
              <td>{{ commande.montantHt }} Ar</td>
              <td>{{ commande.etat }}</td>
              <td>
                <p 
                  :class="commande.factureInfo.cree ? 'facturee' : 'non-facturee'"
                >
                  {{ commande.factureInfo.cree ? 'Facturée' : 'Non facturée' }}
                </p>

                <p
                  v-if="commande.factureInfo.statut !== null && commande.factureInfo.statut !== undefined"
                  :class="commande.factureInfo.paye == 1 ? 'payee' : 'impayee'"
                >
                  {{ getStatutFacture(commande.factureInfo.statut) }}
                </p>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">❮</button>
        <span v-for="page in totalPages" :key="page" :class="{ 'active-page': page === currentPage }">
          {{ page }}
        </span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">❯</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommande,
  isFactureCreatedForCommande,
  isFacturePaye
} from "@/services/panierService";

export default {
  name: "ListeCommande",
  data() {
    return {
      commandes: [],
      selectedEtat: "",
      pageSize: 5,
      currentPage: 1,
    };
  },
  computed: {
    commandesFiltrees() {
      if (!this.selectedEtat) return this.commandes;
      return this.commandes.filter(cmd => cmd.etat === this.selectedEtat);
    },
    paginatedCommandes() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.commandesFiltrees.slice(start, start + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.commandesFiltrees.length / this.pageSize);
    },
    etatsDisponibles() {
      return [...new Set(this.commandes.map(cmd => cmd.etat))];
    }
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
    },
    filterByEtat() {
      this.currentPage = 1;
    },
    getStatutFacture(statut) {
      const etatFacture = {
        0: "Brouillon",
        1: "Impayée",
        2: "Payée",
      };
      return etatFacture[statut] || "Statut inconnu";
    },
    isPayer(paye) {
      const etatPaye = {
        0: "Impayée",
        1: "Payée",
      };
      return etatPaye[paye] || "Etat paye inconnu";
    },
    async chargerCommandes() {
      try {
        const data = await getCommande();
        this.commandes = await Promise.all(data.map(async (cmd) => {
          const commande = {
            id: cmd.id,
            reference: cmd.ref,
            date: new Date(cmd.date * 1000).toLocaleDateString(),
            montantHt: cmd.total_ht,
            etat: cmd.statut == 0 ? "Brouillon" :
                  cmd.statut == 1 ? "Validée" :
                  cmd.statut == 2 ? "En cours" :
                  cmd.statut == 3 ? "Livrée" :
                  cmd.statut == 4 ? "Validée + En cours" :
                  cmd.statut == 5 ? "Validée + En cours + Livrée" : "Annulée",
            facture: cmd.facture,
            factureInfo: {
              cree: false,
              paye: false,
              statut: null,
            }
          };

          try {
            const factureId = await isFactureCreatedForCommande(commande.id);
            if (factureId) {
              const paiementResponse = await isFacturePaye(factureId);
              commande.factureInfo = {
                cree: true,
                paye: paiementResponse.paye,
                statut: paiementResponse.statut,
              };
            }
          } catch (err) {
            console.warn("Erreur lors de la vérification de la facture pour la commande", commande.id, err);
          }

          return commande;
        }));
      } catch (err) {
        console.error("Erreur lors du chargement des commandes :", err);
      }
    }
  },
  mounted() {
    this.chargerCommandes();
  }
};
</script>


<style scoped>
/* Conteneur du filtre */
.filter-etat {
  margin: 20px 0;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Style du label */
.filter-etat label {
  font-size: 1.1rem;
  color: #2B5C7E;
  font-weight: normal;
  margin-right: 10px;
  font-family: sans-serif;

}

/* Style du select */
.filter-etat select {
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #fff;
  transition: border-color 0.3s ease;
  width: 40%;
}

/* Changement de couleur du select au focus */
.filter-etat select:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

/* Style des options dans le select */
.filter-etat select option {
  padding: 10px;
}

/* Style de l'élément select quand il est vide (Tous les états) */
.filter-etat select option[value=""] {
  font-style: italic;
  color: #888;
}

.container {
  justify-content: space-between;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 30px;
}
.buttons button {
  color: #2B5C7E;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  font-family: sans-serif;
}
.buttons button:hover {
  text-decoration: underline;
}
.list {
  margin-top: 20px;
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
  background-color: #fafafa
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

.valider {
  background: transparent;
  padding: 10px;
  text-align: center;
  border: 2px solid #EA8C1B;
  border-radius: 4px;
  /* text-decoration: underline; */
  color: #EA8C1B;
  cursor: pointer;
  font-size: 16px;
}

.etat-valide {
  color: #EA8C1B;
  font-size: 16px;
  font-weight: 500;
}

.facturee {
  color: green;
  font-weight: bold;
}

.non-facturee {
  color: #ff9800; /* orange */
  font-style: italic;
}

.payee {
  color: #4caf50; /* vert foncé */
  font-weight: bold;
}

.impayee {
  color: red;
  font-weight: bold;
}


.pagination {
  /* position: fixed; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  gap: 10px;
  font-family: sans-serif;
  margin-bottom: 50px;
  /* background: pink; */
  /* z-index: 1000; */


}

.pagination button {
  padding: 5px 8px;
  border-radius: 4px;
  font-weight: bold;
  background: #131313;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;   /* Centre verticalement */
  justify-content: center; /* Centre horizontalement */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  color: #fafafa;
  font-family: sans-serif;
  font-size: 20px;

}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;

}
.pagination span {
  padding: 5px 8px;
  border-radius: 4px;
  font-weight: bold;
  background: #fafafa;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;   /* Centre verticalement */
  justify-content: center; /* Centre horizontalement */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

}

.pagination .active-page {
  background-color: #EA8C1B;
  color: white;
}
</style>
