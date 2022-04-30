var playerImg;
var car1;
var car2;
var car3;
var roadImg;
var gameOverImg;
var startImg;

var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0

function preload(){
 
    playerImg = loadImage("car-player.png");
    car1 = loadImage("car1.png");
    car2 = loadImage("car2.png");
    car3 = loadImage("car3.png");
    roadImg = loadImage("Road.png");
    gameOverImg = loadImage("gameOver.png");
    startImg = loadImage("start.png")
    
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(width / 2, height - 90, 20, 20);
    player.addImage(playerImg);
    player.scale = 0.3;
    player.depth = 2;
        
    road = createSprite(width / 2, 200);
    road.addImage(roadImg);
    road.scale = 1;
    road.depth = 1;
    
    gameOver = createSprite(width / 2, height - 400, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    gameOver.scale = 2;

    start = createSprite(width / 2, height - 400, 50, 50);
    start.addImage(startImg);
    start.scale = 1;
    start.depth = 3;

    whiteCarG = new Group()
    blackCarG = new Group()
    niceCarG = new Group() 
    
    edges = createEdgeSprites();

    score = 0
}

function draw() {
    
    background("white")
    textSize(20);
    fill("black")
    text("Score: " + score, 30, 50);
    //não consegui colocar o texto do score :(

    if(keyDown("SPACE")){
        gameState === PLAY
        start.visible = false
    }

    if (gameState === PLAY){
        score = score + Math.round(getFrameRate() / 60);
        road.velocityY = (6 + 3 * score / 100);

        player.x = World.mouseX
        player.velocityX = 2
 
        player.setCollider("rectangle", 0, 0, 150, 450);
        whiteCarG.setColliderEach("rectangle", 0, 0, 100, 250);
        niceCarG.setColliderEach("rectangle", 0, 0, 150, 450);
        blackCarG.setColliderEach("rectangle", 0, 0, 100, 250);
        //player.debug = true

        
        spawnWhiteCars()
        spawnBlackCars()
        spawnNiceCars()


        player.collide(edges);

        if(road.y > height){
            road.y = height/4;
        }

        
        if(player.isTouching(whiteCarG)){ 
            gameState = END
        }

        if(player.isTouching(blackCarG)){
            gameState = END
        }

        if(player.isTouching(niceCarG)){
            gameState = END
        }
        
        if(gameState === END){
            
            gameOver.visible = true;
            
            
            player.velocityX = 0;
            road.velocityY = 0;
                     
            whiteCarG.setVelocityYEach(0);
            blackCarG.setVelocityYEach(0);
            niceCarG.setVelocityYEach(0);
            
            whiteCarG.setLifetimeEach(-1);
            blackCarG.setLifetimeEach(-1);
            niceCarG.setLifetimeEach(-1);

        }

    } 
    
    drawSprites()
}

function spawnWhiteCars(){
    if(World.frameCount % 70 == 0){
        whiteCar = createSprite(Math.round(random(50, width-50), 40, 10, 10))
        whiteCar.addImage(car1)
        whiteCar.scale = 0.5
        whiteCar.velocityY = road.velocityY
        whiteCar.lifetime = 400
        whiteCarG.add(whiteCar)
        whiteCarG.depth = 2;
        //whiteCar.debug = true;
     
    }
}

function spawnBlackCars(){
    if(World.frameCount % 250 == 0){
        blackCar = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        blackCar.addImage(car2);
        blackCar.scale = 0.5;
        blackCar.velocityY = road.velocityY;
        blackCar.lifetime = 400;
        blackCarG.add(blackCar);
        blackCarG.depth = 2;
        //blackCar.debug = true;
        
    }
}

function spawnNiceCars(){
    if(World.frameCount % 150 == 0){
        niceCar = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        niceCar.addImage(car3);
        niceCar.scale = 0.25;
        niceCar.velocityY = road.velocityY;
        niceCar.lifetime = 400;
        niceCarG.add(niceCar);
        niceCarG.depth = 2;
        //niceCar.debug = true;
    }
}


