<template>
  <div class="category-container" v-load="isLoading">
    <h2>文章分类</h2>
    <RightList :list="typeList" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getBlogType} from "../../../../api/blog";

export default {
  name: "BlogCategory",
  components: {RightList},
  setup() {
    //路由对象
    const route = useRoute();
    const router = useRouter();
    const isLoading = ref(true)
    const blogTypeList = ref([])
    const initData = () => {
      getBlogType().then(res => {
        blogTypeList.value = res
        isLoading.value = false
      })
    }
    initData();
    const categoryId = computed(() => {
      return +route.params.categoryId || -1;
    })
    const typeList = computed(() => {
      const totalArticle = blogTypeList.value.reduce((a, b) => a + b.articleCount, 0)
      const result = [
        {name: "全部", id: -1, articleCount: totalArticle}
        , ...blogTypeList.value];
      return result.map(it => ({
        ...it,
        isSelect: it.id === categoryId.value,
        aside:`${it.articleCount}篇`,
      }))
    })
    const pageSize=computed(()=>{
      return +route.query.pageSize || 10;
    })
    const handleSelect = (item) => {
      const query = {
        pageNum: 1,
        pageSize: pageSize.value
      }
      if (route.params.categoryId === -1) {
        router.push({
          name: "Blog",
          query,
        })
      } else {
        router.push({
          name: "CategoryBlog",
          params: {categoryId: item.id},
          query,
        })
      }
    }
    return {
      typeList,
      isLoading,
      handleSelect,
    }
  }
}
</script>

<style scoped lang="less">
.category-container {
  width: 300px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

div::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}

div::-webkit-scrollbar-thumb {
  background: #efecec;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #efecec;
}

div::-webkit-scrollbar-corner {
  background: #efecec;
}
</style>