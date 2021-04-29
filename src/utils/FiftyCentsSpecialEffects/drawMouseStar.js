export default function drawStart(dom) {
    // 获取画布
    let ctx = dom.getContext("2d");

    // 让画布自适应窗口大小，这个复制即可
    window.onresize = resizeCanvas;

    /**
     * 重新计算宽高
     */
    function resizeCanvas() {
        dom.width = window.innerWidth;
        dom.height = window.innerHeight;
    }

    resizeCanvas();

    // 给画布css样式，固定定位，且阻止用户的鼠标事件
    dom.style.cssText = `
    position: fixed;
    top:0;
    left:0;
    right:0;
    width:100vw;
    z-index:1;
    height:100vh;
    pointer-events: none;
    `
    //定义数组，arr存放每个小星星的信息，colour为颜色数组，存几个好看的颜色
    let arr = [];
    const colours = ["#ffff00", "#66ffff", "#3399ff", "#99ff00", "#ff9900"];

    //绑定鼠标移动事件
    window.addEventListener('mousemove', e => {
        // 每移动触发一次事件给arr数组添加一个星星
        arr.push({
            // x是初始横坐标
            x: e.clientX,
            //y是初始纵坐标
            y: e.clientY,
            //r是星星里面那个小圆半径，哪来的小圆等会说
            r: Math.random() * 0.5 + 1.5,
            //运动时旋转的角度
            td: Math.random() * 4 - 2,
            // X轴移动距离
            dx: Math.random() * 2 - 1,
            // y轴移动距离
            dy: Math.random() * 1 + 1,
            // 初始的旋转角度
            rot: Math.random() * 90 + 90,
            // 颜色
            color: colours[Math.floor(Math.random() * colours.length)]
        });

    })
    // 封装绘制一个五角星函数
    // x是圆心横坐标，y是圆心纵坐标，其实就是鼠标位置（x ，y）
    // r是里面小圆半径 ，l是大圆半径
    // rot是初始旋转角度
    function star(x, y, r, l, rot) {
        ctx.beginPath();
        // 循环5次，因为5个点
        for (let i = 0; i < 5; i++) {
            //先绘制小圆上一个点
            ctx.lineTo(Math.cos((18 + i * 72 - rot) * Math.PI / 180) * r + x,
                -Math.sin((18 + i * 72 - rot) * Math.PI / 180) * r + y);
            //连线到大圆上一个点
            ctx.lineTo(Math.cos((54 + i * 72 - rot) * Math.PI / 180) * l + x
                , -Math.sin((54 + i * 72 - rot) * Math.PI / 180) * l + y);
        }
        ctx.closePath();
    }

    // 绘制一堆星星
    function draw() {
        //循环数组
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i];
            //调用绘制一个星星函数
            star(temp.x, temp.y, temp.r, temp.r * 3, temp.rot);
            //星星颜色
            ctx.fillStyle = temp.color;
            //星星边框颜色
            ctx.strokeStyle = temp.color;
            //线宽度
            ctx.lineWidth = 0.1;
            //角有弧度
            ctx.lineJoin = "round";
            // 填充
            ctx.fill();
            // 绘制路径
            ctx.stroke();
        }
    }

    //更新动画
    function update() {
        //循环数组
        for (let i = 0; i < arr.length; i++) {
            // x坐标+dx移动距离
            arr[i].x += arr[i].dx;
            // y坐标+dy移动距离
            arr[i].y += arr[i].dy;
            // 加上旋转角度
            arr[i].rot += arr[i].td;
            // 半径慢慢减小
            arr[i].r -= 0.015;
            // 当半径小于0时
            if (arr[i].r < 0) {
                //删除该星星
                arr.splice(i, 1);
            }
        }
    }

    //设置定时器
    setInterval(() => {
        //清屏
        ctx.clearRect(0, 0, dom.width, dom.height);
        //绘制
        draw();
        //更新
        update();
    }, 20)
}