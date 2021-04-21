<template>
  <Layout>
    <BlogList/>
    <template #right>
       <BlogCateGory/>
    </template>
  </Layout>
</template>

<script>
import Layout from "../../../components/Layout/index.vue"
import BlogList from "./components/BlogList.vue"
import BlogCateGory from "./components/BlogCategory.vue"
export default {
  name: "blog",
  components:{
    Layout,
    BlogList,
    BlogCateGory
  }
}
</script>

<style scoped>

</style>