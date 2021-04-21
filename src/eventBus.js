let listeners={};

export default {
    /**
     * 监听某一个事件
     * @param eventName 事件名字
     * @param handler 事件函数
     * @constructor
     */
    MyOn(eventName,handler){
       if(!listeners[eventName]){
           listeners[eventName]=new Set();
       }
       listeners[eventName].add(handler);
    },
    /**
     * 取消事件的监听
     * @param eventName 事件的名字
     * @param handler 事件处理函数
     * @constructor
     */
    MyOff(eventName,handler){
        if(!listeners[eventName]){
           return ;
        }
        listeners[eventName].delete(handler);
    },
    /**
     * 触发事件
     * @param eventName 事件名字
     * @param args 监听数据
     * @constructor
     */
    MyEmit(eventName,...args){
        if(!listeners[eventName]){
            return;
        }
        for (const handler of listeners[eventName]) {
            handler(...args)
        }
    },

}