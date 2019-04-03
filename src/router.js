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

//规则
let routes = [
  {
    path: "/login",
    component: login
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

//暴露
export default router;

