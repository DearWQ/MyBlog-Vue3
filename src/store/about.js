import {reactive, readonly} from "vue";
import {getAbout} from "../api/about/index";

const state = reactive({
    isLoading: false,
    info: ""
})

export const aboutInfo = readonly(state);

export async function getAboutInfo() {
    if(state.info){
        return
    }
    state.isLoading = true;
    const res = await getAbout();
    state.isLoading = false;
    state.info = res;
}