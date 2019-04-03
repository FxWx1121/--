import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//导入组建
import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/users.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import goods from "./components/goods.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import params from "./components/params.vue";
import reports from "./components/reports.vue";
import error from "./components/error.vue";

//规则
let routes = [
  //错误信息
  {
    path: "/error",
    component: error,
  },
  {
    path: "/login",
    component: login,
    //路由元信息
    meta:{
      //不需要登录吗
      nologin :true
    }
  },
  {
    path: "/",
    component: index,
    //嵌套路由
    children: [
      {
        path: "users",
        component: users
      },
      {
        path: "roles",
        component: roles
      },
      {
        path: "rights",
        component: rights
      },
      {
        path: "goods",
        component: goods
      },
      {
        path: "categories",
        component: categories
      },
      {
        path: "orders",
        component: orders
      },
      {
        path: "params",
        component: params
      },
      {
        path: "reports",
        component: reports
      },
    ]
  }
];

//实例化路由对象
let router = new VueRouter({
  routes
});


//注册全局前置守卫(导航守卫)
router.beforeEach((to,from,next)=>{
  // console.log(to)
  // console.log(from)
  // next()
  // if(to.path==='/login'){

  //如果没有匹配
  if(to.matched.length===0){
    // 提示
    Vue.prototype.$message.error('傻逼,地址错了')
    //没有匹配
    next('/error')
  }
   
  if(to.meta.nologin===true){  
    // 直接去
    next()
  }else{
    // 不是登录页 判断是否有token
    if(window.sessionStorage.getItem('token')){
      // 存在 过去
      next()
    }else{
      // 弹框
      Vue.prototype.$message.error('你没有登录！')
      // 不存在 打会登录页
      next('/login')
    }
  }

})
//暴露
export default router;

