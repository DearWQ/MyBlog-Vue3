<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
        title="留言板"
        :subTitle="`(${total})`"
        :isListLoading="isLoading"
        :list="messageList"
        @submit="submitMessage"
    />
    <p class="loadMore" v-if="isLoading">~加载中~</p>
    <p class="moreBtn" v-if="!isLoading" @click="getMore">加载更多</p>
    <p class="noMore" v-if="isNoMore">~到底了哟~</p>
  </div>
</template>

<script>
import MessageArea from "../../../components/MessageArea/index.vue";
import {getMessages, sendMessage} from "../../../api/message/message";
import mainScroll from "../../../utils/mainScroll";
import {onMounted, reactive, ref} from "vue";

export default {
  components: {
    MessageArea,
  },
  setup() {
    const params = reactive({
      pageNum: 1,
      pageSize: 10
    })
    const messageList = ref([]);
    const isLoading = ref(true);
    const isNoMore = ref(false);
    const total = ref(0);
    const initData = (param) => {
      isLoading.value = true
      getMessages(param).then(res => {
        isLoading.value = false
        if (res.rows.length < params.pageSize) {
          isNoMore.value = true;
        }
        total.value = res.total;
        messageList.value = [...messageList.value, ...res.rows]
      })
    }
    initData(params);
    const messageContainer = ref(null);
    mainScroll(messageContainer);
    const submitMessage = (data, callback) => {
      if(data.nickname&&data.content){
        sendMessage(data).then(res=>{
          total.value++
          callback("评论成功");
          messageList.value.unshift(res);
        })
      }
    }
    const getMore = () => {
      params.pageNum++
      initData(params);
    }
    return {
      isNoMore,
      isLoading,
      total,
      messageList,
      messageContainer,
      submitMessage,
      getMore,
    }
  }
};
</script>

<style scoped lang="less">
@import "public/style/globalColor";
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.message-area-container {
  width: 700px;
  margin: 0 auto;
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
