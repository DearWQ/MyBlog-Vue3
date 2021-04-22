import loadUrl from "../../public/images/website/loading.svg";
import loadStyle from "/src/directives/load.module.less"
export default function (el,binding) {
    const curImg=getLadImg(el)
    if(binding.value){
        if(!curImg){
           const img= createLoadingImg();
           el.appendChild(img)
        }
    }else{
        if(curImg){
           curImg.remove()
        }
    }
};

function getLadImg(el){
  return  el.querySelector("img[data-role=load]")
}
function createLoadingImg(){
    const img=document.createElement("img");
    img.dataset.role="load";
    img.src=loadUrl;
    img.className=loadStyle.load
    return img
}