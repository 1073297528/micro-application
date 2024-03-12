import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'about'
      }
    },
    {
      path: '/',
      name: '/root',
      component: Layout,
      children: [
        // 关于
        {
          path: 'about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue')
        },
        // 微应用
        {
          path: '/childPath/:page*',
          name: 'childPath',
          component: () => import('../views/AboutView.vue')
        }
      ]
    }
  ]
})

export default router
