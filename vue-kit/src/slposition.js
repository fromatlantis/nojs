import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/slposition.css'
import 'whatwg-fetch'
import SLPosition from './SLPosition.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(SLPosition)
})
