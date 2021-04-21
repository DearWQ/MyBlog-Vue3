import * as user from "../api/user/login";
import {getAuthorList} from "../api/user";
import {reactive, readonly, ref, toRefs} from "vue";
import setWebTitle from "../utils/setWebTitle";
const state = reactive({userInfo: null, isLoading: false, author: null})
export const userInfo = readonly(state)

/**
 * 登录
 * @param loginInfo
 * @returns {Promise<void>}
 */
export async function login(loginInfo) {
    state.isLoading = true;
    state.userInfo = await user.login(loginInfo);
    state.isLoading = false;
}

/**
 * 退出
 * @returns {Promise<void>}
 */
export async function loginOut() {
    state.isLoading = true;
    await user.loginOut();
    state.isLoading = false;
    state.userInfo = null
}

/**
 * 恢复登录状态
 * @returns {Promise<void>}
 */
export async function whoAmI() {
    state.isLoading = true;
    const user = await user.whoami();
    state.isLoading = false;
    state.userInfo = user;
}

/**
 * 获取作者信息
 * @returns {Promise<void>}
 */
export async function getAuthorInfo() {
    state.isLoading = true;
    const res = await getAuthorList();
    state.isLoading = false;
    state.author = res;
    if (res.favicon) {
        let link = document.querySelector("link[ref='shortcut icon']")
        if (link) {
            return
        }
        link = document.createElement("link");
        link.rel="shortcut icon";
        link.type="images/x-icon";
        link.href=res.favicon;
        document.querySelector("head").appendChild(link)
    }
    if(res.siteTitle){
        setWebTitle.setSiteTitle(res.siteTitle)
    }
}