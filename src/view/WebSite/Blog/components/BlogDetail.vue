<template>
  <div class="blogDetail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期：{{ formatDate(blog.createDate) }}</span>
      <span>浏览：{{ blog.scanNumber }}</span>
      <span>评论：{{ blog.commentNumber }}</span>
      <span>{{ blog.category.name }}</span>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import formatDate from "../../../../utils/formatDate";

export default {
  name: "BlogDetail",
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      formatDate,
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";
.blogDetail-container{
  .aside{
    font-size: 12px;
    color: @gray;
    span{
      margin-left: 12px;
    }
  }
}
.markdown-body{
  margin: 1em 0;
}
</style>