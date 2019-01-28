//每次触碰产生一个，可产生多个
//坐标等于mon坐标
//产生后循环 透明度 半径产生变化
//判断wave的类型
//光圈消失后关闭开关
var waveObj=function(){
  this.x=[]
  this.y=[]
  this.r=[]
  this.alpha=[]
  this.type=[]
  this.alive=[]
}

waveObj.prototype.create=function(type){
  this.x.push(mon.x)
  this.y.push(mon.y)
  this.r.push(0)
  this.alpha.push(1)
  this.alive.push(true)
  this.type.push(type)
}

waveObj.prototype.draw=function(){
  ctx1.save()
  ctx1.lineWidth = 5;
  
  for(var i=0;i<this.alive.length;i++){
    this.alpha[i]*=0.98
    if(this.type[i]=="food"){
      ctx1.strokeStyle = "rgba(250,128,10,"+this.alpha[i]+")";
    }else{
      ctx1.strokeStyle = "rgba(255,255,0,"+this.alpha[i]+")"
    }
    if(this.alive[i]){
      this.r[i]+=deltaTime*0.05 //扩散速度
      if(this.r[i]>150){
        this.alive[i]=false
      }
      this.x[i]=mon.x
      this.y[i]=mon.y
      ctx1.beginPath()
      ctx1.arc(this.x[i]-15,this.y[i],this.r[i],0,360*Math.PI/180)
      ctx1.closePath()
      ctx1.stroke()
    }  
  }
  ctx1.restore()
}