<template>
  <nav class="menu-container">
    <template v-for="menu in menuList">
      <router-link
          :exact="menu.exact"
          :to="{ name: menu.name, }"
          active-class="selected"
          exact-active-class=""
      >
        <Icon :type="menu.icon"/>
        <span>{{ menu.title }}</span>
      </router-link>
    </template>

  </nav>
</template>

<script>
import Icon from "../../Icon/index.vue"
export default {
  name: "myMenu",
  components: {Icon},
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.menu-container {
  color: #fff;
  margin: 24px 0;

  a {
    padding: 0 50px;
    display: flex;
    align-items: center;
    height: 45px;
    &.selected {
      //background: @otherWord;
      background: darken(@words, 2%);
    }
    .iconfont {
      width: 24px;
    }

    &:hover {
      color: @gray;
    }


  }

}
</style>