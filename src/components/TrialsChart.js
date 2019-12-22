import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['manufacturingResults'],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        events: ['click'],
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 1000,
                suggestedMax: 12000
              }
            }
          ]
        }
      }
    }
  },
  computed: {
    chartData () {
      return {
        labels: this.manufacturingResults.map((el, index) => `${index + 1}`),
        datasets: [
          {
            label: 'Произведено сахара, тонн',
            data: this.manufacturingResults,
            fill: false,
            backgroundColor: '#027be3',
            borderColor: '#027be3'
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
