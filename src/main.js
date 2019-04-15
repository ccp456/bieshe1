// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'vuex'
import echarts from 'echarts'
import '@/assets/css/main.css'
import '@/assets/css/elpatch.css'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import './assets/css/main.scss'
import $ from 'jquery'

Vue.prototype.$echarts = echarts

Vue.component('chart', ECharts)

axios.defaults.baseURL = 'http://localhost:5000/'

Vue.config.productionTip = false

Vue.use(ElementUI, { locale }, axios, Vuex, $)
Vue.use(echarts)

/* eslint-disable no-new */
new Vue({
  $,
  el: '#app',
  echarts,
  axios,
  ElementUI,
  router,
  components: { App },
  template: '<App/>'
})
