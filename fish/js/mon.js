//出生位置，眼睛,大小,尾巴
var monObj=function(){
  this.x
  this.y  //上次一绘图是鼠标的坐标
  
  this.eye=[];
  this.body=[];
  this.tail=[];  //存储各部分的图片

  // this.eyechange=0 //眼睛的变化
  // this.tailchange=0 //眼睛的变化
  // this.bodychange=0 //眼睛的变化
  // this.ei=0
  // this.ti=0
  // this.bi=0

  this.eyeStart=0
  this.eyeEnd=1000
  this.eyeIndex=0

  this.tailStart=0
  this.tailEnd=200
  this.tailIndex=0

  this.bodyStart=0
  this.bodyEnd=200
  this.bodyIndex=0

  this.angle=0
}

monObj.prototype.init=function(){
  for(var i=0;i<2;i++){
    this.eye[i] = new Image();
    this.eye[i].src = "src/bigEye"+i+".png";
  }
  for(var i=0;i<8;i++){
   this.body[i] = new Image();
   this.body[i].src = "src/bigSwim"+i+".png";
  }
  for(var i=0;i<8;i++){
    this.tail[i] = new Image();
    this.tail[i].src = "src/bigTail"+i+".png"
  }
  this.x=canWidth*0.5
  this.y=canHeight*0.5
}

monObj.prototype.draw=function(){
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

  this.bodyStart+=deltaTime
  if(this.bodyStart>this.bodyEnd){
    this.bodyIndex=(this.bodyIndex+1)%8
    this.bodyStart=0
  }
  var body=this.body[this.bodyIndex]
  
  // this.eyechange++
  // if(this.eyechange>100){
  //   this.ei++
  //   this.eyechange=0
  //   if(this.ei>1) this.ei=0
  // }
  // this.bodychange++
  // if(this.bodychange>50){
  //   this.bi++
  //   this.bodychange=0
  //   if(this.bi>6) this.bi=0
  // }
  // this.tailchange++
  // if(this.tailchange>10){
  //   this.ti++
  //   this.tailchange=0
  //   if(this.ti>6) this.ti=0
  // }
  ctx1.save();
  
  //画布原点逐渐靠近鼠标位置
  //（x鼠标当前的位置+（x画布原点的位置与x鼠标的差距）*距离变化速度的小数---当鼠标位置不动时，两个x之间的距离会不断减少直到相等
  var deltaX=mx-this.x //假设鼠标右移，上次绘图的坐标原点相对向左，delta为正数
  var deLtaY=my-this.y
  this.x=-deltaX*0.95+mx//当前鼠标速度-为正数的差值，得出当前的画布原点
  this.y=-deLtaY*0.95+my//0.95为减少速度


  //以大鱼为坐标轴原点，鼠标与大鱼的差值为参数，利用反三角函数tan计算出鼠标与大鱼的夹角
  //  var deltaAngle=this.angle-(Math.atan2(deLtaY,deltaX)+Math.PI)
  //  console.log(deltaAngle)
  // if(deltaAngle>Math.PI) deltaAngle=deltaAngle+2*Math.PI   //当夹角大于180度时，去反方向旋转,以角度小的方式去旋转
  // if(deltaAngle<-Math.PI) deltaAngle=deltaAngle-2*Math.PI
  //  this.angle=deltaAngle*0.9+Math.atan2(deLtaY,deltaX)//0.90为角度变化减少速度

    var beta = Math.atan2(deLtaY,deltaX)+Math.PI;//返回值在-PI,PI之间 但是鱼的旋转是要0,2PI 因此要加PI
    //让大鱼的角度趋向于鼠标的角度
    this.angle = lerpAngle(beta,this.angle,0.8);
    //console.log(this.angle)

  ctx1.translate(this.x,this.y)
  ctx1.rotate(this.angle)
  
  ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5)
  ctx1.drawImage(body,-body.width*0.5,-body.height*0.5)
  ctx1.drawImage(tail,-tail.width*0.5+29,-tail.height*0.5) //29为尾巴放在身体后的距离
  ctx1.restore()
}

function lerpAngle(a, b, t) {
  var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;  //因为角度变化的加速度，需要快速切换
	if (d < -Math.PI) d = d + 2 * Math.PI; //当在0瞬间到360,加速度会缓慢切换形成，一个反方向掉头效果
	return a + d * t;
}
//鼠标距离的函数
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}