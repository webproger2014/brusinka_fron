<template>
  <canvas ref="myChart" width="500" height="300"></canvas>
</template>

<script>
import Chart from 'chart.js';
const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

export default {
  name: 'monthly-sales-chart',
  mounted() {
    new Chart(this.$refs.myChart, {
      type: 'line',
      data: {
        labels: ['2016 год', '2017 год', '2018 год', '2019 год', '2020 год', '2021 год'],
        datasets: [
          {
            label: 'Dataset 1',
            data: {count: DATA_COUNT, min: 0, max: 100},
            borderColor: 'red',
            backgroundColor: 'blue',
            stack: 'combined',
            type: 'bar'
          },
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Stacked Line/Bar Chart'
          }
        },
        scales: {
          y: {
            stacked: true
          }
        }
      },
    });
  }
}
</script>
