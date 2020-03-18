<template>
  <div class="dashboard-editor-container">
    <!--统计信息-->
    <PanelGroupView :data="panelTotalData" @handleSetLineChartData="handleSetLineChartData" />

    <!--折线图-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChartView :chartData="lineChartData"></LineChartView>
    </el-row>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import PanelGroupView from "./components/PanelGroupView";
import LineChartView from "./components/LineCharView";

export default {
  name: "Dashboard",
  components: {
    PanelGroupView,
    LineChartView
  },
  data() {
    return {
      lineChartData: null,
      panelTotalData:null,
      type: "userInfo"
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  //控制数据
  methods: {
    //当点击面板切换折线图
    handleSetLineChartData(type) {
      this.type = type;
      this.queryStatistics(type);
    },
    //查询统计信息
    queryStatistics(type) {
      this.$store
        .dispatch("statistics/query", type)
        .then(res => {
          this.lineChartData = res;
        })
        .catch(err => {
          new Error(res);
        });
    },
    //查询面板的统计信息
    queryPanelTotal(){
      this.$store
      .dispatch("statistics/panelTotal")
      .then(res=>{
        this.panelTotalData=res
      })
      .catch(err=>{
        new Error(err);
      })
    }
  },
  mounted() {
    console.log("渲染")
    this.queryPanelTotal()
    //请求获取统计信息数据（默认为用户统计信息）
    this.$nextTick(function(){
      this.queryStatistics(this.type)
    })
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: #fff;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
