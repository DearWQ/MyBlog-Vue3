<template>
  <div class="login">
    <div class="boardLogin">
      <a href="#" class="logo">
        <img src="images/loginLogo.png">
      </a>
      <form>
        <div class="inpGroup">
          <span class="loginIco1"></span>
          <input type="text" v-model="loginIdRef" placeholder="请输入您的用户名">
        </div>
        <div class="prompt">
          <p class="error" v-if="!loginIdRef">用户名错误或不存在</p>
        </div>

        <div class="inpGroup">
          <span class="loginIco2"></span>
          <input type="password" v-model="loginPwdRef" placeholder="请输入您的密码">
        </div>
        <div class="prompt">
          <p class="success" v-if="!loginPwdRef">请输入密码</p>
        </div>

        <!-- <button class="submit">登录</button> -->
        <a  class="submit" @click="login">登录</a>
      </form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue"
import * as userApi from "../../../api/user/login";
import {useRouter} from "vue-router";
import {useStore} from "vuex"
import {ElMessage} from 'element-plus';
export default {
  name: "login",
  setup() {
    let loginIdRef = ref("");
    let loginPwdRef = ref("");
    const store=useStore();
    const router=useRouter();
    let login = () => {
      if(!loginIdRef.value||!loginPwdRef.value){
        ElMessage.warning("请输入用户名或密码")
        return false
      }
      userApi.login({loginId: loginIdRef.value, password: loginPwdRef.value}).then(res => {
        router.push({
          path:"/QRCode"
        })
      })
    }
    return {
      loginIdRef,
      loginPwdRef,
      login,
    }
  }
}
</script>

<style scoped>
input::-webkit-input-placeholder {
  /* 修改字体颜色 */
  color: #fff;
  /* 修改字号，默认继承input */
  font-size: 12px;
  /* 设置背景色 */
}

.login{
  height: 100%;
  position: relative;
  z-index: 2;
}
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
}
.boardLogin .logo{
  display: block;
  margin-bottom: 40px;
  text-align: center;
}
.boardLogin .logo img{
  width: 100%;
  max-width: 326px;
}

.boardLogin .inpGroup{
  height: 20px;
  padding: 14px 24px 14px 52px;
  background: #2a658a;
  background: rgba(255,255,255,0.1);
  border-radius: 24px;
  position: relative;
}
.boardLogin .inpGroup span{
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 14px;
  left: 24px;
}
.boardLogin .inpGroup span.loginIco1{
  background: url("/images/s_ico6.png");
}
.boardLogin .inpGroup span.loginIco2{
  background: url("/images/s_ico7.png");
}
.boardLogin .inpGroup input{
  display: block;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: #fff;
}
.boardLogin .inpGroup input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #fff; opacity:1;
}

.boardLogin .inpGroup input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #fff;opacity:1;
}

.boardLogin .inpGroup input:-ms-input-placeholder{
  color: #fff;opacity:1;
}

.boardLogin .inpGroup input::-webkit-input-placeholder{
  color: #fff;opacity:1;
}
.boardLogin .prompt{
  min-height: 20px;
  padding: 5px 24px 10px 24px;
}
.boardLogin p{
  line-height: 16px;
  font-size: 12px;

}
.boardLogin p.error{
  color: #f60;
}
.boardLogin p.success{
  color: #449d44;
}
.boardLogin .submit{
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
}
.boardLogin .submit:hover{
  background: #01d1f2;
  -webkit-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
  -ms-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
}
</style>