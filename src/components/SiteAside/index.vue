<template>
  <div class="siteAside-container">
    <template v-if="userInfo.author">
      <Avatar :url="userInfo.author.avatar" />
      <h1 class="title" @click="toLogin">{{ userInfo.author.siteTitle }}</h1>
      <MyMenu :menuList="menuList"/>
      <Contact :author="userInfo.author"/>
      <p class="footer">
        {{ userInfo.author.icp }}
      </p>
    </template>

  </div>
</template>

<script>
import Avatar from "../Avatar/index.vue"
import MyMenu from "./MyMenu/index.vue"
import Contact from "./Contact/index.vue"
import {ref, reactive, computed} from "vue";
import {userInfo} from "../../store/user";
import {useRouter} from "vue-router";

export default {
  name: "index",
  components: {Avatar, MyMenu, Contact},
  setup() {
    const menuList = reactive([
      {
        name: "homePage",
        title: "首页",
        icon: "home",
        exact: true,
      },
      {
        name: "Blog",
        title: "文章",
        icon: "blog",
        exact: false,
      },
      {
        name: "Project",
        title: "项目",
        icon: "code",
        exact: true,
      },{
        name: "About",
        title: "关于我",
        icon: "about",
        exact: true,
      },
      {
        name: "Message",
        title: "留言板",
        icon: "chat",
        exact: true,
      }
    ]);
    const router=useRouter()
    const toLogin=()=>{
      router.push({name:"login"})
    }
    return {
      menuList,
      userInfo,
      toLogin
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor.less";
.siteAside-container{
  width: 100%;
  height: 100%;
  background: @dark;
  border-right: 1px solid rgba(255, 255, 255, 0.24);
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container{
  margin: 0 auto;
}
.title{
  text-align: center;
  font-size: 1em;
  color: #fff;
  padding-top: 6%;
  cursor: pointer;
}
.footer {
  text-align: center;
  font-size: 12px;
  color: #7f7575;
}


div::-webkit-scrollbar{
  width:10px;
  height:10px;
  /**/
}
div::-webkit-scrollbar-track{
  background: @dark;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: darken(@words,4%);
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background:darken(@words,3%);
}
div::-webkit-scrollbar-corner{
  background: darken(@words,2%);
}
</style>