<template>
  <div class="wrap-container">
    <ul>
      <li>
        <img class="facade" src="" width="200" height="300" alt="">
        <img class="obverse" src="" width="200" height="300" alt="">
      </li>
      <li>
        <img class="facade" src="" width="200" height="300" alt="">
        <img class="obverse" src="" width="200" height="300" alt="">
      </li>
      <li>
        <img class="facade" src="" width="200" height="300" alt="">
        <img class="obverse" src="" width="200" height="300" alt="">
      </li>
      <li>
        <img class="facade" src="" width="200" height="300" alt="">
        <img class="obverse" src="" width="200" height="300" alt="">
      </li>
      <li>
        <img class="facade" src="" width="200" height="300" alt="">
        <img class="obverse" src="" width="200" height="300" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "index"
}
</script>

<style scoped lang="less">
.wrap-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-around;

    li {
      width: 200px;
      height: 300px;
      list-style: none;

      &:nth-child(2n) {
        transform: translateY(40px);
      }

      .facade {
        position: absolute;
        transition: transform 400ms;
        backface-visibility: hidden;
      }

      &:hover {
        .obverse {
          transform: rotateY(0deg);
        }

        .facade {
          transform: rotateY(-180deg);
        }
      }

      .obverse {
        position: absolute;
        transition: transform 400ms;
        transform: rotateY(-180deg);
        backface-visibility: hidden;
      }
    }
  }
}
</style>
