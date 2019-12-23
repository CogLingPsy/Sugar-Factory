<template>
  <q-page class="flex row flex-center ">
    <div class="col-md-12 col-lg-2">
      <q-list>
        <q-list-header>Результаты</q-list-header>

        <q-item
          v-for="result in results"
          v-bind:key="result.id"
          :to="result.id.toString()"
          :append="true"
          multiline
        >
          <q-item-main>
            <q-item-tile label>Испытуемый {{result.id}}</q-item-tile>
            <q-item-tile sublabel lines="1">
              {{result.feedback}}
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
            <q-item-tile stamp>{{(new Date(result.date)).toDateString()}}</q-item-tile>
          </q-item-side>
        </q-item>

      </q-list>

      <q-btn @click="logout" class="full-width q-mt-md" color="primary">Выйти</q-btn>
    </div>

  </q-page>
</template>

<script>
import axios from 'axios'
import {setLoggedIn} from '../utils/auth'

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
    },
    async logout () {
      setLoggedIn(false)
      await this.$router.push({name: 'modeSelection'})
    }
  },
  async mounted () {
    await this.getResults()
  }
}
</script>

<style scoped>

</style>
