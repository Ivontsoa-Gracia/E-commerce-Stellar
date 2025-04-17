<template>
    <div>
      <canvas ref="chart" />
    </div>
  </template>
  
  <script>
  import { Line } from 'chart.js';
  import { defineComponent, onMounted, ref, watch } from 'vue';
  
  export default defineComponent({
    name: 'LineChart',
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      const chartRef = ref(null);
      let chartInstance = null;
  
      // Créer un graphique lorsque les données sont disponibles
      onMounted(() => {
        chartInstance = new Line(chartRef.value, {
          type: 'line',
          data: props.data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                mode: 'index',
                intersect: false,
              }
            },
            scales: {
              x: {
                type: 'category',
              },
              y: {
                ticks: {
                  beginAtZero: true,
                }
              }
            }
          }
        });
      });
  
      // Mettre à jour le graphique quand les données changent
      watch(() => props.data, (newData) => {
        if (chartInstance) {
          chartInstance.data = newData;
          chartInstance.update();
        }
      });
  
      return {
        chartRef
      };
    }
  });
  </script>
  