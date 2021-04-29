<template>
  <ul class="contact-container">
    <li>
      <a :href="author.github">
        <Icon type="github"/>
        <span>{{ author.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`tencent://message/?Menu=yes&uin=${author.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
        <Icon type="qq"/>
        <span>{{ author.qq }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${author.mail}`">
        <Icon type="mail"/>
        <span>{{ author.mail }}</span>
      </a>
    </li>
    <li>
      <a>
        <Icon type="weixin"/>
        <span>{{ author.weixin }}</span>
      </a>
      <div class="pop">
        <img src="../../../../public/images/website/wechat.jpg"
             alt="">
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "../../Icon/index.vue"

export default {
  name: "contact",
  props: {
    author: {
      type: Object,
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped lang="less">
@import "../../../../public/style/globalColor";

.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: #fff;
  @itemHeight: 30px;

  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;

    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }

  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .iconfont {
    font-size: 26px;
    width: 36px;

    &.iconweixin {
      font-size: 32px;
      text-indent: -3px;
    }
  }

  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight+5px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;

    img {
      width: 150px;
      height: 150px;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      bottom: -4px;
      background: #fff;
    }
  }
}
</style>