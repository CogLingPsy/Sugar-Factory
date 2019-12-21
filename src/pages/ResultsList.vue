<template>
  <q-page class="flex row flex-center ">
    <q-list>
      <q-list-header>Результаты</q-list-header>

      <q-item
        v-for="result in results"
        v-bind:key="result.id"
        :to="result.id.toString()"
        :append="true"
      >
        <q-item-main>
          <q-item-tile label>Испытуемый {{result.id}} <span>{{(new Date(result.date)).toDateString()}}</span></q-item-tile>
          <q-item-tile sublabel>{{result.feedback}}</q-item-tile>
        </q-item-main>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResultsList',
  data () {
    return {
      results: []
    }
  },
  methods: {
    async getResults () {
      const res = await axios.get('/results')
      this.results = res.data
    }
  },
  async mounted () {
    await this.getResults()
  }
}
</script>

<style scoped>

</style>
