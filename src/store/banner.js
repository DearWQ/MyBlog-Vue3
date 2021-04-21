import * as bannerApi from "../api/home/index";
import {reactive, readonly, ref, toRefs} from "vue"
//创建默认的全局单例响应式数据，仅供该模块内部使用
const stateRef= reactive({carouselList:null,isLoading:false})
//对外暴露的数据是只读的，不能直接修改
//也可以进一步使用toRefs进行封装,从而避免结构或者展开后响应式丢失

export async function getBanners(){
    if(stateRef.carouselList){
        return;
    }
    stateRef.isLoading=true;
    stateRef.carouselList = await bannerApi.getBannerList() ;
    stateRef.isLoading=false;
}


export const banner=readonly(stateRef)

