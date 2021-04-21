import request from "../../utils/request";

export function getMessages(data) {
  return request({
    url:"/api/message",
    method:"get",
    params: data,
  })
}


export function sendMessage(data) {
  return request({
    url:"/api/message",
    method:"post",
    data
  })
}
