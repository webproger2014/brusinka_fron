<template>
  <age :chartdata="chartData" :options="options"/>
</template>

<script>
  import Age from '@/widgets/Chart/Age.vue'
  export default {
    components: {
      Age
    },
    data () {
      return {
        chartData: {
          labels: [
            '24 года.',
            '25-34',
            '35-44',
            '45-54',
            '55 лет и старше',
          ],
          datasets: [
            {
              label: 'Количество',
              data: [
                4.5,
                34,
                37,
                14,
                10.5,
              ],
              backgroundColor: ['#5CCCCC', '#EFFD3F', '#FF6140', '#4C59D8', '#BC38D3',],
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
