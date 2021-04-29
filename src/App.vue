<template>
  <canvas id="canvas"></canvas>
  <router-view/>
</template>

<script>

import {onMounted} from "vue";
import drawStart from "./utils/FiftyCentsSpecialEffects/drawMouseStar";
export default {
  name: 'App',
  setup(){
    onMounted(()=>{
      //绘制鼠标星星
      drawStart(document.querySelector("#canvas"))
    })
  }
}
</script>
