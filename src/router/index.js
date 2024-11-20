import { createRouter, createWebHistory } from 'vue-router'
import NewSaleView from '../views/NewSaleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewSaleView,
    },
    {
      path: '/customer-creation',
      name: 'customerCreation',
      component: () => import('../views/CustomerCreationView.vue'),
    },
    {
      path: '/view-sales',
      name: 'viewSales',
      component: () => import('../views/ViewSalesView.vue'),
    },
    {
      path: '/product-creation',
      name: 'productCreation',
      component: () => import('../views/ProductCreationView.vue'),
    },
  ],
})

export default router
