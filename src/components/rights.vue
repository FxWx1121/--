<template>
  <div class="users-container">
    <!-- 头部面包屑 -->
    <my-bread sectitle="权限管理" threetitle="权限列表"></my-bread>
    
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="rightsList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column  label="权限名称" width="180"></el-table-column>
      <el-table-column  label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" width="180"></el-table-column>
       
    </el-table>
</div>
</template>

<script>
export default {
  name: "rights",
  data() {
      return {
          rightsList:[{},{}]
      }
  },
};
</script>

<style lang="scss">
.users-container {
  background-color: #e9eef3;
  height: 100%;
}
</style>
