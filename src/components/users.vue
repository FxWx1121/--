<template>
  <div class="users-container">
    <!-- 头部面包屑 -->
    <el-breadcrumb class="my-bread" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="sendData.query"
          @keyup.native.enter="search"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" @click="addFormVisible=true" plain>搜索</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <el-switch
            @change="stateChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
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
          <el-button type="warning" size="mini" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增对话框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑对象 -->
    <el-dialog title="修改用户" :visible.sync="editFormFormVisible">
      <el-form :model="editForm" :rules="addRules" ref="editForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editForm.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      //总条数
      total: 0,
      //接口数据
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //用户数组
      userList: [],
      //是否显示新增对话框
      addFormVisible: false,
      //是否显示编辑对话框
      editFormFormVisible: false,
      //新增表单提交
      addForm: {
        username: "张三",
        password: "123456",
        email: "12306@qq.com",
        mobile: "18339155966"
      },
      //编辑单提交
      editForm: {
        username: "三给",
        email: "12306@qq.com",
        mobile: "18339155966"
      },
      //新增表单验证规则
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度6-16之间", trigger: "blur" }
        ]
      }
    };
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
    //搜索用户
    async search() {
      let res = await this.$axios.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      // console.log(res);
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    },
    //状态改变
    stateChange(row) {
      //调用接口
      this.$axios.put(`users/${row.id}/state/${row.me_state}`);
    },
    //新增提交 提交事件
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
          //调用接口
          let res = await this.$axios.post("users", this.addForm);
          //如果新增成功,重新获取用户列表
          // console.log(res);
          if (res.data.meta.status === 201) {
            this.search();
          }
          //关闭弹框
          this.addFormVisible = false;
        } else {
          this.$message.error("请重新输入");
          return false;
        }
      });
    },
    //保存修改
    async submitAdd(formName) {
      //发请求
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.search();
      }
      //关闭弹框
      this.editFormFormVisible = false;
    },
    //删除用户
    delOne(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async() => {
          //axios
          let res=await this.$axios.delete(`users/${row.id}`);
          if(res.data.meta.status===200){
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  //接口调用
  created() {
    this.search();
  }
};
</script>

<style lang="scss">
.users-container {
  background-color: #e9eef3;
  height: 100%;
  .my-bread {
    background-color: #d3dce6;
    // height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
}
</style>
