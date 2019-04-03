import Vue from "vue";
import App from "./App.vue";

// 导入全局样式
import "./assets/base.scss";

//导入饿了么ul
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//导入全局的面包屑
import myBread from "./components/myBread.vue"
Vue.component('my-bread',myBread);

//导入moment
import moment from 'moment'
Vue.filter('formatTime',(value,formatTem)=>{
  return moment(value).format(formatTem)
})

//导入我的axios插件
import myaxios from './myaxios.js'
//use一下
Vue.use(myaxios)

Vue.config.productionTip = false;

//导入路由
import router from "./router";

new Vue({
  render: h => h(App),
  //挂载
  router
}).$mount("#app");
