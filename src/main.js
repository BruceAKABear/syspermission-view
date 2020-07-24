import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Axios from 'axios'

Axios.defaults.baseURL = 'http://127.0.0.1:8888'
Axios.interceptors.request.use(config => {
  console.log('拦截器中封装token')
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false
Vue.prototype.$http = Axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
