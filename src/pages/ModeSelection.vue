<template>
  <q-page class="flex row flex-center ">
    <div class="col-md-12 col-lg-2 q-pa-md">
      <h4>Добро пожаловать на Сахарную Фабрику!</h4>
      <q-btn
        class="full-width"
        color="primary"
        @click="$router.push({name: 'sugarFactory'})"
      >
        Участвовать в исследовании
      </q-btn>
      <q-btn
        class="full-width q-mt-md"
        @click="$router.push({name: 'results'})"
      >
        Посмотреть результаты
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[8, 8]"
        >
          Для администраторов
        </q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ModeSelection'
}
</script>

<style scoped>

</style>
