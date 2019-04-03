//导入axios
import axios from "axios";
//导入router
import router from "./router";
export default {
  install(Vue) {
    //设置基地址
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
    //axios拦截器
    //请求拦截器
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        config.headers.Authorization = window.sessionStorage.getItem("token");
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
        //非法token判断
        if (
          response.data.meta.msg === "无效token" &&
          response.data.meta.status === 400
        ) {
          //打回登录
          Vue.prototype.$message.warning("伪造token");
          //删除伪造
          window.sessionStorage.removeItem("token");
          //去登陆页
          router.push("/login");
          //用return方式阻止
          return;
        }

        //统一设置弹框
        //成功状态码
        if ([200, 201, 204].indexOf(response.data.meta.status) != -1) {
          Vue.prototype.$message.success(response.data.meta.msg);
        } else {
          //负责失败
          Vue.prototype.$message.warning(response.data.meta.msg);
        }

        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );

    //设置原型
    Vue.prototype.$axios = axios;
  }
};
