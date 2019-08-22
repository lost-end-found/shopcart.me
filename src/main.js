import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseCSS from 'firebaseui/dist/firebaseui.css'
import './scss/main.scss'

import Vuebar from 'vuebar'
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'

Vue.use(Vuebar)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(function (e) {
  store.dispatch('user/validate', e)
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      firebaseCSS,
      render: h => h(App)
    }).$mount('#app')
  }
})
