import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/login.css'
import 'whatwg-fetch'
import Login from './Login.vue'

Vue.use(ElementUI)

new Vue({
  el: '.container',
  render: h => h(Login)
})
