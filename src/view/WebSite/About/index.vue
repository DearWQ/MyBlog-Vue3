<template>
  <div class="about-container" v-load="aboutInfo.isLoading||!srcLoaded">
    <iframe class="about-container" :src="aboutInfo.info" frameborder="0" @load="srcLoaded=true"></iframe>
  </div>

</template>

<script>
import {getAboutInfo,aboutInfo} from "../../../store/about";
import {ref} from "vue";

export default {
  name: "about",
  setup(){
    getAboutInfo();
    const srcLoaded=ref(false)
    return{
      aboutInfo,
      srcLoaded,
    }
  }
}
</script>

<style scoped lang="less">
.about-container{
  width: 100%;
  height: 100%;
  overflow:hidden;
  position: relative;
}
.about-content{
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>