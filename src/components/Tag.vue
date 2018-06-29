<template>
    <div class="tag">
        <el-tag
            class="tag-item"
            v-for="(tag,index) in tags"
            :key="tag.id"
                type="success"
            closable
            @close='delTag(index)'>
            {{tag.title}}
        </el-tag>
        <el-select v-model="tagValue" placeholder="选择标签" size="mini" @change="addTag" value-key="value">
            <el-option v-for="item in tagList" :key="item.id" :label="item.title" :value="item"></el-option>
        </el-select>
        <el-button @click="createTag">新建标签</el-button>
    </div>
</template>
<script>
export default {
  name: "tag",
  data() {
    return {
      //从服务器获得的标签列表
      tagList: [
        {
          id: 1,
          title: " 标签一"
        },
        {
          id: 2,
          title: " 标签二"
        },
        {
          id: 3,
          title: " 标签三"
        }
      ],
      tagValue: "",
      //当前已选择的标签
      tags: []
    };
  },
  methods: {
    // 添加标签
    addTag(val) {
      !this.tags.includes(val) && this.tags.push(val);
      this.tagValue = null;
    },
    // 删除标签
    delTag(i) {
      this.tags.splice(i, 1);
    },
    // 新建标签
    createTag() {
      this.$prompt("请输入标签名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "不能为空"
      })
        .then(({ value }) => {
          const newTag = { id: 999, title: value };
          this.tags.push(newTag);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  watch: {
    tags:function(val){
        this.$emit('change',val)
    }
  }
};
</script>
<style lang="less">
.tag {
  .tag-item {
    margin-right: 10px;
  }
}
</style>
