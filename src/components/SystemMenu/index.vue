<template>
  <nav v-if="menuList.length>0" class="menu-container">
    <template v-for="menu in list">
      <div class="menu" @click="selectedMenu(menu)" :class="{'selected':menu.isSelected}">
        <span>{{ menu.title }}</span>
      </div>
    </template>

  </nav>
</template>

<script>

import {useRouter} from "vue-router";
import {computed, reactive} from "vue";

export default {
  name: "systemMenu",
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const list = computed(() => {
      return props.menuList
    })
    const selectedMenu = (menu) => {
      list.value.forEach(item=>{
        item.isSelected=item.id===menu.id
      })
      router.push({name: menu.name})
    }
    return {
      selectedMenu,
      list
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.menu-container {
  width: 100%;
  height: 100%;
  color: @fontColor;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.24);
  .menu {
    padding: 0 50px;
    display: flex;
    align-items: center;
    height: 45px;
    cursor: pointer;
    &.selected {
      //background: @otherWord;
      background: darken(@words, 2%);
    }

    &:hover {
      color: @gray;
    }

  }

}
</style>