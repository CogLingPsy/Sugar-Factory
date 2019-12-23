<template>
  <q-page class="flex row justify-center gutter-md q-pt-lg">
    <div class="col-lg-4 col-md-6 col-xs-12">
        <q-card key="instr" class="q-mb-lg" v-if="state.name === 'INSTRUCTION'">
          <q-card-title>
           <icon name="bullseye"></icon>
            Задание
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Вы управляете сахарной фабрикой.
            Изменяйте количество рабочих так, чтобы объем производства удерживался на уровне 9000 тонн в день.
            Количество рабочих можно настроить регулятором в разделе управления фабрикой.
            После выбора количества нажмите на кнопку завершения дня.
            Фабрика производит не меньше 1000 и не больше 12000 тонн сахара в день.
          </q-card-main>

          <q-card-actions>
            <q-btn flat color="primary" label="Начать" @click="nextState" />
          </q-card-actions>

        </q-card>
        <q-card key="exp" class="q-mb-lg" v-if="state.name === 'EXPERIMENT'">
          <q-card-title>
            <icon name="bullseye"></icon> Задание
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Вы управляете сахарной фабрикой.
            Изменяйте количество рабочих так, чтобы объем производства удерживался на уровне 9000 тонн в день.
            Количество рабочих можно настроить регулятором в разделе управления фабрикой.
            После выбора количества нажмите на кнопку завершения дня.
            Фабрика производит не меньше 1000 и не больше 12000 тонн сахара в день.
          </q-card-main>

        </q-card>

        <q-card v-if="state.name === 'EXPERIMENT'">
          <q-card-title>
            <icon name="building"></icon> Управление фабрикой
          </q-card-title>
          <q-card-separator />
          <q-card-main>

            <q-progress class="q-mb-md" :percentage="currentDay / maxDay * 100" />
            <p class="caption">
            День {{currentDay}} / {{maxDay}}
            </p>
            <q-slider v-model="workersToday" :min="1000" :max="12000" label label-always snap markers :step="1000" />
            <p class="caption">
            Количество рабочих
          </p>
          </q-card-main>
          <q-card-actions>
            <q-btn flat color="primary" label="Завершить день" @click="getManufactured" />
          </q-card-actions>
        </q-card>

        <q-card key="instr" class="q-mb-lg" v-if="state.name === 'FEEDBACK'">
          <q-card-title>
            Результаты
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <p>
              Опишите, какую стратегию вы использовали при принятии решений
            </p>
           <q-input
              v-model="feedback"
              type="textarea"
              float-label="Ответ"
            />
          </q-card-main>

          <q-card-actions>
            <q-btn flat color="primary" label="Сохранить" @click="nextState" />
          </q-card-actions>
        </q-card>

        <q-card key="instr" class="q-mb-md" v-if="state.name === 'RESULTS'">
          <q-card-title>
            Результат сохранен
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Спасибо за участие. Научное сообщество вас не забудет!
          </q-card-main>
        </q-card>

    </div>
      <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm" v-if="state.name === 'EXPERIMENT'">
        <q-card>
          <q-card-title>
            <icon name="trophy"></icon> Результаты
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <p>Вчера {{ workersYesterday }} человек произвели {{ manufacturedYesterday }} тонн сахара </p>
            <div class="relative-position" style="color: #027be3;" v-ripple>
              <trials-chart :manufacturing-results="manufacturingResults"></trials-chart>
            </div>
          </q-card-main>
        </q-card>
      </div>
  </q-page>

</template>

<script>
import TrialsChart from '../components/trialsChart'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'

export default {
  components: { TrialsChart, Icon },
  name: 'PageIndex',
  data () {
    return {
      states: [
        'INSTRUCTION',
        'EXPERIMENT',
        'FEEDBACK',
        'RESULTS'],
      state: {
        name: 'INSTRUCTION',
        index: 0
      },
      currentDay: 1,
      maxDay: 5,

      workersToday: 1000,
      workersYesterday: 'неизвестное количество',
      manufacturedYesterday: 6000,

      manufacturingResults: [],
      workers: [],
      feedback: ''
    }
  },

  methods: {
    async getManufactured () {
      let manufacturedToday =
        2 * this.workersToday -
        this.manufacturedYesterday +
        this.getRandomInt(-1, 1) * 1000
      if (manufacturedToday < 1000) {
        manufacturedToday = 1000
      }
      if (manufacturedToday > 12000) {
        manufacturedToday = 12000
      }
      this.manufacturedYesterday = manufacturedToday
      this.manufacturingResults.push(manufacturedToday)
      this.workers.push(this.workersToday)
      this.workersYesterday = this.workersToday
      this.currentDay++

      if (this.currentDay > this.maxDay) {
        this.nextState()
      }
    },

    nextState () {
      if (this.state.index < this.states.length - 1) {
        this.state.index++
        this.state.name = this.states[this.state.index]
      }
      if (this.state.name === 'RESULTS') {
        axios.post('/results', {
          manufacturingResults: this.manufacturingResults,
          workers: this.workers,
          feedback: this.feedback,
          date: new Date()
        })
      }
    },

    getRandomInt (min, max) {
      const random = Math.floor(Math.random() * (max - min)) + min
      return random
    }
  }
}
</script>
