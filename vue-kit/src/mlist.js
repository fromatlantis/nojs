import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/plist.css'
import 'whatwg-fetch'
import MList from './MList.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(MList)
})
