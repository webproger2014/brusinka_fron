<script>
import Bar from 'vue-chartjs'
export default {
  extends: Bar.Bar,
  props: ['chartdata', 'options'],
  mounted () {

    this.renderChart(this.chartdata, this.options)
  }
}
</script>
