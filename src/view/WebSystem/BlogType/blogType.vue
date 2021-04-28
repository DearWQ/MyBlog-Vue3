<template>
  <div class="blogList-container">
    <el-table v-loading="isLoading"
              :data="blogInfo.list"
              border
              height="600"
              style="width: 100%">
      <el-table-column
          prop="序号"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          prop="name"
          label="类型名字"
          align="center">
      </el-table-column>
      <el-table-column
          prop="articleCount"
          align="center"
          label="文章数量">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import ArticleList from "../../../components/ArticleList/index.vue"
import {getBlogType} from "../../../api/blog";
import {reactive, ref} from "vue";
import Pager from "../../../components/Pager/index.vue"
import {ElMessage} from "element-plus";

export default {
  name: "blogType",
  components: {ArticleList, Pager},
  setup() {
    let blogInfo = reactive({
      total: 0,
      list: null,
    })
    const isLoading = ref(true)
    //初始化数据
    const initData = (param) => {
      isLoading.value = true;
      getBlogType(param).then(res => {
        console.log(res)
        blogInfo.list = res;
        isLoading.value = false;
      })
    }
    initData();
    const handleEdit = (index, row) => {
      console.log(index, row);
      ElMessage.warning("正在开发中")
    }
    const handleDelete = (index, row) => {
      console.log(index, row);
      ElMessage.warning("正在开发中")
    }
    return {
      blogInfo,
      handleEdit,
      handleDelete,
      isLoading,
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.blogList-container {
  width: 100%;
  height: 100%;
  padding: 1% 2% 0;
  box-sizing: border-box;
  position: relative;
}

.pager-container {
  width: 90%;
  position: absolute;
  left: 20px;
  right: 0;
  bottom: 2px;
}
</style>