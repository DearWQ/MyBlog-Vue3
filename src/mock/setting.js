import Mock from "mockjs";
Mock.mock("/api/setting", "get", {
  code: 200,
  msg: "",
  data: {
    avatar: "https://avatars.githubusercontent.com/u/44079368?v=4",
    siteTitle: "进入个人空间",
    github: "https://github.com/DearWQ",
    qq: "1113141147",
    qqQrCode:
      "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    weixin: "wq15297807880",
    weixinQrCode:
      "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    mail: "15297807880@dingtalk.com",
    icp: "王ICP备97019号",
    githubName: "DearWQ",
    favicon: "https://avatars.githubusercontent.com/u/44079368?v=4",
  },
});
