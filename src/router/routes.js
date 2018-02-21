import Auth from '@/components/layouts/Auth'
import Admin from '@/components/layouts/Admin'
import Callback from '@/components/views/auth/Callback'
import Dashboard from '@/components/views/admin/Dashboard'
import Login from '@/components/views/auth/Login'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'callback',
        name: 'Callback',
        component: Callback
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {requiresAuth: true, adminMenu: true},
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true,
          menuOrder: 1,
          menuTitle: 'Dashboard',
          menuIcon: 'fas fa-tachometer-alt'
        }
      }
    ]
  }
]
export default routes
