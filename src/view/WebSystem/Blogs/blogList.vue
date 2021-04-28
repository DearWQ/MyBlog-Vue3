<template>
  <div class="blogList-container">
    <ArticleList :isLoading="isLoading" :table-list="blogInfo.list"/>
    <Pager v-if="!isLoading" :total="blogInfo.total" :cur-page="params.pageNum" @pageChange="pageChange"/>
  </div>

</template>

<script>
import ArticleList from "../../../components/ArticleList/index.vue"
import {getBlogList} from "../../../api/blog";
import {reactive, ref} from "vue";
import Pager from "../../../components/Pager/index.vue"

export default {
  name: "blogList",
  components: {ArticleList, Pager},
  setup() {
    let blogInfo = reactive({
      total: 0,
      list: null,
    })
    const isLoading=ref(true)
    const params = ref({
      pageNum: 1,
      pageSize: 10,
    })
    //初始化数据
    const initData = (param) => {
      isLoading.value = true;
      getBlogList(param).then(res => {
        console.log(res)
        blogInfo.list = res.rows;
        blogInfo.total = res.total;
        isLoading.value = false;
      })
    }
    initData(params.value);
    const pageChange = (val) => {
      params.value.pageNum = val
      initData(params.value);
    }

    return {
      pageChange,
      params,
      blogInfo,
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