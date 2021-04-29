<template>
  <div class="header-container">
    <div class="header-title" @click="toHome">My Wold</div>
    <div class="header-user">
      <span>Admin</span>
      <span class="loginOut" @click="handleLoginOut">退出</span>
    </div>

  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "index",
  setup(){
    const router=useRouter()
   const handleLoginOut=()=>{
     router.push({name:"login"})
   }
   const toHome=()=>{
     router.push({name:"Home"})
   }
    return {
      handleLoginOut,
      toHome
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 2%;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.24);
  color: #fff;
  .header-title{
    font-size: 20px;
    width: 100px;
    cursor: pointer;
    &:hover{
      color: @hover;
    }
  }
  .header-user{
    width: 100px;
    display: flex;
    justify-content: space-around;
    span{
      line-height: 60px;
      cursor: pointer;
      &:hover{
        color: @hover;
      }
    }
    .loginOut{

    }
  }
}
</style>