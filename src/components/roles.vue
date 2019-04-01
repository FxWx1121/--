<template>
  <div class="users-container">
    <!-- 头部面包屑 -->
    <my-bread sectitle="权限管理" threetitle="角色列表"></my-bread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button type="default" @click="addFormVisible=true" plain>搜索</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="rolesList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column  label="角色名称" width="180"></el-table-column>
      <el-table-column  label="角色描述" width="180"></el-table-column>
       
      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
            plain
          ></el-button>
          <el-button
            @click="delOne(scope.row)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            @click="shouRole(scope.row)"
            type="warning"
            size="mini"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  name: "roles",
   data() {
       return {
           rolesList:[{},{}]
       }
   },
  
  methods: {
    //编辑点击事件
    async handleEdit(index, row) {
      // console.log(index);
      // console.log(row);
      let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);
      this.editForm = res.data.data;
      if (res.data.meta.status === 200) {
        //弹框
        this.editFormFormVisible = true;
      }
    },
    //删除用户
    delOne(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //axios
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
  },
 
};
</script>

<style lang="scss">
.users-container {
  background-color: #e9eef3;
  height: 100%;
}
</style>
