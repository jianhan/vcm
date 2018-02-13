import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/layouts/Auth'
import Admin from '@/components/layouts/Admin'
import Login from '@/components/views/auth/Login'
import Dashboard from '@/components/views/admin/Dashboard'
import { isAuthenticated } from '@/auth/auth'

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
    if (isAuthenticated()) {
      next()
    } else {
      next({ path: 'auth/login' })
    }
    // if (!store.state.user.isLoggedIn) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // } else {
    //   next()
    // }
  } else {
    next()
  }
})
export default router
