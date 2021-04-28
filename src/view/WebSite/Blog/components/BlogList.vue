<template>
  <div v-load="isLoading" ref="blogListContainer" class="blogList-container">
    <ul v-for="item in blogList" :key="item.id">
      <li>
        <div class="thumb" v-if="item.thumb">
          <router-link :to="{
            name:'BlogDetail',
            params:{id:item.id}
          }">
            <img
                v-lazy="item.thumb"
            />
          </router-link>
        </div>
        <div class="main">
          <router-link :to="{
            name:'BlogDetail',
            params:{id:item.id}
          }">
            <h2>{{ item.title }}</h2>
          </router-link>
          <div class="blogAside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <span>{{ item.category.name }}</span>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <p class="loadMore" v-if="isLoading">~加载中~</p>
    <p class="moreBtn" v-if="!isLoading" @click="getMore">加载更多</p>
    <p class="noMore" v-if="isNoMore">~到底了哟~</p>
  </div>
</template>
<script>
import {getBlogList, getBlogType} from "../../../../api/blog";
import formatDate from "../../../../utils/formatDate";
import {computed, ref, watchEffect, watch, onMounted, onBeforeUnmount} from "vue";
import {useRoute, useRouter} from "vue-router";
import mainScroll from "../../../../utils/mainScroll";

//设置滚动高度vue2,this.$refs["XXX"].scrollTop=0；滚动到顶部
export default {
  name: "blogList",
  setup(props) {
    //是否加载中
    const isLoading = ref(true);
    //是否还有数据加载
    const isNoMore = ref(false);
    const blogListContainer = ref(null)
    //路由对象
    const route = useRoute();
    const router = useRouter();
    //获取路由信息作为接口的参数
    const routerInfo = computed(() => {
      const categoryId = route.params.categoryId || -1;
      const pageNum = route.query.pageNum || 1;
      const pageSize = route.query.pageSize || 10;
      return {
        categoryId,
        pageNum,
        pageSize
      }
    })
    //列表集合
    const blogList = ref([]);
    //初始化数据
    const initData = (param, idCategoryIdChange) => {
      getBlogList(param).then(res => {
            if (res.rows.length === 0) {
              isNoMore.value = true;
            }
            isLoading.value = false;
            if (idCategoryIdChange) {
              blogList.value = res.rows;
            } else {
              blogList.value = [...blogList.value, ...res.rows]
            }
          }
      )
    }
    initData(routerInfo.value);
    //获取更多数据
    const getMore = () => {
      isLoading.value = true;
      // blogListContainer.value.scrollTop = 0;
      routerInfo.value.pageNum++;
      const query = {
        pageNum: routerInfo.value.pageNum,
        pageSize: routerInfo.value.pageSize
      }
      if (routerInfo.value.categoryId === -1) {
        router.push({
          name: "Blog",
          query,
        })
      } else {
        router.push({
          name: "CategoryBlog",
          params: {categoryId: routerInfo.value.categoryId},
          query,
        })
      }
      initData(routerInfo.value);
    }
    //监听路由param的变化
    const categoryId = computed(() => route.params.categoryId);
    watch(categoryId, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        isLoading.value = true;
        blogListContainer.value.scrollTop = 0;
        initData(routerInfo.value, categoryId.value);
      }
    });
    mainScroll(blogListContainer)
    return {
      isLoading,
      isNoMore,
      blogList,
      routerInfo,
      getMore,
      formatDate,
      blogListContainer,
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";

.blogList-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;

  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;

    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }

  .main {
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }
  }

  .blogAside {
    font-size: 12px;
    color: @gray;

    span {
      margin-right: 15px;
    }
  }

  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
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