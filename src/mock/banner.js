import Mock from "mockjs";
Mock.mock("/api/banner", "get", {
    code: 0,
    msg: "",
    data: [
        {
            id: "2",
            midImg: "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d8f9d72a6059252dc0f11dd43c9b033b5ab5b97f.jpg",
            bigImg: "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/d8f9d72a6059252dc0f11dd43c9b033b5ab5b97f.jpg",
            title: "这就是乐趣",
            description: "如果我不回你消息，就说明我在敲代码",
        },
        {
            id: "1",
            midImg:
                "https://pic.rmb.bdstatic.com/325bc7b25121e42cf596241ca188a9a8.jpeg",
            bigImg:
                "https://pic.rmb.bdstatic.com/325bc7b25121e42cf596241ca188a9a8.jpeg",
            title: "幸福将至",
            description: "人唯有恐惧的时候方能勇敢",
        },
        {
            id: "3",
            midImg: "https://pic.rmb.bdstatic.com/01ac63a8463e07d210a63cd95e01e406.png",
            bigImg: "https://pic.rmb.bdstatic.com/01ac63a8463e07d210a63cd95e01e406.png",
            title: "听我怒吼",
            description: "我能行，我也行",
        },
    ],
});