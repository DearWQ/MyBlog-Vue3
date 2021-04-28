<template>
  <div class="layout-container">
    <div class="header"><slot name="header"></slot></div>
    <div class="container">
      <div class="left">
        <slot name="left">左边</slot>
      </div>
      <div class="main">
        <slot></slot>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "systemLayout"
}
</script>

<style scoped lang="less">
.layout-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header{
    width: 100%;
  }
  .container{
    width: 100%;
    display: flex;
    .left{
      flex: 0 0 auto;
      overflow: hidden;
    }
    .main{
      flex:1 1 auto;
      overflow: hidden;
    }
  }
}
</style>