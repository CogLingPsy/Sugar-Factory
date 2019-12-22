<template>
  <q-page class="flex row justify-center gutter-lg q-pt-xl">
    <div class="col-md-12 col-lg-4">
      <q-card class="q-mb-xl">
        <q-card-title>
          Испытуемый {{$route.params.id}}
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-input :value="(new Date(this.date)).toDateString()" stack-label="Дата прохождения" readonly hide-underline/>
          <q-input :value="feedback" stack-label="Стратегия" readonly hide-underline/>
        </q-card-main>
      </q-card>

      <q-card>
        <q-card-title>
          Результаты
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <div class="relative-position">
            <trials-chart :manufacturing-results="manufacturingResults"></trials-chart>
          </div>
        </q-card-main>
      </q-card>
    </div>
    <div class="col-md-12 col-lg-4">
      <decisions-table :manufactured="manufacturingResults" :workers="workers"/>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import TrialsChart from '../components/trialsChart'
import DecisionsTable from '../components/DecisionsTable'

export default {
  name: 'Result',
  components: {
    TrialsChart, DecisionsTable
  },
  data () {
    return {
      workers: [],
      manufacturingResults: [],
      date: null,
      feedback: ''
    }
  },
  methods: {
    async getResult () {
      const id = this.$route.params.id
      const res = await axios.get(`/results/${id}`)
      this.manufacturingResults = res.data.manufacturingResults
      this.workers = res.data.workers
      this.date = res.data.date
      this.feedback = res.data.feedback
    }
  },
  async mounted () {
    await this.getResult()
  }
}
</script>

<style scoped>

</style>
