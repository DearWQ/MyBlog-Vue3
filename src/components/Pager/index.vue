<!-- 参数详细请看该组件描述-->

<template>
  <div class="pager-container" v-if="totalPage>1">
    <div class="pager-left"><span>当前第 {{curPage}} 页 / 总共 {{totalPage}} 页</span></div>
    <div class="pager-right">
      <a @click="handleClick(n)" v-for="n in number" :class="{active:n===curPage}" :key="n">{{ n }}</a>
      <a @click="handleClick(1)" :class="{disabled:curPage===1}">首页</a>
      <a @click="handleClick(curPage-1)" :class="{disabled:curPage===1}">上一页 </a>
      <a @click="handleClick(curPage+1)" :class="{disabled:curPage===totalPage}">下一页</a>
      <a @click="handleClick(totalPage)" :class="{disabled:curPage===totalPage}">尾页</a>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "Pager",
  props: {
    curPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    visibleNumber: {
      type: Number,
      default: 10
    }
  },
  setup(props, ctx) {

    const totalPage = computed(() => {
      return Math.ceil(props.total / props.limit)
    });

    const minNum = computed(() => {
      let min = props.curPage - Math.floor(props.visibleNumber / 2);
      if (min < 1) {
        min = 1
      }
      return min
    })

    const maxNum = computed(() => {
      let max = minNum.value + props.visibleNumber - 1
      if (max > totalPage.value) {
        max = totalPage.value
      }
      return max
    })

    const number = computed(() => {
      let nums = [];
      for (let i = minNum.value; i <= maxNum.value; i++) {
        nums.push(i);
      }
      return nums
    })

    const handleClick = (newPage) => {
      if(newPage<1){
        newPage=1;
      }
      if(newPage>totalPage.value){
        newPage=totalPage.value;
      }
      if(newPage===props.curPage){
        return;
      }
      ctx.emit("pageChange",newPage)
    }
    return {
      totalPage,
      number,
      minNum,
      maxNum,
      handleClick
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../public/style/globalColor.less";

.pager-container {
  display: flex;
  margin: 20px 0;
  height: 30px;
  justify-content: space-between;
  line-height: 30px;
  .pager-left{
    color: @fontColor;
  }
  .pager-right{
    display: flex;
    justify-content: center;
    a {
      text-align: center;
      width: 60px;
      color: @fontColor;
      cursor: pointer;
      &:hover{
        color: @hover;
      }
      &.disabled {
        color: @lightWords;
        cursor: not-allowed;
      }

      &.active {
        color: @lightWords;
        font-weight: bold;
        cursor: text;
      }
    }
  }

}
</style>