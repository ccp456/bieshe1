import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/pages/layout/index'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/home',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/pages/home/index'),
      meta: []
    },
    {
      path: '/audience',
      component: resolve => require(['@/pages/static/audience'], resolve),
      meta: ['数据统计', '观众统计']
    },
    {
      path: '/channel',
      component: resolve => require(['@/pages/static/channel'], resolve),
      meta: ['数据统计', '销售渠道']
    },
    {
      path: '/national',
      component: resolve => require(['@/pages/static/national'], resolve),
      meta: ['数据统计', '全国统计']
    },
    {
      path: '/tag',
      component: resolve => require(['@/pages/static/tag'], resolve),
      meta: ['数据统计', '热门标签']
    },
    {
      path: '/manage',
      component: resolve => require(['@/pages/video/manage'], resolve),
      meta: ['影片管理', '排片管理']
    },
    {
      path: '/salestatic',
      component: resolve => require(['@/pages/video/salestatic'], resolve),
      meta: ['影片管理', '销售统计']
    },
    {
      path: '/message',
      component: resolve => require(['@/pages/online/message'], resolve),
      meta: ['线上营销', '短信营销']
    },
    {
      path: '/onactive',
      component: resolve => require(['@/pages/online/onactive'], resolve),
      meta: ['线上营销', '活动管理']
    },
    {
      path: '/onout',
      component: resolve => require(['@/pages/online/onout'], resolve),
      meta: ['线上营销', '活动支出']
    },
    {
      path: '/wechat',
      component: resolve => require(['@/pages/online/wechat'], resolve),
      meta: ['线上营销', '微信营销']
    },
    {
      path: '/wechat',
      component: resolve => require(['@/pages/online/wechat'], resolve),
      meta: ['线上营销', '微信营销']
    },
    {
      path: '/offactive',
      component: resolve => require(['@/pages/off/offactive'], resolve),
      meta: ['线下营销', '活动管理']
    },
    {
      path: '/offout',
      component: resolve => require(['@/pages/off/offout'], resolve),
      meta: ['线下营销', '活动管理']
    }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['@/pages/login'], resolve)
  }]
})

export default router
