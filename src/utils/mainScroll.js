import {onBeforeUnmount, onMounted} from "vue";
import eventBus from "../eventBus";

export default function (dom){
    const handleSetMainScroll=(scrollTop)=>{
        dom.value.scrollTop=scrollTop
    }
    const handleMainScroll=()=>{
        eventBus.MyEmit("mainScroll",dom.value)
    }
    onMounted(()=>{
        eventBus.MyOn("setMainScroll",handleSetMainScroll);
        dom.value.addEventListener("scroll",handleMainScroll)
    })
    onBeforeUnmount(()=>{
        eventBus.MyEmit("mainScroll");
        eventBus.MyOff("setMainScroll",handleSetMainScroll)
        dom.value.removeEventListener("scroll",handleMainScroll)
    })
}