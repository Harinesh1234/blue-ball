var END = 0
var PLAY = 1;
var WIN = 1;
var LOSE = 0;
var VICTORY = 2
var rand;
var scaleFactor;
var gameState = PLAY;

var green_ball, green_ballImg
var ground
var groundImg
var invisibleGround
var obstacles, obstacle1,obstacle2,l2obstacle1,l2obstacle2,l3obstacle1,l3obstacle2,l5obstacle1,l5obstacle2,l5obstacle3
var obstacle
var bgSound
var gemstones,gem1,gem2,gem3
var collectingSound
var ground2Img
var ground3Img
var ground4Img
var ground5ImgBoss
var time = 0
var rewards = 0
var dieSound
var jumpSound


var restart,restartImg
var flag,flagImg

//changing level
level = 0

function preload(){
  groundImg = loadImage("ASSETS/ground.png");
  ground2Img = loadImage("ASSETS/forest.jpg")
  ground3Img = loadImage("ASSETS/snowy background.jpg")
  ground4Img = loadImage("ASSETS/maxresdefault.jpg")
  ground5ImgBoss = loadImage("ASSETS/360_F_190474123_KRs8ebCdfLqz5G68UxUNlLtkCEIqYeWi.jpg")
  green_ballImg = loadImage("ASSETS/blue ball.png")
  l2obstacle1 = loadImage("ASSETS/Ghost-Scary-Transparent-PNG.png")
  l2obstacle2 = loadImage("ASSETS/Regular_Zombie.webp")
  l3obstacle1 = loadImage("ASSETS/enemy3.webp")
  l3obstacle2 = loadImage("ASSETS/abominable-yeti.png")
  l4obstacle1 = loadImage("ASSETS/CecaelianAbomination.webp")
  l4obstacle2 = loadImage("ASSETS/Strangefish.webp")
  l5obstacle1 = loadImage("ASSETS/CavernBoss.webp")
  l5obstacle2 = loadImage("ASSETS/zombie boss.png")

  obstacle1 = loadImage("ASSETS/Boss_2-1.png.webp")
  obstacle2 = loadImage("ASSETS/the enemy.webp")
  bgSound = loadSound("ASSETS/World 1.mp3")
  gem1 = loadImage("ASSETS/Tanzanite_AG1-250x250C.png")
  gem2 = loadImage("ASSETS/africa-ruby-602070_s.png")
  gem3 = loadImage("ASSETS/polished-diamond.png")
  collectingSound = loadSound("ASSETS/collectcoin-6075.mp3")
  flagImg = loadImage("ASSETS/flag.png")
  dieSound = loadSound("ASSETS/mixkit-sad-game-over-trombone-471 (1).wav")
  jumpSound = loadSound("ASSETS/jump_c_02-102843.mp3")
  restartImg = loadImage("ASSETS/restart button.webp")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  ground = createSprite(windowWidth/2,windowHeight/2+300)
  ground.addImage("ground5",ground5ImgBoss)
  ground.addImage("ground4",ground4Img)
  ground.addImage("ground3",ground3Img)
  ground.addImage("ground2",ground2Img)
  ground.addImage("ground",groundImg);
  ground.changeImage("ground")
  ground.scale = 1.5

  green_ball = createSprite(windowWidth/8,windowHeight-175)
  green_ball.addImage("ball",green_ballImg)
  green_ball.scale = 0.15
  

  invisibleGround = createSprite(windowWidth/2,windowHeight/2+190,windowWidth,20)
  invisibleGround.visible = false;

  obstacles =  new Group()
  gemstones = new Group()
  green_ball.setCollider("circle",0,0,275);

  flag = createSprite(windowWidth/2,windowHeight-200)
  flag.addImage("flag",flagImg);
  flag.scale = 0.3
  flag.visible = false;
  flag.setCollider("rectangle",0,0,250,300)
  
  restart = createSprite(windowWidth/2,windowHeight/2)
  restart.addImage(restartImg)
  restart.scale = 0.4
  flag.debug = true
  bgSound.play()
  bgSound.setVolume(0.2)

}

function draw(){
  
  background("lightblue")
  if(gameState === PLAY && level === 0){

    restart.visible = false;
    commonProcess(obstacle1, obstacle2);
      
  }

  else if(gameState === PLAY && level === 1){

    commonProcess(l2obstacle1, l2obstacle2);
    obstacle.scale = 0.4;

  }
  else if(gameState === PLAY && level === 2){

    commonProcess(l3obstacle1, l3obstacle2);
    obstacle.scale = 0.4;

  }
  else if(gameState === PLAY && level === 3){

    commonProcess(l4obstacle1, l4obstacle2);
    obstacle.scale = 0.4;

  }
  else if(gameState === PLAY && level === 4){

    commonProcess(l5obstacle1, l5obstacle2);
    obstacle.scale = 0.8;

  }
else if (gameState === END) {
  console.log("GAME OVER!!")
  textSize(20)
  fill("black")
  text("NOO! you lost!!", windowWidth/2-70, windowHeight/2-80)
  restart.visible = true;
  restart.rotation += 3 
  if(mousePressedOver(restart)){
    reset()
  }
  obstacles.setLifetimeEach(-1);
  obstacles.setVelocityXEach(0);

  gemstones.setLifetimeEach(-1);
  gemstones.setVelocityXEach(0);
  ground.velocityX = 0
  green_ball.velocityX = 0
  green_ball.velocityY = 0
}
else if(gameState === VICTORY){
  obstacles.destroyEach();
  obstacles.setVelocityXEach(0);

  textSize(50)
  fill("black")
  text("YAY! you won!!", windowWidth/2,windowHeight/2)

  gemstones.destroyEach();
  gemstones.setVelocityXEach(0);
  ground.velocityX = 0
  green_ball.velocityX = 0
  green_ball.velocityY = 0
}
  drawSprites();
  textSize(20)
  fill ("black")
  text("Time:  "+ time,50,50)
  text("Rewards: "+ rewards,50,80)

}

function spawnObstacles(obs1,obs2){
  if (frameCount % 60 === 0){
    obstacle = createSprite(windowWidth,461,10,40);
    obstacle.scale = 0.85
    obstacle.setCollider("rectangle",0,0,120,120)
    obstacle.velocityX = -10;
    obstacles.add(obstacle)
    rand = Math.round(random(1,2));
    switch(rand){
      case 1: obstacle.addImage(obs1);
              break;
      case 2: obstacle.addImage(obs2);
              break;

      default: break;
    }
  }
  }

function spawnCollectibles(){
  if(frameCount % 140 === 0){
    var collectibles = createSprite(windowWidth,windowHeight/2,10,40);
    collectibles.scale = 0.2
    var rand = Math.round(random(1,3))
    collectibles.velocityX = -10
    gemstones.add(collectibles)
    switch(rand){
      case 1: collectibles.addImage(gem1)
                          break;
      case 2: collectibles.addImage(gem2)
                          break;
      case 3: collectibles.addImage(gem3)
                          break;
      default : break
    }
  }
}

function secondLevel(){
  level = 1
  ground.changeImage("ground2")
  ground.x = windowWidth/2
  ground.y = windowHeight/2
  ground.scale = 2.1
  flag.visible = false;
  gameState = PLAY
  
  ground.velocityX = -10
  if(ground.x < 540 ){
    ground.x = windowWidth/2
}

}

function thirdLevel(){
  level = 2
  ground.changeImage("ground3")
  ground.x = windowWidth/2
  ground.y = windowHeight/2
  ground.scale = 1.9
  flag.visible = false;
  gameState = PLAY
  
  ground.velocityX = -10
  if(ground.x < 540 ){
    ground.x = windowWidth/2
} 
}

function fourthLevel(){
  level = 3
  ground.changeImage("ground4")
  ground.x = windowWidth/2
  ground.y = windowHeight/2
  ground.scale = 1.9
  flag.visible = false;
  gameState = PLAY
  
  ground.velocityX = -10
  if(ground.x < 540 ){
    ground.x = windowWidth/2
  }
}

  function fifthLevel(){
    level = 4
    ground.changeImage("ground5")
    ground.x = windowWidth/2
    ground.y = windowHeight/2
    ground.scale = 2.45
    flag.visible = false;
    gameState = PLAY
    
    ground.velocityX = -10
    if(ground.x < 540 ){
      ground.x = windowWidth/2
    } 
  


}

function commonProcess(obs1, obs2){

  if(green_ball.x > windowWidth/1.5){
    green_ball.x = windowWidth/8
    green_ball.y = windowHeight-175
  }
  
  time = time + Math.round(getFrameRate()/60);
  green_ball.rotation += 10
  ground.velocityX = -10
  
  if(ground.x < 540 ){
    ground.x = windowWidth/2
  }
  
  if(keyDown("UP_ARROW") && green_ball.y >= 450){
    jumpSound.play()
    jumpSound.setVolume(0.2)
    green_ball.velocityY = -20
  }

  green_ball.velocityY += 1
  green_ball.collide(invisibleGround)

  if(obstacles.isTouching(green_ball)){
    bgSound.stop()
    dieSound.play()
    dieSound.setVolume(0.05)
    gameState = END;
  }

  if(gemstones.isTouching(green_ball)){
    collectingSound.play()
    rewards += 1
    collectingSound.setVolume(0.5)
    gemstones.destroyEach();
  }

  if(time >= 350){

    flag.visible = true;
    obstacles.destroyEach()
    obstacles.setVelocityXEach(0);

    green_ball.velocityX = 5

    gemstones.destroyEach()
    gemstones.setVelocityXEach(0);
    //stop ground
    ground.velocityX = 0

  }

  if(green_ball.isTouching(flag)&& level === 0){
    green_ball.velocityX = 0
    green_ball.velocityY = 0
    time = 0
    flag.visible = false
    gameState = WIN
      secondLevel()
    if(gameState === WIN){
      green_ball.x = windowWidth/8
      green_ball.y = windowHeight-175
    }
  }
  if(green_ball.isTouching(flag)&& level === 1){
    thirdLevel()
    green_ball.velocityX = 0
    green_ball.velocityY = 0
    flag.visible = false
    time = 0
    gameState = WIN
    green_ball.x = windowWidth/8
      green_ball.y = windowHeight-175
  }

  if(green_ball.isTouching(flag)&& level === 2){
    fourthLevel()
    green_ball.velocityX = 0
    green_ball.velocityY = 0
    flag.visible = false
    time = 0
    gameState = WIN
    green_ball.x = windowWidth/8
      green_ball.y = windowHeight-175
  }
  if(green_ball.isTouching(flag)&& level === 3){
    fifthLevel()
    green_ball.velocityX = 0
    green_ball.velocityY = 0
    flag.visible = false
    time = 0
    gameState = WIN
    green_ball.x = windowWidth/8
      green_ball.y = windowHeight-175
  }
  if(green_ball.isTouching(flag)&& level === 4){
    ground.changeImage("ground")
    ground.velocityX = 0
    ground.velocityY = 0
    ground.x = windowWidth/2
    ground.y = windowHeight/2+300
    ground.scale = 1.5
    green_ball.velocityX = 0
    green_ball.velocityY = 0
    flag.visible = false
    time = 1
    gameState = VICTORY
  }


  spawnObstacles(obs1, obs2)
  spawnCollectibles()
}


function reset(){
  gameState = PLAY
  obstacles.destroyEach()
  gemstones.destroyEach()
  time = 0
  rewards = 0
  restart.visible = false
  ground.addImage("ground",groundImg);
  ground.addImage("ground2",ground2Img)
  ground.addImage("ground3",ground3Img);
  ground.addImage("ground4",ground4Img);
  ground.addImage("ground5",ground5ImgBoss);
  ground.changeImage("ground")
  ground.x = windowWidth/2
  ground.y = windowHeight/2+300
  ground.scale = 1.5
  flag.visible = false
  level = 0

}