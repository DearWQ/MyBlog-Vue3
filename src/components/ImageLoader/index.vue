<template>
  <div class="imageLoader-container">
    <img v-if="!everythingDone" class="placeholder" :src="placeholder" alt="">
    <img @load="dealLoad"
         class="origin"
         :src="src"
         :style="{opacity:originOpacity,transition:`${duration}ms`}" alt="">
  </div>
</template>

<script>
import {computed,ref} from "vue";

export default {
  name: "imageLoader",
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  setup(props){
    const everythingDone=ref(false)
    const originLoaded=ref(false)
    const originOpacity=computed(()=>{
      return originLoaded.value?1:0;
    })
    const dealLoad=()=>{
      originLoaded.value=true;
      setTimeout(()=>{
        everythingDone.value=true
      },props.duration)
    }
    return {
      dealLoad,
      everythingDone,
      originLoaded,
      originOpacity,
    }
  }

}
</script>

<style scoped lang="less">
@import "public/style/mixin";
.imageLoader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img{
    .self-fill();
    object-fit: cover;
  }
  .placeholder{
    filter: blur(2vw);
  }
}
</style>