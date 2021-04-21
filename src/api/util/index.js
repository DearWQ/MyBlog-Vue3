import request from "../../utils/request";

export function getQRCode(data){
    return request({
        url: "/api/getCode/",
        method: "post",
        data
    })
}