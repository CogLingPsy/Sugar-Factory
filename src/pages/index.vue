<template>

  <q-page class="flex row flex-center ">
    <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm ">
      <transition
        enter-active-class="animated bounceInDown"
        leave-active-class="animated bounceOutUp"
        v-on:after-leave="nextState"
      >
        <q-card key="instr" class="q-mb-md" v-if="state.name === 'INSTRUCTION'">
          <q-card-title>
           <icon name="bullseye"></icon> Задание
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Вы управляете сахарной фабрикой. Изменяйте количество рабочих так, чтобы объем производства удерживался на уровне 9000 тонн в день. Количество рабочих можно настроить регулятором в разделе управления фабрикой. После выбора количества нажмите на кнопку завершения дня.  После выбора количества нажмите на кнопку завершения дня. Фабрика производит не меньше 1000 и не больше 12000 тонн сахара в день.

          </q-card-main>

          <q-card-actions>
            <q-btn flat color="primary" label="Начать" @click="nextState" />
          </q-card-actions>

        </q-card>
      </transition>

      <transition
        enter-active-class="animated bounceInDown"
        leave-active-class="animated bounceOutUp"
      >
        <q-card key="exp" class="q-mb-md" v-if="state.name === 'EXPERIMENT'">
          <q-card-title>
            <icon name="bullseye"></icon> Задание
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Вы управляете сахарной фабрикой.
            Изменяйте количество рабочих так, чтобы объем производства удерживался на уровне 9000 тонн в день.
            Количество рабочих можно настроить регулятором в разделе управления фабрикой.
            После выбора количества нажмите на кнопку завершения дня. Фабрика производит не меньше 1000 и не больше 12000 тонн сахара в день.
          </q-card-main>

        </q-card>
      </transition>

      <transition appear enter-active-class="animated pulse"
      leave-active-class="animated bounceOutLeft"
      v-on:after-leave="nextState"
      >
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
      </transition>

      <transition enter-active-class="animated bounceInDown"
      leave-active-class="animated bounceOutUp"
      v-on:after-leave="nextState">
        <q-card key="instr" class="q-mb-md" v-if="state.name === 'FEEDBACK'">
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
      </transition>

      <transition enter-active-class="animated bounceInDown"
      >
        <q-card key="instr" class="q-mb-md" v-if="state.name === 'RESULTS'">
          <q-card-title>
            Результаты
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            Спасибо за участие. Ваши результаты сохранены в файле results.json в папке с программой
          </q-card-main>
        </q-card>
      </transition>

    </div>
    <transition appear
      enter-active-class="animated pulse"
      leave-active-class="animated bounceOutRight">
      <div class="col-lg-4 col-md-6 col-xs-12 q-pa-sm" v-if="state.name === 'EXPERIMENT'">
        <q-card>
          <q-card-title>
            <icon name="trophy"></icon> Результаты
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <p>Вчера {{ workersYesterday }} человек произвели {{ manufacturedYesterday }} тонн сахара </p>
            <div class="relative-position" style="color: #027be3;" v-ripple>
              <trials-chart :chart-data="getData" :options="chartOptions"></trials-chart>
            </div>
          </q-card-main>
        </q-card>

      </div>
    </transition>

  </q-page>

</template>

<style>

</style>

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
        'INSTRUCTION_ANIMATION_LEFT',
        'EXPERIMENT',
        'EXPERIMENT_ANIMATION_LEFT',
        'FEEDBACK',
        'FEEDBACK_ANIMATION_LEFT',
        'RESULTS'],
      state: {
        name: 'INSTRUCTION',
        index: 0
      },
      currentDay: 1,
      maxDay: 3,

      workersToday: 1000,
      workersYesterday: 'неизвестное количество',
      manufacturedYesterday: 6000,

      manufacturingResults: [],
      workers: [],
      feedback: '',

      chartOptions: {
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
  },

  computed: {
    getData () {
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
  }
}
</script>
