<template>
  <div class="home-container">
    <systemLayout>
      <template #header>
        <div class="header">
          <Header/>
        </div>
      </template>
      <template #left>
        <div class="aside">
          <SystemMenu :menuList="menuList"/>
          <MySelf/>
        </div>
      </template>
      <template #default>
        <router-view/>
      </template>
    </systemLayout>
<!--    <SystemWrap/>-->
  </div>
  <canvas id="systemSky"></canvas>
</template>

<script>
import drawSky from "../../utils/FiftyCentsSpecialEffects/drawStarrySky";
import systemLayout from "../../components/Layout/systemLayout.vue";
import Header from "../../components/Header/index.vue";
import MySelf from "../../components/MySelf/index.vue";
import SystemMenu from "../../components/SystemMenu/index.vue";
import Empty from "../../components/Empty/index.vue"
import BlogList from "../WebSystem/Blogs/blogList.vue";
import SystemWrap from "../../components/SystemWrap/index.vue"
import {onMounted, reactive} from "vue";

export default {
  name: 'home',
  components: {
    systemLayout,
    SystemMenu,
    Header,
    Empty,
    BlogList,
    MySelf,
    SystemWrap
  },
  setup() {
    const menuList = reactive([
      {
        id:1,
        name: "BlogList",
        title: "文章展示",
        isSelected:true,
      },
      {
        id:2,
        name: "BlogType",
        title: "类型分类",
        isSelected:false,
      },
      {
        id:3,
        isSelected:false,
        name: "ProjectList",
        title: "项目效果",
      },
      {
        id:4,
        show:false,
        name: "ReviewList",
        title: "留言评论",
      }
    ]);
    onMounted(()=>{
      drawSky(document.querySelector("#systemSky"))
    })
    return {
      menuList
    }
  }
}
</script>
<style lang="less">
@import "public/style/mixin";
@import "public/style/globalColor";

.home-container {
  .self-fill(fixed);
}
.header{
  height: 60px;
  width: 100%;
}
.container{
  height: calc(100% - 60px);
}
.aside {
  width: 200px;
  height: 100%;
}
</style>
