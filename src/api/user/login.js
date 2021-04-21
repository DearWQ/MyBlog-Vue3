import request from "../../utils/request";

export function login(data) {
    return request({
        url: "/api/user/login",
        method: "post",
        data
    })
}

export function loginOut() {
    localStorage.removeItem("token");
}

export function whoami() {
    return request({
        url: "/api/user/whoami",
        method:"get",
    })
}