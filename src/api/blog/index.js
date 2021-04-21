import request from "../../utils/request";

/**
 * 获取博客列表数据
 * @param data
 * @returns {*}
 */
export function getBlogList(data){
    return request({
        method:"get",
        url:"/api/blog",
        params:data,
    })
}

/**
 * 获取博客分类
 *
 * @returns {*}
 */
export function  getBlogType(){
    return request({
        method:"get",
        url:"/api/blogType",
    })
}

/**
 * 获取博客详情
 * @param id
 * @returns {*}
 */
export function getBlog(id){
    return request({
        method:"get",
        url:`/api/blog/${id}`,

    })
}

/**
 * 提交评论
 * @param data
 * @returns {*}
 */
export function sendComment(data){
    return request({
        method:"post",
        url:"/api/comment",
        data
    })
}

export  function getComments(data){
    return request({
        method:"get",
        url:"/api/comment",
        params:data,
    })
}