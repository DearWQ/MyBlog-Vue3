<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
import {computed} from "vue";

const classMap = {
  home: "iconzhuye",
  success: "iconzhengque",
  error: "iconcuowu",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconset_about_hov",
  weixin: "iconweixin",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconsign_qq",
  arrowUp: "iconiconfonticonfonti2copy",
  arrowDown: "iconiconfonticonfonti2",
  empty: "iconempty",
  chat: "iconliuyan",
};
export default {
  name: "Icon",
  props:{
    type:{
      type:String,
      required:true,
    }
  },
  setup(props){
    const fontClass= computed(()=>{
      return classMap[props.type]
    })

    return{
      fontClass,
    }
  }
}
</script>

<style scoped>
@import "http://at.alicdn.com/t/font_2164449_nalfgtq7il.css";
</style>