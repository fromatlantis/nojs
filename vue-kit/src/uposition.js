import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/uposition.css'
import 'whatwg-fetch'
import UPosition from './UPosition.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(UPosition)
})
