import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'longlat',
  version: '2.1'
}

Vue.use(YmapPlugin, settings)

window.axios = require('axios')

Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  render: h => h(App)
})
