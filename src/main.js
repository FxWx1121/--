import Vue from 'vue'
import App from './App.vue'

//导入axios
import axios from 'axios'
//设置全局样式
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
Vue.prototype.$axios = axios

// 导入全局样式
import './assets/base.scss'

//导入饿了么ul
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

Vue.config.productionTip = false

//导入路由
import router from "./router"

new Vue({
  render: h => h(App),
  //挂载
  router
}).$mount('#app')
