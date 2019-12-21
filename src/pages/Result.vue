<template>
  <q-page class="flex row flex-center ">
    {{result.id}}
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Result',
  data () {
    return {
      result: {}
    }
  },
  methods: {
    async getResult () {
      const id = this.$route.params.id
      const res = await axios.get(`/results/${id}`)
      this.result = res.data
    }
  },
  async mounted () {
    await this.getResult()
  }
}
</script>

<style scoped>

</style>
