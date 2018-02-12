import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/layouts/Auth'
import Login from '@/components/auth/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth,
      children: [
        {
          name: 'Login',
          path: 'login',
          component: Login
        }
      ]
    }
  ]
})
