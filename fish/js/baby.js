var babyObj=function(){
  this.x
  this.y  //上次一绘图是鼠标的坐标
  
  this.eye=[];
  this.body=[];
  this.tail=[];  //存储各部分的图片

  this.eyeStart=0
  this.eyeEnd=1000
  this.eyeIndex=0

  this.tailStart=0
  this.tailEnd=200
  this.tailIndex=0

  this.bodyIndex=0 //小鱼一开始的身体状态

  this.angle=0
}

babyObj.prototype.init=function(){
  for(var i=0;i<2;i++){
    this.eye[i] = new Image();
    this.eye[i].src = "src/babyEye"+i+".png";
  }
  for(var i=0;i<20;i++){
   this.body[i] = new Image();
   this.body[i].src = "src/babyFade"+i+".png";
  }
  for(var i=0;i<8;i++){
    this.tail[i] = new Image();
    this.tail[i].src = "src/babyTail"+i+".png"
  }
  this.x=canWidth*0.5
  this.y=canHeight*0.5
}

babyObj.prototype.draw=function(){
  this.eyeStart+=deltaTime
  if(this.eyeStart>this.eyeEnd){
    this.eyeIndex=(this.eyeIndex+1)%2
    this.eyeStart=0
  }
  if(this.eyeIndex==0) this.eyeEnd=2000
  if(this.eyeIndex==1) this.eyeEnd=300
  var eye=this.eye[this.eyeIndex]

  this.tailStart+=deltaTime
  if(this.tailStart>this.tailEnd){
    this.tailIndex=(this.tailIndex+1)%8
    this.tailStart=0
  }
  var tail=this.tail[this.tailIndex]

  var body=this.body[this.bodyIndex]

  ctx1.save()
  //移动
  this.x=lerpDistance(mon.x,this.x,0.95)
  this.y=lerpDistance(mon.y,this.y,0.95)
  //角度
  var deltaX=mon.x-this.x
  var deLtaY=mon.y-this.y
  var beta = Math.atan2(deLtaY,deltaX)+Math.PI;
  this.angle=lerpAngle(beta,this.angle,0.8);

  ctx1.translate(this.x,this.y)
  ctx1.rotate(this.angle)
  ctx1.drawImage(body,-body.width*0.5,-body.height*0.5);  //20为大鱼跟小鱼之间的距离
	ctx1.drawImage(tail,-tail.width*0.5+23,-tail.height*0.5);
	ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);	
  ctx1.restore()
}