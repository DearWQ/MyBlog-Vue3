const {resolve}=require("path");
module.exports={
    //基本路径
    publicPath:"./",
    css:{
        // 是否开启支持‘foo.module.css’样式
        modules:true,
        //css预设器配置项
        loaderOptions:{
           less:{

           }
        }
    },
    server:{
        port:3000,
        open:false,
        https:false,
        strictPort:true,
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
    },
    build:{
        //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。    资源放的目录
        assetsDir:"./static",
        //输出文件目录
        outputDir:"myBlog",

    }
}