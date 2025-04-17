<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">TABLEAU DE BORD</h1>

    <!-- Cartes statistiques cliquables -->
    <div class="stats-cards">
      <div class="card" @click="activeStat = 'commande'; updateCharts()">
        <h3>Ventes</h3>
        <p>{{ nombreVente }}</p>
      </div>
      <div class="card" @click="activeStat = 'facture'; updateCharts()">
        <h3><Form:get></Form:get>Factures</h3>
        <p>{{ nombreFacture }}</p>
      </div>
      <div class="card" @click="activeStat = 'chiffre'; updateCharts()">
        <h3>Chiffre d'affaire</h3>
        <p>{{ chiffreAffaire }} €</p>
        <!-- <p>Montant déjà payé {{ montantFacturePaye }} €</p> -->
      </div>
    </div>

    <!-- Graphiques -->
    <div class="charts-container">
      <div class="chart-container">
        <h1>{{ getGraphTitle }}</h1>
        <canvas id="lineChart"></canvas>
      </div>
      <div class="diagramme">
        <div class="chart-diagramme">
          <canvas id="pieChart"></canvas>
        </div>
        <div class="chart-diagramme">
          <canvas id="percentageChart"></canvas>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getAllCommande, getFacture } from '@/services/dashboardService.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      nombreVente: 0,
      nombreFacture: 0,
      chiffreAffaire: 0,
      montantFacturePaye: 0,
      activeStat: 'commande', // 'commande', 'facture', 'chiffre'
      commandes: [],
      commandesValides: [],
      factures: [],
      facturesPayes: [],
      lineChart: null,
      pieChart: null,
      percentageChart: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    getGraphTitle() {
      switch (this.activeStat) {
        case 'commande':
          return 'Graphique des Commandes';
        case 'facture':
          return 'Graphique des Factures';
        case 'chiffre':
          return "Graphique du Chiffre d'Affaires";
        default:
          return 'Graphique';
      }
    }
  },

  methods: {
    async fetchData() {
      try {
        const commandesResponse = await getAllCommande();
        const commandesValides = commandesResponse.filter(c => c.statut != 0);
        this.nombreVente = commandesResponse.length;
        this.commandes = commandesResponse;
        this.commandesValides = commandesValides;

        const factureResponse = await getFacture();
        const facturePaye = factureResponse.filter(f => f.statut == 2 && f.paye == 1);
        this.factures = factureResponse;
        this.facturesPayes = facturePaye;
        this.nombreFacture = factureResponse.length;

        this.montantFacturePaye = Math.round(
          facturePaye.reduce((sum, f) => sum + (Number(f.total_ttc) || 0), 0) * 100
        ) / 100;

        this.chiffreAffaire = Math.round(
          factureResponse.reduce((sum, f) => sum + (Number(f.total_ttc) || 0), 0) * 100
        ) / 100;

        this.updateCharts();
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    },

    updateCharts() {
      if (this.lineChart) this.lineChart.destroy();
      if (this.pieChart) this.pieChart.destroy();
      if (this.percentageChart) this.percentageChart.destroy(); // Ajouté

      if (this.activeStat === 'commande') {
        this.createCommandeCharts();
      } else if (this.activeStat === 'facture') {
        this.createFactureCharts();
      } else if (this.activeStat === 'chiffre') {
        this.createChiffreCharts();
      }

      const ctx = document.getElementById('percentageChart')?.getContext('2d');
      if (ctx) this.createPercentageChart(ctx); // Ajouté
    },


    createCommandeCharts() {
      const commandesByMonth = Array(12).fill(0);
      this.commandesValides.forEach(commande => {
        let date = new Date(commande.date_creation);
        if (commande.date_creation.toString().length === 10) {
          date = new Date(commande.date_creation * 1000);
        }
        const month = date.getMonth();
        commandesByMonth[month]++;
      });

      const statusCounts = [0, 0, 0];
      this.commandes.forEach(c => {
        if (c.statut == 0) statusCounts[0]++;
        else if (c.statut == 1) statusCounts[1]++;
        else statusCounts[2]++;
      });

      this.createLineChart('Commandes validée mensuelles', commandesByMonth);
      this.createPieChart(['Brouillon', 'Validée', 'Autre'], statusCounts);
    },

    createFactureCharts() {
      const facturesByMonth = Array(12).fill(0);
      this.facturesPayes.forEach(facture => {
        let date = new Date(facture.date_creation);
        if (facture.date_creation.toString().length === 10) {
          date = new Date(facture.date_creation * 1000);
        }
        const month = date.getMonth();
        facturesByMonth[month]++;
      });

      const paye = this.factures.filter(f => f.paye == 1).length;
      const nonPaye = this.factures.length - paye;

      this.createLineChart('Factures payées mensuelles', facturesByMonth);
      this.createPieChart(['Payées', 'Non payées'], [paye, nonPaye]);
    },

    createChiffreCharts() {
      const chiffreByMonth = Array(12).fill(0);
      this.facturesPayes.forEach(f => {
        let date = new Date(f.date_creation);
        if (f.date_creation.toString().length === 10) {
          date = new Date(f.date_creation * 1000);
        }
        const month = date.getMonth();
        const total = Number(f.total_ttc) || 0;
        chiffreByMonth[month] += total;
      });

      const chiffrePaye = this.montantFacturePaye;
      const reste = this.chiffreAffaire - chiffrePaye;

      this.createLineChart('Chiffre d\'affaire mensuel (€)', chiffreByMonth);
      this.createPieChart(['Payé', 'Restant'], [chiffrePaye, reste]);
    },

    createLineChart(label, dataArray) {
      const ctx = document.getElementById('lineChart').getContext('2d');
      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label,
            data: dataArray,
            borderColor: '#EA8C1B',
            backgroundColor: 'rgba(255, 87, 34, 0.2)',
            fill: true,
            tension: 0.4,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
          plugins: { legend: { position: 'top' } },
        },
      });
    },

    createPieChart(labels, dataArray) {
      const ctx = document.getElementById('pieChart').getContext('2d');
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            data: dataArray,
            backgroundColor: ['#774e92', '#EA8C1B', '#2B5C7E'],
            borderColor: ['#fff', '#fff', '#fff'],
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
              },
            },
          },
        },
      });
    },
    createPercentageChart(ctx) {
      let labels = [];
      let dataArray = [];
      let title = '';

      if (this.activeStat === 'commande') {
        const total = this.commandes.length;
        const valides = this.commandes.filter(c => c.statut != 0).length;
        const brouillon = total - valides;

        labels = ['Brouillon', 'Validée'];
        dataArray = [brouillon, valides];
        title = 'Répartition des commandes';
      } 
      else if (this.activeStat === 'facture') {
        const total = this.factures.length;
        const payees = this.factures.filter(f => f.paye == 1).length;
        const nonPayees = total - payees;

        labels = ['Non Payées', 'Payées'];
        dataArray = [nonPayees, payees];
        title = 'Répartition des factures';
      } 
      else if (this.activeStat === 'chiffre') {
        const total = this.chiffreAffaire;
        const paye = this.montantFacturePaye;
        const restant = total - paye;

        labels = ['Restant', 'Payé'];
        dataArray = [restant, paye];
        title = 'Répartition des chiffre d\'Affaire';
      }

      this.percentageChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: title,
            data: dataArray,
            backgroundColor: ['#bbb', '#774e92'],
            borderWidth: 2,
            hoverOffset: 10,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title,
              font: { size: 16 }
            },
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                  const value = tooltipItem.raw;
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${tooltipItem.label}: ${percentage}% (${value})`;
                },
              },
            },
          },
        }
      });
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  margin: 20px;
  padding: 20px;
  /* background-color: #FAFAFA; */
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.dashboard-title {
  text-align: center;
  color: #2B5C7E;
  margin-bottom: 30px;
  font-size: 48px;
  font-family: 'PF DIN Text Pro';
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2);
  font-weight: bold;
}
.stats-cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  /* background: red; */
  padding: 30px;
}
.card {
  background-color: #FAFAFA;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 30%;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  color: #2B5C7E;
  font-size: 18px;
  margin-bottom: 10px;

  h3 {
    color: #2B5C7E;
    font-size: 18px;
    /* margin-bottom: 10px; */
    text-transform: uppercase;
    font-weight: 300;
    font-family: sans-serif;
    text-align: left;
    margin-top: 5px;
  }

  p {
    color: #2B5C7E;
    font-size: 42px;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-family: sans-serif;
  }
}
.card:hover,
.card:active {
  transform: scale(1.05);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  color: #FAFAFA;
  background: #2B5C7E;
}

.card:active {
  transform: scale(0.98); /* Ajoute un effet de "compression" lors du clic */
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2); /* Ombre plus marquée pendant l'activation */
}

.card:hover h3,
.card:active h3,
.card:hover p,
.card:active p {
  color: #FAFAFA;
}


.charts-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  background-color: #FAFAFA;
  padding: 30px;
}
.chart-container {
  position: relative;
  /* height: 400px; */
  /* background: green; */
  padding: 20px;
  h1{
    color: #2B5C7E;
    text-transform: uppercase;
    font-family: sans-serif;
    font-weight: 300;
    font-size: 35px;
  }
}

h1{
  color: #2B5C7E;
  text-transform: uppercase;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 35px;
}
.diagramme {
  position: relative;
  width: 250px;
  /* background: green; */
  padding: 20px;
}
.chart-diagramme {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
}
canvas {
  max-width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: #FAFAFA;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
#lineChart {
  width: 1000px;
}
#pieChart {
  padding: 5px;
  /* width: 850px; */
}
</style>
