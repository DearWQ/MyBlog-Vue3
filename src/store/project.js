import {reactive, readonly} from "vue";
import {getProjects} from "../api/project";


const state=reactive({
    isLoading:true,
    data:[],
})
export const project=readonly(state);
export async function getProjectList(){
    if(state.data.length>0){
        return
    }
    state.isLoading=true;
    const res=await getProjects()
    state.isLoading=false;
    state.data=res;
}