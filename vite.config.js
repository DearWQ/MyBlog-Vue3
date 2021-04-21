const path =require("path");
module.exports={
    base:"/",
    outDir:"goods",
    port:3000,
    open:false,
    https:false,
    ssr:false,
    proxy:{
        "/api":{
            target:"http://localhost:8099/",
            changeOrigin:true,
        },
        "/upload": {
            target:"http://localhost:8099/",
            changeOrigin:true,
        }
    }
}