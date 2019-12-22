<template>
  <q-page class="flex flex-center">
    <div class="col-md-12 col-lg-2">
      <p>Для просмотра результатов войдите в учетную запись администратора</p>
      <q-input v-model="username" label="Username"></q-input>
      <q-input
        v-model="password"
        label="Password"
        type="password"
      ></q-input>
      <q-btn @click="login" class="full-width q-mt-md" color="primary"
      >Войти
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import {setLoggedIn} from '../utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const res = await axios.get('/login', {
        params: {
          user: this.username,
          password: this.password
        }
      })
      const loginSuccessful = res.data.length > 0
      if (loginSuccessful) {
        setLoggedIn(true)
        await this.$router.push('results')
      } else {
        this.$q.notify({
          color: 'negative',
          message: 'Пароль не подходит',
          timeout: 1000
        })
      }
    }
  }
}
</script>
