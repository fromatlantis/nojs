import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/paths.css'
import 'whatwg-fetch'
import Paths from './Paths.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(Paths)
})
