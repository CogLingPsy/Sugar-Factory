<template>
  <q-table
    title="Decisions"
    :data="tableData"
    :columns="columns"
    row-key="name"
    :pagination.sync="pagination"
  />
</template>

<script>
export default {
  name: 'DecisionsTable',
  props: {
    manufactured: Array,
    workers: Array
  },
  data: () => ({
    pagination: {
      rowsPerPage: 0
    },
    columns: [
      {
        name: 'index',
        required: true,
        label: '№',
        align: 'right',
        field: 'index'
      },
      {
        name: 'manufactured',
        required: true,
        label: 'Manufactured',
        align: 'right',
        field: 'manufactured'
      },
      {
        name: 'workers',
        required: true,
        label: 'Workers',
        align: 'right',
        field: 'workers'
      }
    ],
    tableData1: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      }
    ]
  }),
  computed: {
    tableData () {
      let data = []
      for (let i = 0; i < this.manufactured.length; i++) {
        data.push({
          index: i + 1,
          manufactured: this.manufactured[i],
          workers: this.workers[i]
        })
      }
      return data
    }
  }
}
</script>
