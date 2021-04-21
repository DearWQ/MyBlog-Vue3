<template>
  <div class="empty-container">
    <Icon type="empty"></Icon>
    <p>{{text}}</p>
  </div>
</template>

<script>
import Icon from "../Icon/index.vue"
export default {
  name: "index",
  components:{Icon},
  props:{
    text:{
      type:String,
      default:"无数据"
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/mixin";
@import "public/style/globalColor";
  .empty-container{
    .self-center();
    color: @gray;
    text-align: center;
  }
.icon-container{
  font-size: 72px;
}
</style>