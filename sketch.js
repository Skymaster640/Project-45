var player;
var playerImg;
var playerState = "normal";
var lifeCount = 3;
var lifeCounter;
var lifeImg;
var enemy
var enemyImg;
var ground;
var checkpoint;
var platformGroup;
var flagImg;
var checkpointcounter;
var cloud;
var cloudImg;
var tempCloud;
var spring;
var springImg;
var gameState = "play";

function preload(){
  playerImg = loadAnimation("Placeholder_Player0.png");
  lifeImg = loadAnimation("Placeholder_Lifecount0.png");
  enemyImg = loadAnimation("Placeholder_Enemy0.png");
  flagImg = loadAnimation("Placeholder_Flag0.png");
  springImg = loadAnimation("Placeholder_Spring0.png");
  cloudImg = loadAnimation("Placeholder_Cloud0.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(windowWidth/2,600,windowWidth,10);
  player = createSprite(1000,500,10,10);
  player.addAnimation("default",playerImg);
  player.scale=0.5;

  lifeCounter = createSprite(100,100,10,10);
  lifeCounter.addAnimation("regular",lifeImg);

  enemy = createSprite(1300,500,10,10);
  enemy.addAnimation("normal",enemyImg);
  enemy.scale = 0.5;

  checkpoint = createSprite(100,500,10,10);
  checkpoint.addAnimation("Flag",flagImg);
  checkpoint.scale = 0.5;

  checkpointcounter = createSprite(1000,500,10,10);
  checkpointcounter.visible = false;

  tempCloud = createSprite(400,450,50,10);
  tempCloud.visible = false;

  cloud = createSprite(400,450,50,10);
  cloud.addAnimation("Cloud",cloudImg);
  cloud.scale = 0.5;

  spring = createSprite(400,420,10,10);
  spring.addAnimation("Spring",springImg);
  spring.scale = 0.2;
}

function draw() {
  background("Yellow");

  textSize(50);
  text(lifeCount,200,120);

  if(gameState==="play"){
  player.collide(ground);
  player.collide(tempCloud);
  enemy.collide(ground);


  if(keyWentDown("W")&&playerState==="normal"){
    player.velocityY = -10;
  }
  else if(keyWentDown("W")&&playerState==="jumpboost"){
    player.velocityY = -15;
  }
  if(keyWentDown("A")){
    player.velocityX = -10;
  }
  if(keyWentUp("A")){
    player.velocityX = 0;
  }
  if(keyWentDown("D")){
    player.velocityX =10;
  }
  if(keyWentUp("D")){
    player.velocityX = 0;
  }
  player.velocityY = player.velocityY+0.5;

  enemy.velocityY = player.velocityY;

  if(player.x > enemy.x - 100){
    enemy.velocityX = 5;
  }
  else if(player.x < enemy.x + 100){
    enemy.velocityX = -5;
  }
  else{
    enemy.velocityX = 0;
  }




  if(player.isTouching(checkpoint)){
    checkpointcounter.x = checkpoint.x;
    checkpointcounter.y = checkpoint.y;
  }

  if(player.isTouching(enemy)){
    player.x = checkpointcounter.x;
    player.y = checkpointcounter.y;
    lifeCount = lifeCount - 1;
  }

  if(player.isTouching(cloud)){
    cloud.lifetime=20;
    tempCloud.lifetime=20;
  }

  if(player.isTouching(spring)){
    playerState = "jumpboost";
    spring.lifetime = 1;
  }
  if(lifeCount === 0){
    gameState = "end";
  }

}

  if(gameState === "end"){
    textSize(100);
    fill("RED");
    text("GAME OVER",windowWidth/2 - 300,windowHeight/2);

    enemy.velocityX = 0;
    enemy.velocityY = 0;
    player.velocityX = 0;
    player.velocityY = 0;
  }

  drawSprites();
}

