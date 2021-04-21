<template>
  <div class="blogComment-container">
    <MessageArea v-if="commentList"
                 title="评论列表"
                 :subTitle="`(${total})`"
                 :isListLoading="isLoading"
                 @submit="handleSubmit"
                 :list="commentList"/>
    <p class="loadMore" v-if="isLoading">~加载中~</p>
    <p class="moreBtn" v-if="!isLoading&&!isNoMore" @click="getMore">加载更多</p>
    <p class="noMore" v-if="isNoMore">~到底了哟~</p>
  </div>
</template>

<script>
import MessageArea from "../../../../components/MessageArea/index.vue"
import {getComments, sendComment} from "../../../../api/blog";
import {ref} from "vue";
import {useRoute} from "vue-router";

export default {
  name: "BlogComment",
  components: {MessageArea},
  setup() {
    //获取路由对象
    const route = useRoute();
    //定义接口参数
    const params = ref({
      blogId: route.params.id,
      pageNum: 1,
      pageSize: 10,
    });
    //是否加载完成
    const isLoading = ref(true);
    //是否还有数据加载
    const isNoMore = ref(false);
    //定义评价数据
    const commentList = ref(null);
    //定义评价总数
    const total = ref(0);
    //初始化列表数据
    const initData = (param, isMore = false) => {
      getComments(param).then(res => {
        if (res.rows.length < param.pageSize) {
          isNoMore.value = true;
        }
        commentList.value = isMore ? [...commentList.value, ...res.rows] : res.rows;
        total.value = res.total
        isLoading.value = false
      })
    }
    initData(params.value)
    //定价获取更多
    const getMore = () => {
      isLoading.value = true;
      params.value.pageNum++;
      initData(params.value, true)
    };
    //提交评价
    const handleSubmit = (formData, callback) => {
      if(formData.nickname&&formData.nickname){
        sendComment({
          blogId: route.params.id,
          nickname: formData.nickname,
          content: formData.content,
        }).then(res=>{
          //模拟数据加入数据后面，后续后台添加不需要前端操作
          commentList.value.unshift(res)
          total.value++
          callback("评论成功");
        })
      }

    }
    return {
      commentList,
      total,
      isNoMore,
      isLoading,
      getMore,
      handleSubmit,
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.blogComment-container {
  margin: 30px 0;
}

p {
  text-align: center;
}

.moreBtn {
  margin: 10px auto;
  display: block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid @gray;
  white-space: nowrap;

  &:hover {
    color: @hover;
    border: 1px solid @hover;
  }
}

</style>