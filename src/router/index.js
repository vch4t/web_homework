import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainwindow',
      component: ()=>import('@/views/MainWindow.vue'),
      children: [{
        path: '/',
        name: 'aritcleview',
        component: ()=>import('@/views/ArticleView.vue'),//文章页面
      },{
        path: '/article/:articleId',
        name: 'articleId',
        component: ()=>import('@/views/DetailView.vue'),//文章详情页
      },{
        path: '/newPost',
        name: 'postarticle',
        component: ()=>import('@/views/PostView.vue'),//文章发送页
      }]
    }
  ]
})

export default router
