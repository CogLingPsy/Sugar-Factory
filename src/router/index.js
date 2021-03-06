import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {loggedIn} from '../utils/auth'

Vue.use(VueRouter)

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * If you decide to go with "history" mode, please also set "build.publicPath"
   * to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({ y: 0 }),
  routes
})

Router.beforeEach(function (to, from, next) {
  const isLoggedIn = loggedIn()
  const loginRequired = ['result', 'results'].includes(to.name)

  if (loginRequired && !isLoggedIn) {
    next('login')
  } else {
    next()
  }

  next()
})

export default Router
