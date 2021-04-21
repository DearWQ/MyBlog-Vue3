<template>
  <div class="blogTOC-container">
    <h2>目录</h2>
    <RightList :list="newList" @select="handleSelect"/>
  </div>
</template>

<script>
import RightList from "./RightList.vue";
import {computed, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import MyEventBus from "../../../../eventBus"
import debounce from "../../../../utils/debounce";

export default {
  name: "BlogTOC",
  components: {RightList},
  props: {
    tocList: {
      type: Array,
    }
  },
  setup(props) {
    //当前选中的锚点
    const curAnchor = ref("");
    //给目录列表添加是否选中属性，这里使用递归
    const newList = computed(() => {
      const getNewTOC = (toc = []) => {
        return toc.map(t => ({
          ...t,
          isSelect: t.anchor === curAnchor.value,
          children: getNewTOC(t.children)
        }))
      }
      return getNewTOC(props.tocList)
    })
    //获取需要跳转到的dom元素，就像a标签的使用href="#id"来获取id或者name属性跳转到当前页面的某个位置
    const getDomList = computed(() => {
      const domList = []
      //如何才能获取到跳转对应的id呢？可以从数据tocList中的anchor锚点获取，因为他就是跳转的关键，所以还得递归循环获取
      const addDom = (list) => {
        for (const t of list) {
          domList.push(document.getElementById(t.anchor))
          if (t.children && t.children.length > 0) {
            addDom(t.children)
          }
        }
      }
      addDom(props.tocList)
      return domList
    });
    //获取选中的锚点
    const selectDom = () => {
      curAnchor.value = "";//先清空
      //这里需判断该元素所处在区域，有可能在该区域上面，也有可能就在该区域，或者在该区域下方，这里设置该区域的高度
      const range = 200;
      for (const dom of getDomList.value) {
        if (!dom) {
          continue;
        }
        //获取元素到距离视口顶部的高度
        const top = dom.getBoundingClientRect().top;
        if (top > 0 && top <= range) {
          //该元素在规定范围内
          curAnchor.value = dom.id;
          return;
        } else if (top > range) {
          //在该范围的下面
          return;
        } else {
          //在该范围上方
          curAnchor.value = dom.id;
        }
      }
    }
    //选中右边哪个目录，更具描点跳到目录位置
    const handleSelect = (item) => {
      location.hash = item.anchor;
    }
    //定义一个函数 函数防抖中需要用到
    const newFn = ref(null)
    onMounted(() => {
      //事件总线监听滚动
      newFn.value = debounce(selectDom, 50)
      //使用事件总线监听主区域滚动
      MyEventBus.MyOn("mainScroll", selectDom)
    });
    onBeforeUnmount(() => {
      //事件总线移除监听事件
      MyEventBus.MyOff("mainScroll", selectDom)
    })
    return {
      newList,
      handleSelect,
    }
  }
}
</script>

<style scoped lang="less">
.blogTOC-container {
  width: 100%;

  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}

div::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  /**/
}

div::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 2px;
}

div::-webkit-scrollbar-thumb {
  background: #efecec;
  border-radius: 10px;
}

div::-webkit-scrollbar-thumb:hover {
  background: #efecec;
}

div::-webkit-scrollbar-corner {
  background: #efecec;
}
</style>