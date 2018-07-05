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
import { tagList, createNewTag } from "@/api/tag/tag";

export default {
  name: "tag",
  data() {
    return {
      //从服务器获得的标签列表
      tagList: [],
      tagValue: "",
      //当前已选择的标签
      tags: []
    };
  },
  props: {
    receiveTags: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    this.getData();
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
          let data = { title: value, type: 1 };
          createNewTag(data).then(res => {
            if (res.data.code == 200) {
              this.tags.push(res.data.data);
              this.getData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 获取标签列表
    getData() {
      let data = { page: 0 };
      tagList(data).then(res => {
        if (res.data.code == 200 || res.data.code == 404) {
          this.tagList = res.data.data.list;
        }
      });
    }
  },
  watch: {
    tags: function(val) {
      let idList = [];
      for (let i in val) {
        idList.push(val[i].id);
      }
      idList = idList.join(",");
      this.$emit("change", idList);
    },
    receiveTags: function(val) {
      this.tags = val;
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
