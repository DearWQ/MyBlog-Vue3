<template>
  <div class="list-container">
    <el-table v-loading="isLoading"
              :data="tableList"
              border
              height="600"
              style="width: 100%">
      <el-table-column
          prop="title"
          label="标题"
          align="center">
        <template #default="scope">
          <span>{{ titleFilter(scope.row.title) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="类型">
        <template #default="scope">
          <span>{{ scope.row.category.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="scanNumber"
          align="center"
          label="访问量">
      </el-table-column>
      <el-table-column
          prop="commentNumber"
          align="center"
          label="评论量">
      </el-table-column>
      <el-table-column
          label="日期"
          align="center"
          width="180">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
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
import {reactive, ref} from "vue";
import Pager from "../Pager/index.vue"
import {ElMessage} from "element-plus";

export default {
  name: "index",
  components: {Pager},
  props: {
    tableList: {type: Array},
    isLoading: {
      type: Boolean,
    }
  },
  setup() {
    const handleEdit = (index, row) => {
      console.log(index, row);
      ElMessage.warning("正在开发中")
    }
    const handleDelete = (index, row) => {
      console.log(index, row);
      ElMessage.warning("正在开发中")
    }
    const titleFilter = (val) => {
      if (val.length > 10) {
        return val.substring(0, 10) + "...";
      }
      return val
    }
    return {
      handleEdit,
      handleDelete,
      titleFilter
    }
  }
}
</script>

<style scoped lang="less">
.list-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>