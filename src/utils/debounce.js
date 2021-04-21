export default function (fn,duration=100){
    let timer=null
    return (...args)=>{
        clearInterval(timer)
        timer=setInterval(()=>{
            fn(...args);
        },duration)

    }
}