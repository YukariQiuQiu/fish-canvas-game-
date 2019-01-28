//顶部（x，y）、根部（x，y）、数量
//终点使用贝塞尔曲线呈现弯曲
//正弦函数呈现幅度
var aneObj=function(){
  this.rootx=[];
  this.rooty=[]
  this.headx=[];//需要正弦函数的配合实现左右摆动
  this.heady=[];
  
  this.controlx=[];
  this.controly=[];//贝塞尔曲线控制点

  this.amp=[];//amp*sin()值域  [-1,1]*amp
  this.alpha=[];//正弦函数的sin(x)中的x值，随着x的增加，值域在[-1,1]来回
}

aneObj.prototype.num=50;
aneObj.prototype.init=function(){
  //  800/50=16 平均每16间隔
  for(var i=0;i<this.num;i++){
    this.rootx[i]=i*16+Math.random()*16 //每间隔16内随机生成1个
    this.rooty[i]=canHeight
    this.headx[i]=this.rootx[i]
    this.controlx[i]=this.rootx[i]
    this.controly[i]=canHeight-100
    this.heady[i]=canHeight-250+Math.random()*50 //高度随机
    this.amp[i]=Math.random()*5+30
    this.alpha[i]=Math.random()*100+30
  }
}

aneObj.prototype.draw=function(){
  ctx2.save()  //为每次重绘前恢复作保存
  ctx2.strokeStyle="green"
  ctx2.globalAlpha=0.6 //透明度
  ctx2.lineCap="round"  //线条尽头为圆形
  ctx2.lineWidth=20   //粗细
  for(var i=0;i<=this.num;i++){
    ctx2.beginPath();
    this.alpha[i]+=30*0.0009 //sin(x)中的x自增
    var l=Math.sin(this.alpha[i])
    ctx2.moveTo(this.rootx[i],this.rooty[i])
    //ctx2.lineTo(this.headx[i],this.heady[i])
    this.headx[i]=this.rootx[i]+this.amp[i]*l
    ctx2.quadraticCurveTo(this.controlx[i],this.controly[i],this.headx[i],this.heady[i]) //canvas贝塞尔曲线
    
    ctx2.stroke()
  }
  ctx2.restore()
}
