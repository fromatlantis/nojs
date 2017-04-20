import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/bmap.css'
import 'whatwg-fetch'
import BMap from './BMap.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(BMap)
})
