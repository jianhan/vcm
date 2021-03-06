import Auth from '@/components/layouts/Auth'
import Admin from '@/components/layouts/Admin'
import Callback from '@/components/views/auth/Callback'
import Dashboard from '@/components/views/admin/Dashboard'
import Login from '@/components/views/auth/Login'
import Courses from '@/components/views/admin/Courses'
import ListCourses from '@/components/views/admin/ListCourses'
import UpsertCourse from '@/components/views/admin/UpsertCourse'

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
    meta: {
      requiresAuth: true,
      adminMenu: true
    },
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
      },
      {
        path: 'courses',
        name: 'Courses',
        component: Courses,
        meta: {
          requiresAuth: true,
          menuOrder: 2,
          menuTitle: 'Courses',
          menuIcon: 'far fa-bookmark'
        },
        children: [
          {
            path: 'list-courses',
            name: 'ListCourses',
            component: ListCourses,
            meta: {
              requiresAuth: true,
              menuOrder: 1,
              menuTitle: 'List Courses',
              menuIcon: 'fas fa-tachometer-alt'
            }
          },
          {
            path: 'upsert-course/:id?',
            name: 'UpsertCourse',
            component: UpsertCourse,
            meta: {
              requiresAuth: true,
              menuOrder: 1,
              menuTitle: 'Course',
              menuIcon: 'fas fa-tachometer-alt'
            }
          }
        ]
      }
    ]
  }
]
export default routes
