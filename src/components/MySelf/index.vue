<template>
  <div class="mySelf-container"></div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
@import "public/style/globalColor.less";
.mySelf-container{
  width: 120px;
  height: 170px;
  position: fixed;
  background: url("/images/website/toTop.gif");
  background-size: 100% 100%;
  object-fit: cover;
  z-index: 99;
  left: 6px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  color: #fff;
  text-align: center;
}

</style>