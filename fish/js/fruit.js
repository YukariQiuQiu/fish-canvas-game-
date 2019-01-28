//随机生成30个，画布只出现15个，替补15个，当一个消失时，替补的出现
//红蓝出现概率比8:2
//食物由小变大
var foodObj=function(){
  this.blue=new Image()
  this.orange=new Image()

  this.x=[] //出生坐标
  this.y=[]

  this.spd=[] //上浮速度
  this.l=[]//食物宽度
  this.type=[]//食物类型

  this.alive=[]//控制食物的开关
  this.aneNo=[] //海草编号
}
foodObj.prototype.num=30

foodObj.prototype.init=function(){
  for(var i=0;i<this.num;i++){
    this.aneNo[i]=Math.floor(Math.random()*ane.num);  //随机出生的海草编号
    this.type[i]=Math.random()<0.8? "blue" : "orange"
    this.spd[i] = Math.random()*0.17+0.02 //随机速度
    this.l[i]=0
    this.alive[i]=false
  } 
  this.blue.src = "src/blue.png";
  this.orange.src = "src/fruit.png";
}

foodObj.prototype.draw=function(){
  for(var i=0;i<this.num;i++){
    if(!this.alive[i]){
      continue  //跳过本次循环，不能用return和break，会影响i后面的绘画
    }
    var pic=null
    this.type[i]=="blue" ? pic = this.blue : pic = this.orange
    if(this.l[i]<=14){
        var idx=this.aneNo[i]
        this.x[i]=ane.headx[idx]-5  //-
        this.y[i]=ane.heady[idx]
        this.l[i]+=this.spd[i];
    }else{
        this.y[i]=this.y[i]-this.spd[i]*13;
        //console.log(this.spd[i])
        if(this.y[i]<0){
          this.alive[i] = false;
        }                            //超出画布清除 
    }    
    //5:绘制图片
    ctx2.drawImage(pic,this.x[i],this.y[i],this.l[i],this.l[i])
    
  }
}


//监视函数监听画布上食物的数量
function foodMonitor(){
  var sum=0
  for(var key in food.alive){
    if(!food.alive[key]) {
      sum++
    }
  }
  if(sum>15){
    createFood()
    return
  }
}
//当食物不够15时，新食物创造
function createFood(){
  for(var i=0;i<food.num;i++){
    if(false==food.alive[i]){
      food.type[i]=Math.random()<0.8? "blue" : "orange"
      food.spd[i]=Math.random()*0.07+0.02
      food.l[i]=0
      food.alive[i]=true
      food.aneNo[i]=Math.floor(Math.random()*ane.num);  //随机出生的海草编号
      food.x[i]=-500 //暂时移除屏幕，避免影响算分
      food.y[i]=-500
      return
    }
  }
}