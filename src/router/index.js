import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/layouts/Auth'
import Admin from '@/components/layouts/Admin'
import Login from '@/components/views/auth/Login'
import Dashboard from '@/components/views/admin/Dashboard'
import { isAuthenticated } from '@/auth/auth'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to, from, isAuthenticated(), store.state)
    if (isAuthenticated()) {
      next()
    } else {
      store.commit('FLASH/SET_FLASH', { message: 'Not authenticated', variant: 'warning' })
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})
export default router
