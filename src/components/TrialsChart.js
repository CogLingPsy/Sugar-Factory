import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  computed: {
    getData () {
      return {
        labels: this.chartData.map((el, index) => `${index + 1}`),
        datasets: [
          {
            label: 'My First dataset',
            data: this.chartData,
            fill: false
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
