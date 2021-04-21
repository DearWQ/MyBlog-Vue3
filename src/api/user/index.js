import request from "../../utils/request";

export function getAuthorList() {
    return request({
        url: "/api/setting",
        method: "get",
    })
}