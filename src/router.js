import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/question/category/:id', name: 'Question', component: () => import('@/views/QuestionPage.vue') },
  { path: '/category/:id/gamedifficulty', name: 'GameDifficulty', component: () => import('@/views/GameDifficulty.vue') },
  { path: '/question/category/:id/:difficulty', name: 'QuestionPage', component: () => import('@/views/QuestionPage.vue') },
  { path: '/end-screen', name: 'NewGame', component: () => import('@/views/NewGame.vue') },
  { path: '/times-up', name: 'TimesUpPage', component: () => import('@/views/TimesUpPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
