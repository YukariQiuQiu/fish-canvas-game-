//碰撞检测
function monFood(){
  for(var i=0;i<food.num;i++){
    var l=distance(mon.x,mon.y,food.x[i],food.y[i])
    if(l<400){
      wave.create("food")   
      food.alive[i]=false
      if(food.type[i]=="blue"){
        score.blue++
      }else{
        score.orange++
      }
    }
  }
}

function monBaby(){
  var l=distance(mon.x,mon.y,baby.x,baby.y)
  if(l<400){
    wave.start+=deltaTime
    if(wave.start>wave.end){
      wave.create("baby")
      wave.start=0
    }
    score.addScore()
  }
}

//两点间距离公式
function distance(x1,y1,x2,y2){
  return Math.pow(x1-x2,2)+Math.pow(y1-y2,2)
}