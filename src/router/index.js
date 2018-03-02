import Vue from 'vue'
import Router from 'vue-router'
import {isAuthenticated} from '@/auth/Auth'
import store from '@/store'
import routes from './routes'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next()
    } else {
      store.commit('FLASH/SET_FLASH', {message: 'Not authenticated', variant: 'warning'})
      next({name: 'Login'})
    }
  } else {
    next()
  }
})
export default router
