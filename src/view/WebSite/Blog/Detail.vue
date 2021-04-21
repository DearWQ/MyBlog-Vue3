<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-load="isLoading">
      <BlogDetail :blog="blog" v-if="blog"/>
      <BlogComment v-if="!isLoading"/>
    </div>
    <template #right>
      <div class="right-container" v-load="isLoading">
        <BlogTOC :tocList="blog.toc" v-if="blog"/>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "../../../components/Layout/index.vue"
import BlogTOC from "./components/BlogTOC.vue";
import BlogDetail from "./components/BlogDetail.vue";
import BlogComment from "./components/BlogComment.vue";
import {getBlog} from "../../../api/blog";
import {useRoute} from "vue-router";
import {ref, onUpdated} from "vue";
import "../../../../../public/style/markdown.css"
import "highlight.js/styles/github.css"
import mainScroll from "../../../utils/mainScroll";
import setWebTitle from "../../../utils/setWebTitle";
export default {
  name: "Detail",
  components: {Layout, BlogTOC, BlogDetail, BlogComment},
  setup() {
    const route = useRoute();
    const isLoading = ref(true)
    const blog = ref(null);
    const mainContainer = ref(null)
    getBlog(route.params.id).then(res => {
      blog.value = res;
      setWebTitle.setRouteTitle(res.title)
      isLoading.value = false;
    })
    // onUpdated(()=>{
    //   const hash = location.hash;
    //   location.hash = "";
    //   console.log("ces");
    //   location.hash = hash;
    // })
    mainScroll(mainContainer);

    return {
      isLoading,
      blog,
      mainContainer
    }
  },
}
</script>

<style scoped lang="less">
.main-container {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
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