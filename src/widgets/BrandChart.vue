<template>
  <div id="chart">
    <brand :chartdata="chartData" :options="options"/>
  </div>

</template>

<script>
  import Brand from '@/widgets/Chart/Brand.vue'
  export default {
    components: {
      Brand
    },
    data () {
      return {
        chartData: {
          type: 'line',
          labels: [
            '01.11.2019 - 30.11.2019',
            '01.12.2019 - 31.12.2019',
            '01.01.2020 - 31.01.2020',
            '01.02.2020 - 29.02.2020',
            '01.03.2020 - 31.03.2020',
            '01.04.2020 - 30.04.2020',
            '01.05.2020 - 31.05.2020',
            '01.06.2020 - 30.06.2020',
            '01.07.2020 - 31.07.2020',
            '01.08.2020 - 31.08.2020',
            '01.09.2020 - 30.09.2020',
            '01.10.2020 - 31.10.2020',
            '01.11.2020 - 30.11.2020',
            '01.12.2020 - 31.12.2020',
            '01.01.2021 - 31.01.2021',
            '01.03.2021 - 31.03.2021',
            '01.04.2021 - 30.04.2021',
            '01.05.2021 - 31.05.2021',
            '01.06.2021 - 30.06.2021',
            '01.07.2021 - 31.07.2021',
            '01.08.2021 - 31.08.2021',
            '01.09.2021 - 30.09.2021',
            '01.10.2021 - 31.10.2021',
          ],
          datasets: [
            {
              label: 'Веванта',
              type: 'line',
              data: [899, 862, 1158, 1607, 1306, 1579, 2340, 2452, 2466, 2889, 2616, 2946, 3362, 3027, 3672, 3677, 4198, 4221, 3476, 3360, 3262, 3351, 3081, 3323],
              borderColor: '#00bab6',
              backgroundColor: [
                'white'
              ],
              trendlineLinear: {
                  style: "rgb(43 ,66 ,255, 0.3)",
                  lineStyle: "dotted|solid",
                  width: 2
              }
            },

            {
              label: 'Стабилис',
              fill: false,
              data: [66, 100, 123, 127, 112, 178, 237, 240, 229, 208, 151, 129, 149, 133, 197, 205, 211, 272, 224, 289, 273, 297, 276, 259],
              borderColor: '#2b2a29',
              backgroundColor: [
                '#FFF'
              ],
            },

            {
              label: 'Неострой',
              fill: false,
              data: [
                117,
                105,
                171,
                328,
                292,
                245,
                283,
                229,
                220,
                214,
                199,
                237,
                283,
                289,
                275,
                392,
                368,
                469,
                380,
                330,
                314,
                254,
                246,
                384,
              ],
              borderColor: 'orange',
              backgroundColor: [
                'white'
              ],
            },

            {
              label: 'ZotonGroup',
              fill: false,
              data: [
                239,
                163,
                209,
                299,
                288,
                313,
                379,
                376,
                256,
                230,
                222,
                233,
                236,
                154,
                219,
                216,
                292,
                226,
                237,
                209,
                162,
                124,
                143,
                150,
              ],
              borderColor: '#72a443',
              backgroundColor: [
                '#FFF'
              ],
            },



          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              fill: false,
              tension: 0,
              borderWidth: 3
            },
          },
        }
      }
    }
  }
</script>

<style scoped>
  #chart > div {
    height: 650px;
  }
</style>
