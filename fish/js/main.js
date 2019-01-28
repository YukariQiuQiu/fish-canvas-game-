document.body.onload=game

var can1=null
var can2=null
var ctx1=null
var ctx2=null
var canWidth=0   //画布宽度
var canHeight=0  //画布高度
var bg=new Image()

var ane=null
var food=null
var mon=null
var baby=null
var score=null

//鼠标坐标
var mx=0;
var my=0

//两帧之间的时间差
var deltaTime
var lastTime

//程序入口
function game(){
  init()
  gameloop()
}

//初始化函数
function init(){
  can1=document.getElementById("canvas1")
  can2=document.getElementById("canvas2")
  ctx1=can1.getContext("2d")
  ctx2=can2.getContext("2d")
  
  can1.addEventListener("mousemove",onMouseMove,false)

  canWidth=can1.width
  canHeight=can1.height

  deltaTime=0
  lastTime=0

  bg.src="src/background.jpg"

  ane=new aneObj()
  ane.init()

  food=new foodObj()
  food.init()

  mon=new monObj()
  mon.init()

  baby=new babyObj()
  baby.init()

  score=new scoreObj()

  wave=new waveObj()
}

//游戏循环函数
function gameloop(){
  if(!score.gameControl){
    return
  }
  requestAnimationFrame(gameloop) //重绘函数，当一次渲染绘画完成后再进行下一次调用
  //两帧之间的时间差
  var now=Date.now();
  deltaTime = now - lastTime;   
  lastTime = now;               
  if(deltaTime>40) deltaTime = 40;

  drawbg()
  ane.draw()
  food.draw()
  foodMonitor()
  
  ctx1.clearRect(0,0,canWidth,canHeight);
  mon.draw()
  baby.draw()

  monFood()
  monBaby()
  wave.draw()
  score.draw()
  
}

//获取鼠标距离
function onMouseMove(e){
  mx=e.offsetX
  my=e.offsetY
}