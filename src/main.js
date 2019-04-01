import Vue from "vue";
import App from "./App.vue";

//导入全局的面包屑
import myBread from "./components/myBread.vue"
Vue.component('my-bread',myBread)

//导入axios
import axios from "axios";
//设置全局样式
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;

// 导入全局样式
import "./assets/base.scss";

//导入饿了么ul
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// axio拦截器
// 请求拦截器
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config.headers.Authorization= window.sessionStorage.getItem("token")
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  function(response) {
    //统一设置弹框
    //成功状态码
    if([200,201,204].indexOf(response.data.meta.status)!=-1){
      Vue.prototype.$message.success(response.data.meta.msg)
    }else{
      //负责失败
      Vue.prototype.$message.warning(response.data.meta.msg)
    }
    
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(ElementUI);

Vue.config.productionTip = false;

//导入路由
import router from "./router";

new Vue({
  render: h => h(App),
  //挂载
  router
}).$mount("#app");
