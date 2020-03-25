<template>
  <div class="app-container">
    <!--筛选栏-->
    <div class="filter-container">
      <!--搜索栏-->
      <el-input
        v-model="queryInfo.key"
        placeholder="订单编号"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <!--类型栏-->
      <el-select
        v-model="queryInfo.type"
        placeholder="类型"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>
      <!--搜索按钮-->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <!--下载excel-->
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
    </div>

    <!--展示栏-->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <!--编号栏-->
      <el-table-column label="编号" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <!--金额-->
      <el-table-column label="交易金额" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.money }}</span>
        </template>
      </el-table-column>

      <!--交易时间-->
      <el-table-column label="交易时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{row.payDate }}</span>
        </template>
      </el-table-column>
      <!--状态-->
      <el-table-column label="状态" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{row.type }}</span>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="getDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryInfo.page"
      :limit.sync="queryInfo.limit"
      @pagination="getList"
    />

    <!--详情页面-->
    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <el-table
        :data="orderDetail"
        ref="detailTable"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="编号" prop="id" align="center" width="80"></el-table-column>
        <!--金额-->
        <el-table-column label="交易金额" prop="money" width="200px" align="center"></el-table-column>

        <!--交易时间-->
        <el-table-column label="交易时间" prop="payDate" width="200px" align="center"></el-table-column>

        <!--状态-->
        <el-table-column label="状态" prop="type" width="150px" align="center"></el-table-column>

        <!--备注-->
        <el-table-column label="备注" prop="remark" width="150px" align="center"></el-table-column>

      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getOrderList, getOrder } from "@/api/order";
import waves from "@/directive/waves";

export default {
  name: "orderTabel",
  directives: { waves },
  components: {
    Pagination
  },
  data() {
    return {
      queryInfo: {
        page: 1,
        limit: 20,
        key: "",
        type: "",
        sort: "+id"
      },
      total: 0,
      typeList: [
        { key: "未支付", value: "unpaid" },
        { key: "已支付", value: "paid" }
      ],
      list: undefined,
      //小页面开关
      dialogFormVisible: false,
      //订单详情消息
      orderDetail:[]
    };
  },
  methods: {
    //点击搜索按钮触发
    handleFilter() {
      console.log("搜索");
    },
    //点击导出按钮触发
    handleDownload() {
      console.log("导出");
    },
    //点击列表排序
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    //排序
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    //查询列表消息
    getList() {
      getOrderList(this.queryInfo)
        .then(res => {
          const { total, dataList } = res.data;
          this.list = dataList;
          this.total = total;
        })
        .catch(err => {
          new Error(err);
        });
    },
    //点击详情按钮
    getDetail(row) {
      //清空以前存在的信息
      this.orderDetail=[]
      this.temp = Object.assign({}, row); // copy obj
      getOrder(row.id)
        .then(res => {
          this.orderDetail.push(res.data);
          this.dialogFormVisible = true;
        })
        .catch(res => {
          new Error(res);
        });
    }
  },
  //初始化
  created() {
    this.getList();
  }
};
</script>