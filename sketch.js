// player object
let spaceship; // the spaceship object that players could control
let asteroids; // asteroids in the world
let bullets; // the group of bullets
let rank;
let healthbar;
let bg;

// images
let rankImage;
let healthbar_imgs;
let background_imgs;

// numbered constants
let currentHealth = 5; // current health of the spaceship
let ranks = 1;


// animations
let spaceshipAnimation_1;


// some constants
let MARGIN = 40;
let MAXSPEED = 20;
let MAXLIFE = 10;
let RANK1 = "rank1";
let RANK2 = "rank2";
let RANK3 = "rank3";
let HEALTH_1 = "health1";
let HEALTH_2 = "health2";
let HEALTH_3 = "health3";
let HEALTH_4 = "health4";
let HEALTH_5 = "health5";
let HEALTH_6 = "health6";
let HEALTH_7 = "health7";
let HEALTH_8 = "health8";
let HEALTH_9 = "health9";
let HEALTH_10 = "health10";

let SPAC_ANI_1 = "spaceshipAnimation1";


/**
 * Loading assets preemptively to avoid further discomfort
 */
preload = function () {

  // load the background images
  background_imgs = new Array();
  background_imgs[0] = loadImage("./assets/background/space_background_1.png");
  background_imgs[1] = loadImage("./assets/background/space_background_2.png");
  background_imgs[2] = loadImage("./assets/background/space_background_fake.png");

  // load rank images
  rankImage = new Array();
  rankImage.length = 3;
  rankImage[0] = loadImage("./assets/ranks/rank1.png");
  rankImage[1] = loadImage("./assets/ranks/rank2.png");
  rankImage[2] = loadImage("./assets/ranks/rank3.png");

  // load healthbar images
  healthbar_imgs = new Array();
  healthbar_imgs[0] = loadImage("./assets/healthbar/healthbar_00.png");
  healthbar_imgs[1] = loadImage("./assets/healthbar/healthbar_01.png");
  healthbar_imgs[2] = loadImage("./assets/healthbar/healthbar_02.png");
  healthbar_imgs[3] = loadImage("./assets/healthbar/healthbar_03.png");
  healthbar_imgs[4] = loadImage("./assets/healthbar/healthbar_04.png");
  healthbar_imgs[5] = loadImage("./assets/healthbar/healthbar_05.png");
  healthbar_imgs[6] = loadImage("./assets/healthbar/healthbar_06.png");
  healthbar_imgs[7] = loadImage("./assets/healthbar/healthbar_07.png");
  healthbar_imgs[8] = loadImage("./assets/healthbar/healthbar_08.png");
  healthbar_imgs[9] = loadImage("./assets/healthbar/healthbar_09.png");



  // load all animations
  spaceshipAnimation_1 = loadAnimation(
    "./assets/spaceship/NormalSpaceship/spaceship_01.png",
    "./assets/spaceship/NormalSpaceship/spaceship_02.png",
    "./assets/spaceship/NormalSpaceship/spaceship_03.png",
    "./assets/spaceship/NormalSpaceship/spaceship_04.png"
  )
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  spaceship.addAni(SPAC_ANI_1, spaceshipAnimation_1);
  spaceship.direction = -90;
  spaceship.layer = 4;
  
  // set up the bullets 
  spaceship.scale = 4;
  bullets = new Group(); // create a group of bullet


  // set up the rank
  rank = new Sprite();
  rank.removeColliders();
  rank.addImage(RANK1, rankImage[0]);
  rank.layer = 1;


  //set up the healthbar
  healthbar = new Sprite();
  healthbar.removeColliders();
  healthbar.layer = 1;
  healthbar.addImage(HEALTH_1, healthbar_imgs[currentHealth - 1]);
}



function draw() {

  updateStatusBar();
  spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary
    // bullet shooting logic         
  if (!spaceship.removed && kb.presses('J')) {
    
    // create sprites
    let bullet = createSprite(spaceship.position.x, spaceship.position.y);
    bullet.layer = 3;
    bullet.removeColliders();
    bullet.setSpeed(10 + spaceship.speed, spaceship.direction);
    bullet.life = 60;
    bullets.add(bullet);
  }
  spaceShipControl();    // take charge of the control block of the spaceship
  spaceshipHealth();     // draw the current health of the spaceship according to some condition
 



  // set up the background images

  // background(0);       
  background(background_imgs[0]);
  // background(0);
}



function spaceShipControl() {

  // spaceship.direction -= 90; // adjust the rotation direction
  console.log(spaceship.direction);
  console.log(spaceship.rotation);
  console.log(spaceship.speed);
  // control the player movement
  if (kb.presses('left') || kb.presses('A') || kb.pressing('left') || kb.pressing('A')) {
    // (direction, speed, distance)
    spaceship.rotation -= 1.5;
    spaceship.direction -= 1.5;
  }

  if (kb.presses('right') || kb.presses('D') || kb.pressing('right') || kb.pressing('D')) {
    // (direction, speed, distance)
    spaceship.rotation += 1.5;
    spaceship.direction+= 1.5;
  }

  if ((kb.pressing('up') || kb.pressing('W'))) {
    if (spaceship.speed < MAXSPEED) {
      spaceship.addSpeed(0.5, spaceship.direction);
    } else {
      spaceship.speed == MAXSPEED;
    }
  } else {
    spaceship.speed = (spaceship.speed > 0) ? spaceship.speed - 0.1 : 0;
  }
}

function spaceshipResetPosit() {
  let s = spaceship;
  if (s.position.x < -MARGIN) {
    s.position.x = width + MARGIN;
  } else if (s.position.x > width + MARGIN) {
    s.position.x = -MARGIN;
  }

  if (s.position.y < -MARGIN) {
    s.position.y = height + MARGIN;
  } else if (s.position.y > height + MARGIN) {
    s.position.y = -MARGIN;
  }
}


/**
 * Function takes in charge of drawing of the health bar
 */
function spaceshipHealth() {

}

function updateStatusBar() {
  rank.position.y = windowHeight -200;
  rank.position.x = windowWidth / 2;
  rank.scale = 4;
  healthbar.position.y = rank.position.y;
  healthbar.position.x = rank.position.x - 300;
  healthbar.scale = 4;
}