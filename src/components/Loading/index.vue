<template>
  <img class="loading-container" src="../../assets/loading.svg" alt="">
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
@import "public/style/mixin";
.loading-container{
  .self-center();
}
</style>