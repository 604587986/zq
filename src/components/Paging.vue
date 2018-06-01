<template>
  <div id="paging">
    <center>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPaging.currentPage" :page-sizes="currentPaging.pageSizes" :page-size="currentPaging.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="currentPaging.totals">
      </el-pagination>
    </center>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    currentPaging: {}
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.$emit('sizeChange',val)
    },
    handleCurrentChange(val) {
      this.$emit('currentChange',val)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#paging {
  width: 100%;
  margin-top: 40px;
  margin-bottom: 10px;
}
</style>