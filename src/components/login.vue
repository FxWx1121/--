<template>
  <div class="login">
      <!-- 居中的盒子 -->
    <div class="box">
        <!-- 标题 -->
      <h2>用户登录</h2>
      <!-- 饿了么ul表单组件 -->
      <el-form label-position="top" label-width="80px">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" type="primary">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
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
    .my-btn{
        width: 100%;
    }
  }
}
</style>
