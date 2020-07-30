import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Welcome from '../views/Welcome'
import UserList from '../views/user/UserList'
import RoleList from '../views/roleperm/RoleList'
import PermList from '../views/roleperm/PermList'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/userlist',
          name: 'Userlist',
          component: UserList
        },
        {
          path: '/roleList',
          name: 'RoleList',
          component: RoleList
        },
        {
          path: '/permList',
          name: 'PermList',
          component: PermList
        }
      ]
    }
  ]
})

// 挂载路由守卫  next放行函数
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  } else {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      return next('/login')
    }
    next()
  }
})

export default router
