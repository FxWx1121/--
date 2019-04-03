<template>
  <div class="users-container">
    <!-- 头部面包屑 -->
    <my-bread sectitle="订单管理" threetitle="订单列表"></my-bread>
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="rolesList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column label="是否付款" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==='0'" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-else type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="180">
        <template slot-scope="scope">{{scope.row.create_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- scope 是一个名字 -->
        <template slot-scope="scope">
          <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="dialogFormVisible=true"
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

    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      :current="sendData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 级联选择器 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="省市区" label-width="180px">
          <!-- 级联选择器 -->
          <el-cascader :options="options" v-model="selectedOptions"></el-cascader>
          <!-- v-distpicker实现 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="180px">
          <el-input placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入省市联动数据
import options from "../assets/city_data2017_element.js";
// 导入组件
import VDistpicker from 'v-distpicker'

export default {
  name: "orders",
  data() {
    return {
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      //弹框字段
      dialogFormVisible: false,
      //总条数
      total: 0,
      rolesList: [{}, {}],
      //渲染数据
      options,
      //级联选择权绑定
      selectedOptions: []
    };
  },
  // 本地注册组件
  components:{
    VDistpicker
  },

  methods: {
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      console.log(res);
      this.rolesList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(size) {
      //赋值
      this.sendData.pagesize = size;
      //重新获取数据
      this.getOrders();
    },
    currentChange(current) {
      //赋值
      this.sendData.pagenum = current;
      //重新获取数据
      this.getOrders();
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="scss">
.users-container {
  background-color: #e9eef3;
  height: 100%;
}
</style>
