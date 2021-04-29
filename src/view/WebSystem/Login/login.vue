<template>
  <div class="login-container">
    <div class="boardLogin">
      <h1 @click="goBack"> 欢迎来到我的世界</h1>
        <div class="inpGroup">
          <span class="loginIco1"></span>
          <input type="text" v-model="loginInfo.loginId" placeholder="请输入您的用户名">
        </div>
        <div class="prompt">
          <p class="error" v-if="!loginInfo.loginId">用户名错误或不存在</p>
        </div>
        <div class="inpGroup">
          <span class="loginIco2"></span>
          <input type="password" v-model="loginInfo.password" placeholder="请输入您的密码">
        </div>
        <div class="prompt">
          <p class="success" v-if="!loginInfo.password">请输入密码</p>
        </div>
        <span  class="submit" @click="handleLogin">登录</span>
    </div>
  </div>
  <canvas id="starrySky"></canvas>
</template>

<script>
import {onMounted, reactive, ref} from "vue"
import {login,userInfo} from "../../../store/user";
import {useRouter} from "vue-router";
import {ElMessage} from 'element-plus';
import drawSky from "../../../utils/FiftyCentsSpecialEffects/drawStarrySky";
export default {
  name: "login",
  setup() {
    const loginInfo=reactive({
      loginId:"",
      password:""
    })
    const router=useRouter();
    const handleLogin = async () => {
      // if(!loginInfo.loginId||!loginInfo.password){
      //   ElMessage.warning("请输入用户名或密码")
      //   return false
      // }
    // await login(loginInfo)
    //   if(userInfo.data.loginId){
        router.push({
          path: "/systemHome"
        })
      // }

    }
    const goBack=()=>{
      router.push({name:"Home"})
    }
    onMounted(()=>{
      drawSky(document.querySelector("#starrySky"))
    })
    return {
      loginInfo,
      handleLogin,
      goBack
    }
  }
}
</script>

<style scoped lang="less">
@import "public/style/globalColor";
input::-webkit-input-placeholder {
  /* 修改字体颜色 */
  color: #fff;
  /* 修改字号，默认继承input */
  font-size: 12px;
  /* 设置背景色 */
}

.login-container{
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  .boardLogin{
    width: 16.8%;
    min-width: 200px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    h1{
      color: @fontColor;
      cursor: pointer;
      margin-bottom: 4%;
    }
    .inpGroup{
      height: 20px;
      padding: 14px 24px 14px 52px;
      background: #2a658a;
      background: rgba(226, 209, 209, 0.1);
      border-radius: 24px;
      position: relative;
      .loginIco1{
        background: url("/images/websysten/login/user.png")no-repeat;
      }
      .loginIco2{
        background: url("/images/websysten/login/lock.png")no-repeat;
      }
      span{
        display: block;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 14px;
        left: 24px;
      }
      input{
        display: block;
        width: 100%;
        height: 20px;
        line-height: 20px;
        color: #fff;
        outline: none;
        border: 0;
        background: transparent;
        & ::-webkit-input-placeholder{
          color: #fff;opacity:1;
        }
      }

    }
    .prompt{
      min-height: 20px;
      padding: 5px 24px 10px 24px;
      p{
        line-height: 16px;
        font-size: 12px;
      }
      .error{
        color: #f60;
      }
      .success{
        color: #449d44;
      }
    }
    .submit{
      width: 100%;
      box-sizing: border-box;
      display: block;
      height: 40px;
      line-height: 38px;
      text-align: center;
      border: 1px solid #01d1f2;
      border-radius: 20px;
      color: #fff;
      cursor: pointer;
      -webkit-transition: 0.3s ease-in-out;
      -moz-transition: 0.3s ease-in-out;
      -ms-transition: 0.3s ease-in-out;
      -o-transition: 0.3s ease-in-out;
      transition: 0.3s ease-in-out;
      &:hover{
        background: #01d1f2;
        opacity: .8;
        -webkit-transition: 0.3s ease-in-out;
        -moz-transition: 0.3s ease-in-out;
        -ms-transition: 0.3s ease-in-out;
        -o-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;
      }
    }
  }
}
</style>