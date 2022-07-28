
<script>
import Chart from 'vue-chartjs'

export default {
  extends: Chart.Pie,
  props: ['chartdata', 'options'],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
