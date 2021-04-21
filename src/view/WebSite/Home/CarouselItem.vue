<template>
  <div class="carouselItem-container"
       ref="container"
       @mousemove="mouseMoved"
       @mouseleave="mouseLeave">
    <div class="carousel-img" ref="img" :style="imagePosition">
      <ImageLoader :src="carousel.bigImg" :placeholder="carousel.midImg"/>
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "../../../components/ImageLoader/index.vue"
import {computed, onMounted, onUnmounted, ref} from "vue"

export default {
  name: "CarouseItem",
  components: {
    ImageLoader
  },
  props: ["carousel"],
  setup() {
    //title文字的宽度
    const titleWidth = ref(0);
    //desc文字的宽度
    const descWidth = ref(0);
    //获取标题dom
    const title = ref(null);
    //获取描述dom
    const desc = ref(null);
    //获取内容dom
    const container = ref(null);
    // 获取图片dom
    const img = ref(null);
    //实时container容器的宽和高
    const containerSize = ref({width: 0, height: 0});
    //实时图片的宽和高
    const imgSize = ref({width: 0, height: 0});
    //获取鼠标的横坐标
    const mouseX = ref(0);
    //获取鼠标的纵坐标
    const mouseY = ref(0);
    onMounted(() => {
      // 获取title的宽度
      titleWidth.value = title.value.clientWidth;
      //获取desc的宽度
      descWidth.value = desc.value.clientWidth;
      showWords();
      setSize();
      mouseX.value = center.value.x;
      mouseY.value = center.value.y;
      window.addEventListener("resize", setSize)
    })
    //调用该方法显示文字
    const showWords = () => {
      title.value.style.opacity = 1;
      title.value.style.width = 0;
      //强制让浏览器渲染
      title.value.clientWidth;
      title.value.style.transition = "1s";
      title.value.style.width = titleWidth.value + "px";

      desc.value.style.opacity = 1;
      desc.value.style.width = 0;
      //强制让浏览器渲染
      desc.value.clientWidth;
      desc.value.style.transition = "2s 1s";
      desc.value.style.width = descWidth.value + "px";
    };
    //设置各种尺寸
    const setSize = () => {
      containerSize.value = {
        width: container.value.clientWidth,
        height: container.value.clientHeight
      }
      imgSize.value = {
        width: img.value.clientWidth,
        height: img.value.clientHeight
      }
    }
    //设置图片的位置
    const imagePosition = computed(() => {
      const extraWidth = imgSize.value.width - containerSize.value.width;
      const extraHeight = imgSize.value.height - containerSize.value.height;
      const left = (-extraWidth / containerSize.value.width) * mouseX.value;
      const top = (-extraHeight / containerSize.value.height) * mouseY.value;
      return {
        transform:`translate(${left}px,${top}px)`,
      }
    })
    //获取中间坐标
    const center = computed(() => {
      return {
        x: containerSize.value.width / 2,
        y: containerSize.value.height / 2
      }
    })
    //获取鼠标的坐标
    const mouseMoved = (e) => {
      //获取容器的位置
      const rect = container.value.getBoundingClientRect();
      mouseX.value = e.clientX - rect.left;
      mouseY.value = e.clientY - rect.top;
    }
    const mouseLeave=()=>{
      mouseX.value=center.value.x;
      mouseY.value=center.value.y;
    }
    onUnmounted(() => {
      window.removeEventListener("resize", setSize)
    })
    return {
      desc,
      title,
      container,
      img,
      imagePosition,
      mouseMoved,
      mouseLeave
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.carouselItem-container {

  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;

}

.carousel-img {
  width: 110%;
  height: 110%;
  left: 0;
  right: 0;
  position: absolute;
  transition: 0.3s;
}

.title, .desc {
  position: absolute;
  left: 30px;
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, .5), -1px 0 0 rgba(0, 0, 0, .5), 0 1px 0 rgba(0, 0, 0, .5),0 -1px 0 rgba(0, 0, 0, .5);
  white-space: nowrap;
  overflow: hidden;
}

.title {
  top: calc(50% - 40px);
  font-size: 2em;
}

.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%);
}
</style>