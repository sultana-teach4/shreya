var mario, marioIMG, marioIMG2;
var ground, Background, backgroundIMG;
var coronavirus, coronavirusIMG;
var handsanitizer, handsanitizerIMG;
var mask, maskIMG;
 var maskGroup;
var mask;
var handSanitizer=0;
var bullet;
var gameState = 0;

function preload() {
  marioIMG = loadImage("mario_standing_removed.png");
  marioIMG2 = loadImage("mario_standing_removed.png","images/mario_removed.png");

  backgroundIMG = loadImage("bg_shreya.png");

  coronavirusIMG = loadImage("coronavirus_removed.png");

  handsanitizerIMG = loadImage("Handsanitizer_removed.png");

  maskIMG = loadImage("mask_removed.png");
  
}

function setup() {
  createCanvas(600,400);
  maskScore=0
  coronavirusGroup = createGroup();
  handsanitizerGroup = createGroup();
  maskGroup = new Group();

  Background = createSprite(300, 100, 800, 350);
  Background.addImage(backgroundIMG);
  Background.scale = 0.68;

  

  mario = createSprite(50, 270, 20, 50);
  mario.addImage(marioIMG);
  mario.addAnimation("change", marioIMG2);
  mario.scale = 0.1;
  console.log(mario.depth);
  ground = createSprite(200, 320, 500, 10);
  ground.visible=false;
  mario.debug = true;
  ground.debug = true;


  

  
}

function draw() {
  fill(0)
//text("MASK : "+ mask,350,50);
//text.depth=Background.depth+1;
//text.visible=true;
//console.log(text.depth)

  if (gameState ===0){
    Background.velocityX = 0;
    if (keyDown("space")) {
      gameState = 1;
      
    }
  }
  if (gameState === 1) {
    Background.velocityX = -3;
    mario.changeAnimation("change", marioIMG2);

    if (Background.x < 0) {
      Background.x = 300;
    }
    spawnCoronavirus();
    spawnHandsanitizer();
    spawnMask();
    mario.collide(ground);
  
    if (keyDown("up_arrow")) {
      mario.velocityY = -10;

    }
    mario.velocityY = mario.velocityY + 0.7;
    if(maskGroup.isTouching(mario)){
      maskGroup.destroyEach();
      maskScore=maskScore+1;
      console.log(mask)

    }
    if(handsanitizerGroup.isTouching(mario)){
      handsanitizerGroup.destroyEach()
      handSanitizer=handSanitizer+1;
    }
if(keyWentDown(LEFT_ARROW) && handSanitizer>=1 || keyWentDown(LEFT_ARROW) &&   maskScore>=1 ){
  handSanitizer-=1;
  maskScore-=1;
  bullets();
  //var bullet=createSprite(mario.x,mario.y,10,10)
  //bullet.velocityX=3;
}
    if(coronavirusGroup.isTouching(mario)){

    }
  }
  

  

  console.log(Background.x);

  

  drawSprites();
  text("MASK : "+ maskScore,350,50);
  text("HANDSANITIZER :" + handSanitizer,350,30)
}

function spawnCoronavirus() {
  if (frameCount % 80 === 0) {
    coronavirus = createSprite(600, 270, 10, 10);
    coronavirus.addImage(coronavirusIMG);
    coronavirus.scale = 0.1;
    coronavirus.y = Math.round(random( 200,250));
    coronavirus.velocityX = -4;
    coronavirusGroup.add(coronavirus);
  }
}

function spawnHandsanitizer() {
  if (frameCount % 250 === 0) {
    handsanitizer = createSprite(600, 260, 10, 10);
    handsanitizer.addImage(handsanitizerIMG);
    handsanitizer.scale = 0.1;
    handsanitizer.y = Math.round(random(180, 250));
    handsanitizer.velocityX = -4;
    handsanitizerGroup.add(handsanitizer);
  }
}

function spawnMask() {
  if (frameCount % 200 === 0) {
    mask = createSprite(600, 280, 10, 10);
    mask.addImage(maskIMG);
    mask.scale = 0.1;
    mask.y = Math.round(random(200, 250));
    mask.velocityX = -4;
    mask.debug=true;
    mask.setCollider("rectangle",0,0,5,5);
    maskGroup.add(mask);
  }
}
function bullets(){
 bullet= createSprite(mario.x, mario.y, 50, 50)
 // arrow.addImage(arrowImage);
  //arrow.x = 360;
  //arrow.y=bow.y;
  bullet.velocityX = 4
 bullet.lifetime = 40;
  //arrow.scale = 0.3;
}



