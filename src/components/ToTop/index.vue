<template>
  <div v-show="isShow" @click="backToTop" class="toTop-container">
    Top
  </div>
</template>

<script>
import eventBus from "../../eventBus";
import {onBeforeMount, onMounted, ref} from "vue";
export default {
  name: "index",
  setup(){
    const isShow=ref(false);
    const handleScroll=(dom)=>{
      isShow.value=dom&&dom.scrollTop>=500;
    };
    const backToTop=()=>{
      eventBus.MyEmit("setMainScroll", 0)
    }
    onMounted(()=>{
      eventBus.MyOn("mainScroll",handleScroll)
    })
    onBeforeMount(()=>{
      eventBus.MyOff("mainScroll",handleScroll)
    })
    return{
      isShow,
      backToTop
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor.less";
.toTop-container{
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  right: 50px;
  bottom: 50px;
  cursor: pointer;
  line-height: 50px;
  color: #fff;
  text-align: center;
}

</style>