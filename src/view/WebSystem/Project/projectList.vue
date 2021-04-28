<template>
  <div class="project-container">
    <div class="space"> <h1>博主正在没日没夜开发中。。。</h1></div>
    <div class="sun"></div>
    <div class="moon"></div>
  </div>

</template>

<script>
export default {
  name: "projectList"
}
</script>

<style scoped lang="less">
.project-container{
  width: 100%;
  height: 100%;
  background:linear-gradient(to top,#ffffff, #000000);
}
@keyframes space-change {
  0%{
    opacity: .3;
  }
  25%{
    opacity: 1;
  }
  50%{
    opacity: .3;
  }
  75%{
    opacity: .1;
  }
  100%{
    opacity: .3;
  }
}
@keyframes sunrise {
  0%{
    opacity: 0;
  }
  10%{
    opacity: 1;
    transform: scale(.7,.7) translateX(0) translateY(0);
  }
  30%{
    opacity: 1;
    transform: scale(.5,.5) translateX(0) translateY(-600px);
  }
  50%{
    opacity: 0;
    transform: scale(.7,.7) translateX(0) translateY(0);
  }
  100%{
    opacity: 0;
  }
}
@keyframes moonrise {
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0;
    transform: translateY(0);
  }
  75%{
    transform: translateY(-300px);
    opacity: 1;
  }
  80%{
    transform: translateY(-300px);
    opacity: 1;
  }
  90%{
    opacity: 0;
  }
  100%{
    transform: translateY(0);
    opacity: 0;
  }
}
.sun{
  position: absolute;
  left:30%;
  top:70%;
  width: 100px;
  height: 100px;
  transform: scale(.5,.5);
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 100px 80px #fff,
  0 0 150px 125px #ff0;
  animation: sunrise 20s infinite;
}
.moon{
  position: absolute;
  left: 30%;
  top: 70%;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 8px #fff,inset 0 0 8px #000;
  animation: moonrise 20s cubic-bezier(0,0,.5,.5) infinite;
}
.moon::after{
  content: '';
  position: absolute;
  width: 90px;
  height: 90px;
  background-color: #000;
  border-radius: 50%;
  left: -10px;
  top: -10px;

}
.space{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-image: linear-gradient(to bottom, rgba(0,130,255,1),rgba(255,255,255,1));
  animation: space-change 20s cubic-bezier(.5,0,.5,1) infinite;
}
</style>