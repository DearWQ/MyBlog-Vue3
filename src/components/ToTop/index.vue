<template>
  <div v-show="isShow" @click="backToTop" class="toTop-container"></div>
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
  width: 120px;
  height: 170px;
  position: fixed;
  background: url("/images/website/toTop.gif");
  background-size: 100% 100%;
  object-fit: cover;
  z-index: 99;
  right: 30px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: #fff;
  text-align: center;
}

</style>