<template>
  <div class="login">
    <!-- 居中的盒子 -->
    <div class="box">
      <!-- 标题 -->
      <h2>用户登录</h2>
      <!-- 饿了么ul表单组件 -->
      <el-form
        label-position="top"
        label-width="80px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button type="success" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证 规则
      rules: {
        // required:必须   message:提示信息  trigger:触发 触发方式  min:最小  max:最大
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 3 到 12个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6到 12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //表单提交
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //成功
          let res = await this.$axios.post("login", this.loginForm);
          // console.log(res);
          if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg);
          } else if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg);
            //缓存数据
            window.sessionStorage.setItem('token',res.data.data.token)
          // 跳主页
          this.$router.push('/')
          }
        } else {
          //失败
          this.$message.error("数据格式错误");
          return false;
        }
      });
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  .box {
    width: 550px;
    height: 420px;
    // 怪异盒模型
    box-sizing: border-box;
    background-color: white;
    padding: 35px;
    .my-btn {
      width: 100%;
    }
  }
}
</style>
