import Vue from 'vue'
import Router from 'vue-router'
import Basket from '../views/Basket.vue'
import Settings from '../views/Settings.vue'
import checkOut from '../views/checkOut.vue'
import SignUp from '@/views/SignUp'

import firebase from 'firebase/app'
import auth from 'firebase/auth'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: checkOut,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('/basket')
  else next()
})

export default router
