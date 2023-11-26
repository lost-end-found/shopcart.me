import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'
import Basket from '../views/Basket.vue'
import Settings from '../views/Settings.vue'
import CheckOut from '../views/CheckOut.vue'
import SignUp from '../views/SignUp.vue'



const router = createRouter({
  history: createWebHistory(),
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
      component: CheckOut,
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
    { path: '/(.*)', redirect: '/login' },
  ]
})
router.beforeEach(async (to) => {
  // routes with `meta: { requiresAuth: true }` will check for
  // the users, others won't
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    // if the user is not logged in, redirect to the login page
    if (!currentUser) {
      return {
        path: '/login',
        query: {
          // we keep the current path in the query so we can
          // redirect to it after login with
          // `router.push(route.query.redirect || '/')`
          redirect: to.fullPath,
        },
      }
    }
  } else {
    const currentUser = await getCurrentUser()
    if (currentUser) {
      return {
        path: '/basket',
      }
    }
  }
})

export default router
