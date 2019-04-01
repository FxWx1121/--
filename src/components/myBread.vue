<template>
    <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  //对外设置
  props: ["sectitle", "threetitle"]
};
</script>

<style lang='scss'>
  .my-bread {
    background-color: #d3dce6;
    height: 50px;
    line-height: 49px;
    padding-left: 10px;
  }
</style>
