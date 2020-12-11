import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//1:这个是自己注册
import toast from "./components/common/toast"
//2:安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
