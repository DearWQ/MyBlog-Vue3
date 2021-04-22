import eventBus from "../eventBus";
import debounce from "../utils/debounce";
import defaultGif from "../../public/images/website/default.gif";

let images = []

/**
 * 设置图片
 * @param img
 */
function setImage(img) {
    //刚开始就给图片添加加载中的图片
    img.dom.src = defaultGif;
    //获取视口高度
    const clientHeight = document.documentElement.clientHeight;
    //获取图片元素的矩形对象
    const rect = img.dom.getBoundingClientRect();
    //获取获取图片的高度
    const height = rect.height || 150;
    //看图片是否再视口范围内
    if (rect.top >= -height && rect.top <= clientHeight) {
        //在视口范围内，创建图片对象
        const tempImg = new Image();
        //添加图片加载方法
        tempImg.onload = () => {
            //把真实图片进行替换
            img.dom.src = img.src;
        }
        //把图片的真实src赋给tempImg对象
        tempImg.src = img.src;
        //图片已经处理了，把存在的图片过滤掉让其去加载缓存中的图片
        images = images.filter(i => i !== img)
    }
}

/**
 * 滚动时进行循环设置loading图片
 */
function setImages() {
    for (const img of images) {
        setImage(img)
    }
}

/**
 * 创建滚动函数
 */
function handleScroll() {
    setImages();
}

/**
 * 监听滚动事件
 * 添加函数防抖
 */
eventBus.MyOn("mainScroll", debounce(handleScroll, 50))

export default {
    mounted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value,
        };
        images.push(img);
        setImage(img)
    },
    unmounted(el) {
        images = images.filter(img => img.dom !== el);
    }
}