import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '@/views/Homepage'
import BookApp from '@/views/BookApp'
import BookDetails from '@/views/BookDetails'
import About from '@/views/About'
Vue.use(VueRouter)

const routes = [
  {
    path: '/book/:id',
    component: BookDetails,
  },
  {
    path: '/book',
    component: BookApp,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/',
    component: Homepage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
