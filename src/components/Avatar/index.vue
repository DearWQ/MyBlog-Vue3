<template>
  <img class="avatar-container" :src="url" :style="{width:size+'px',height:size+'px'}" @click="toLogin" alt="">
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "Avatar",
  props:{
    url:{
      type:String,
    },
    size:{
      type:Number,
      default:150
    },
  },
  setup(){
    const router=useRouter()
    const toLogin=()=>{
      router.push({name:"login"})
    }
    return{
      toLogin
    }
  }
}
</script>

<style scoped>
.avatar-container{
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>