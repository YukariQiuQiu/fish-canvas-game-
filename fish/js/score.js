var scoreObj=function(){
  this.score=0
  this.orange=0
  this.blue=0
  this.gameControl=true  //游戏开关
  
  this.feedBabyStart=0 //监听喂养时间
  this.feedBabyEnd=500
}
scoreObj.prototype.orangeScore=500
scoreObj.prototype.blueScore=100
//加分
scoreObj.prototype.addScore=function(){
  if(this.orange>0 || this.blue>0){
    baby.bodyIndex=0
  }
  this.score+=this.orange*this.orangeScore
  this.orange=0
  this.score+=this.blue*this.blueScore
  this.blue=0
}

scoreObj.prototype.draw=function(){
  ctx1.save();
  ctx1.fillStyle = "white";
  ctx1.font = "35px Verdana";
  ctx1.textAlign = "center";
  ctx1.fillText("SCORE: "+this.score,0.5*can1.width,0.9*can1.height);
  if(this.gameControl){
    this.feedBabyStart+=deltaTime
    if(this.feedBabyStart>this.feedBabyEnd){
      baby.bodyIndex++
      this.feedBabyStart=0
      if(baby.bodyIndex==19){
        this.gameControl=false
        ctx1.fillText("GAME OVER",0.5*can1.width,0.5*can1.height)
      }
    }
  }
  ctx1.restore();
}
