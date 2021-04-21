<template>
  <div v-load="banner.isLoading"  class="home-container" ref="homeContainer" @wheel="mouseWheel">
    <template v-if="banner.carouselList">
      <ul class="carousel-container"
          :style="{marginTop}"
          @transitionend="transitionOver"
      >
        <li v-for="item in banner.carouselList" :key="item.id">
          <CarouseItem :carousel="item"/>
        </li>
      </ul>
      <div v-show="curCarousel>=1" @click="switchTo(curCarousel-1)" class="icon icon-up">
        <Icon type="arrowUp"/>
      </div>
      <div v-show="curCarousel<banner.carouselList.length-1" @click="switchTo(curCarousel+1)" class="icon icon-down">
        <Icon type="arrowDown"/>
      </div>
      <ul class="indicator">
        <li :class="{active:curCarousel===i}" v-for="(item,i) in banner.carouselList" :key="item.id"
            @click="switchTo(i)"></li>
      </ul>
    </template>
  </div>
</template>

<script>
import CarouseItem from "./CarouselItem.vue";

import Icon from "../../../components/Icon/index.vue"
import {ref, computed, onMounted, onUnmounted} from "vue";
import {getBanners, banner} from "../../../store/banner";

export default {
  name: "home",
  components: {CarouseItem, Icon},
  setup() {
    getBanners()
    //定义当前轮播页面
    const curCarousel = ref(0);
    //定义轮播内容高度
    const containerHeight = ref(0);
    //获取dom元素
    const homeContainer = ref(null);
    //是否正在翻页
    const isTurning = ref(false);
    //处理根据视口重新获取尺寸
    const dealReSize = () => {
      containerHeight.value = homeContainer.value.clientHeight;
    }
    //调用onMounted函数获取dom
    onMounted(() => {
      containerHeight.value = homeContainer.value.clientHeight;
      window.addEventListener("reSize", dealReSize);
    })
    //计算获取margin-top的值
    const marginTop = computed(() => {
      return -curCarousel.value * containerHeight.value + "px";
    })
    //轮播切换
    const switchTo = (index) => {
      curCarousel.value = index;
    }
    //鼠标滚轮滚动
    const mouseWheel = (e) => {
      if (isTurning.value) {
        return
      }
      if (e.deltaY < -5 && curCarousel.value > 0) {
        isTurning.value = true;
        curCarousel.value--;
      } else if (e.deltaY > 5 && curCarousel.value < banner.carouselList.length - 1) {
        isTurning.value = true;
        curCarousel.value++;
      }
    }
    //监听过度动画
    const transitionOver = () => {
      isTurning.value = false;
    }
    //销毁监听函数
    onUnmounted(() => {
      window.removeEventListener("reSize", dealReSize)
    })
    return {
      curCarousel,
      marginTop,
      homeContainer,
      banner,
      switchTo,
      mouseWheel,
      transitionOver
    }
  },
}
</script>

<style scoped lang="less">
@import "public/style/mixin";
@import "public/style/globalColor";

.home-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}

.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;

  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  .self-center();
  @gap: 25px;
  color: @gray;
  cursor: pointer;
  transform: translateX(-50%);

  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }

  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }

  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
}

.iconfont {
  font-size: 30px;
}

.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;

  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;
    transition: 0.5s;

    &.active {
      background: #fff;
    }
  }
}

</style>