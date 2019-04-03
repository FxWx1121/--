<template>
  <!-- 整体容器 -->
  <el-container class="index-container">
    <!-- 头部容器 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 左边内容 -->
      <el-aside width="200px" class="my-aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="it in item.children">
              <span class="el-icon-menu"></span>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主题区域 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      //菜单列表
      menuList: []
    };
  },
  methods: {
    logout() {
      //删除缓存
      window.sessionStorage.removeItem("token");
      //编程式导航 去登陆页
      this.$router.push("/login");
    }
  },
  //不需要获取组件的数据,只是缓存数据 跟组建无关
  beforeCreate() {
    // if (window.sessionStorage.getItem("token")) {
    // } else {
    //   // 进行登录判断
    //   this.$message.error("请先登录");
    //   //没有token返回登录页面
    //   this.$router.push("/login");
    // }
  },
  //钩子函数
  async created() {
    let res = await this.$axios.get("menus");
    console.log(res);
    this.menuList = res.data.data;
  }
};
</script>

<style lang='scss'>
.index-container {
  display: flex;
  height: 100%;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
      color: #fff;
    }
  }
}
.my-container {
  flex: 1;
  .my-aside {
    background-color: skyblue;
  }
  .my-main {
    //   height: 100%;
    background-color: #e8edf3;
  }
}
</style>
