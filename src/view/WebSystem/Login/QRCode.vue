<template>
  <h1>二维码生产器</h1>
  <div class="Qrcode">
    <div class="form">
      <el-form :inline="true" class="demo-form-inline" label-position="right" label-width="200px" ref="QRForm" :model="QRInfo">
        <el-form-item label="内容">
          <el-input v-model="QRInfo.data" placeholder="可以是一段文字，也可以是一个地址链接"></el-input>
        </el-form-item>
        <el-form-item label="二维码颜色">
          <el-color-picker v-model="QRInfo.colorFore"></el-color-picker>
        </el-form-item>
        <el-form-item label="二维码背景颜色">
          <el-color-picker v-model="QRInfo.backgroundColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="二维码小正方形边框颜色">
          <el-color-picker v-model="QRInfo.colorOut"></el-color-picker>
        </el-form-item>
        <el-form-item label="二维码小正方形内部背景颜色">
          <el-color-picker v-model="QRInfo.colorIn"></el-color-picker>
        </el-form-item>
        <el-form-item label="二维码中间添加文字">
          <el-input v-model="QRInfo.text"></el-input>
        </el-form-item>
        <el-form-item label="二维码中间文字颜色">
          <el-color-picker v-model="QRInfo.textColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="二维码大小">
          <el-input v-model="QRInfo.cellSize"></el-input>
        </el-form-item>
        <el-form-item label="二维码等级">
          <el-input v-model="QRInfo.correctLevel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="goOut">退出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="img">
      <el-image :src="url"></el-image>
    </div>
  </div>
  <div class="uploadImg">
    <h3>图片上传</h3>
    <el-uploadWater
        class="avatar-uploader"
        :action="uploadSrc"
        :show-file-list="false"
        :on-success="onSuccess"
        name="img"
    >
      <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar"/>
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-uploadWater>
  </div>

</template>

<script>
import {ref, reactive} from "vue"
import {getQRCode} from "../../../api/util";
import {loginOut} from "../../../api/user/login";
import {useRouter} from "vue-router"
export default {
  name: "QRCode",
  setup() {
    let url=ref("");
    let uploadSrc=ref("/api/uploadWater");
    let dialogVisible=ref(false)
    let dialogImageUrl=ref("")
    const router=useRouter();
    let QRInfo = reactive(
        {
          cellSize: 8,
          correctLevel: "H",
          data:"",
          text: '',
          textColor: '',
          padding:  8,
          colorFore:"",
          colorOut:"",
          colorIn:"",
          imageUrl:"",
          backgroundColor:""
        })
    if(dialogImageUrl.value){
      QRInfo.value.imageUrl= dialogImageUrl
    }

    const submitForm=()=>{
      getQRCode(QRInfo).then(res=>{
        url.value=res;
      })
    }
    const goOut=()=>{
      loginOut();
      router.push({
        path:"/"
      })
    }
    const onSuccess=(file)=>{
      dialogImageUrl.value= file.url
    }
    return {
      QRInfo,
      url,
      submitForm,
      goOut,
      onSuccess,
      uploadSrc,
      dialogVisible,
      dialogImageUrl
    }
  }
}
</script>

<style scoped>
h1{
  color: #FFFFFF;
}
.Qrcode{
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.form{
  width: 50%;
  height: auto;
  color: #fff;
}
.img{
  width: 300px;
  height: 300px;
  border: 1px solid #00ACEA;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-form-item__label{
  color: #fff;
}
::v-deep .el-input__inner{
  color: #fff;
  background: transparent;
}
.uploadImg{
 color: #fff;
  width: 100px;
  height: 100px;
}
.avatar-uploader{
  width: 100%;
  height: 100%;
}

</style>