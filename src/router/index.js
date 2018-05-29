import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Foo from '@/views/Foo'
import Bar from '@/views/Bar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      component: Home,
      meta: { title: 'Home' },
    },
    {
      path: '/Home/Foo',
      component: Foo,
      meta: { title: 'Foo' },
    },
    {
      path: '/Home/Bar',
      component: Bar,
      meta: { title: 'Bar' },
    },
    {
      path: '*',
      redirect: '/Home'
    },
  ]
})
