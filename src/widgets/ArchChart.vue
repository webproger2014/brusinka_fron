<template>
  <BarChart :chartdata="chartData" :options="options"/>
</template>

<script>
  import BarChart from '@/widgets/Chart/BarChart.vue'
  export default {
    components: {
      BarChart
    },
    data () {
      return {
        chartData: {
          labels: [
            '2016 г.',
            '2017 г.',
            '2018 г.',
            '2019 г.',
            '2020 г.',
            '2021 г.',
          ],
          datasets: [
            {
              label: 'Количество',
              data: [75, 104, 127, 150, 270, 280],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      }
    }
  }
</script>
