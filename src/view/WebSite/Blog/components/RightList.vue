<template>
  <ul class="rightList-container">
    <li v-for="(item,i) in list"  :key="i">
      <span @click="handleClick(item)" :class="{active:item.isSelect}">{{item.name}}</span>
      <span @click="handleClick(item)" v-if="item.aside" class="aside" :class="{active:item.isSelect}">{{item.aside}}</span>
      <RightList :list="item.children" @select="handleClick"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RightList",
  props:{
    list:{
      type:Array,
      default:()=>[]
    }
  },
  setup(props,ctx){
    const handleClick=(item)=>{
      if(!item.isSelect){
        ctx.emit("select",item)
      }
    }
    return{
      handleClick,
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";
.rightList-container{
  list-style: none;
  padding: 0;
  .rightList-container{
    margin-left: 1em;
  }
  li{
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;
    .active{
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1.2em;
  color: @gray;
}
</style>