import { createApp } from 'vue'
import App from './App.vue'
import '../public/style/index.less'
import "./mock/index.js"
import router from "../src/router/index"
import ElementPlus from "element-plus";
import 'element-plus/lib/theme-chalk/index.css';
import {getAuthorInfo} from "./store/user";
getAuthorInfo().catch(err=>console.log(err));
const app=createApp(App);
import myLoading from "../src/directives/loading"
import myLazy from "../src/directives/lazy"
app.directive('load',myLoading)
app.directive('lazy', myLazy)
app.use(router);
app.use(ElementPlus);
app.mount('#app');