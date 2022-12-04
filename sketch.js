// player object
let spaceship; // the spaceship object that players could control
let asteroids; // asteroids in the world
let bullets; // the group of bullets
let rank;
let healthbar;
let bg;
let galaxies;
let earth;
let fueltanks; // group of the upgrade model


// images
let rankImage;
let healthbar_imgs;
let background_imgs;
let earth_img;

// tracking information
let currentHealth = 5; // current health of the spaceship
let ranks = 1;


// animations
let spaceshipAnimation_1;
let galaxyAnimation_1;
let fueltankAnimation;


// some constants
let MARGIN = 40;
let MAXSPEED = 20;
let MAXLIFE = 10;
let RANK1 = "rank1";
let RANK2 = "rank2";
let RANK3 = "rank3";
let HEALTH = ["health1", "health2", "health3", "health4", "health5", "health6", "health7", "health8", "health9", "health10"];


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


  // load healthbar images
  healthbar_imgs = new Array();
  healthbar_imgs[0] = loadAni("./assets/healthbar/healthbar_00.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[1] = loadAni("./assets/healthbar/healthbar_01.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[2] = loadAni("./assets/healthbar/healthbar_02.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[3] = loadAni("./assets/healthbar/healthbar_03.png",{ size: [64, 64], frames: 1 });
  healthbar_imgs[4] = loadAni("./assets/healthbar/healthbar_04.png",{ size: [64, 64], frames: 1 });
  healthbar_imgs[5] = loadAni("./assets/healthbar/healthbar_05.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[6] = loadAni("./assets/healthbar/healthbar_06.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[7] = loadAni("./assets/healthbar/healthbar_07.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[8] = loadAni("./assets/healthbar/healthbar_08.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[9] = loadAni("./assets/healthbar/healthbar_09.png", { size: [64, 64], frames: 1 });



  // load all animations
  spaceshipAnimation_1 = loadAnimation(
    "./assets/spaceship/NormalSpaceship/spaceship_01.png",
    "./assets/spaceship/NormalSpaceship/spaceship_02.png",
    "./assets/spaceship/NormalSpaceship/spaceship_03.png",
    "./assets/spaceship/NormalSpaceship/spaceship_04.png"
  )

  galaxyAnimation_1 = loadAnimation("./assets/decorations/milky_galaxy.png", { size: [70, 70], frames: 50 });
  galaxyAnimation_1.frameDelay = 50;

  // load rank images
  rankImage = new Array();
  rankImage.length = 3;
  rankImage[0] = loadAnimation("./assets/ranks/rank1.png", { size: [64, 64], frames: 2 });
  rankImage[1] = loadAnimation("./assets/ranks/rank2.png", { size: [64, 64], frames: 2 });
  rankImage[2] = loadAnimation("./assets/ranks/rank3.png", { size: [64, 64], frames: 2 });
  rankImage.forEach(s => s.frameDelay = 20);

  // load earth animation
  earth_img = loadAnimation("./assets/decorations/earth_planet.png", { size: [70, 70], frames: 50 });
  earth_img.frameDelay = 50;

  // load the upgrade model animations
  fueltankAnimation = loadAnimation("./assets/props/fueltank.png", { size: [64, 64], frames: 7 });
  fueltankAnimation.frameDelay = 2;

}
function setup() {
  createCanvas(windowWidth, windowHeight);

  // set up the props
  fueltanks = new Group();
  let o = new Sprite();
  o.addAni("", fueltankAnimation);
  // o.removeColliders();
  o.position.x = 400;
  o.position.y = 400;
  o.scale = 2;
  o.layer = 4;
  fueltanks.add(o);

  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  // spaceship.addAni(SPAC_ANI_1, spaceshipAnimation_1);
  spaceship.direction = -90;
  spaceship.layer = 4;
  spaceship.overlaps(fueltanks, collectFuelTank);

  // set up the bullets 
  spaceship.scale = 4;
  bullets = new Group(); // create a group of bullet


  // set up the rank
  rank = new Sprite();
  rank.removeColliders();
  rank.addAni(RANK1, rankImage[0]);
  rank.layer = 1;

  //set up the healthbar
  healthbar = new Sprite();
  healthbar.removeColliders();
  healthbar.layer = 1;
  for(let i = 0; i < healthbar_imgs.length; i++){
    healthbar.addAni(HEALTH[i], healthbar_imgs[i]);
  }

  // set up earth and galaxies
  galaxies = new Group();
  earth = new Sprite();
  earth.removeColliders();
  createEarth();
  createGalaxies();

}

function createEarth() {
  earth.addAni("earthAni", earth_img);
  earth.scale = 10;
  earth.position.x = windowWidth - 400;
  earth.position.y = 400;
}

function createGalaxies() {
  // set up the decorations
  galaxies.removeAll();
  for (let i = 0; i < 5; i++) {
    let s = new Sprite();
    s.layer = 0;
    s.removeColliders();
    s.scale = random(1, 20);
    s.addAni("galaxyAni", galaxyAnimation_1);
    s.position.x = random(400, windowWidth - 400);
    s.position.y = random(400, windowHeight - 400);
    s.vel.x = random(-0.2, 0.2);
    s.vel.y = random(-0.2, 0.2);
    galaxies.add(s);
  }
}


function draw() {


  spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary
  // bullet shooting logic         
  if (!spaceship.removed && kb.presses('J')) {

    // create sprites
    let bullet = createSprite(spaceship.position.x, spaceship.position.y);
    bullet.layer = 3;
    bullet.scale = 0.5;
    bullet.color = '66CCFF';
    bullet.removeColliders();
    bullet.setSpeed(20 + spaceship.speed, spaceship.direction);
    bullet.life = 60;
    bullets.add(bullet);
  }
  spaceShipControl();    // take charge of the control block of the spaceship
  updateShipProperty();     // draw the current health of the spaceship according to some condition




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
    spaceship.rotation -= 3;
    spaceship.direction -= 3;
  }

  if (kb.presses('right') || kb.presses('D') || kb.pressing('right') || kb.pressing('D')) {
    // (direction, speed, distance)
    spaceship.rotation += 3;
    spaceship.direction += 3;
  }

  if ((kb.pressing('up') || kb.pressing('W'))) {
    if (spaceship.speed < MAXSPEED) {
      spaceship.addSpeed(0.5, spaceship.direction);
    } else {
      spaceship.speed == MAXSPEED;
    }
  } else {
    if (spaceship.speed > 0) {
      if (spaceship.speed - 0.1 > 0) {
        spaceship.speed -= 0.1;
      } else {
        spaceship.speed = 0;
      }
    } else {
      spaceship.speed = 0;
    }
  }
}

function spaceshipResetPosit() {

  for (var i = 0; i < allSprites.length; i++) {
    let s = spaceship;
    if (s.position.x < -MARGIN) {
      s.position.x = width + MARGIN;
      createGalaxies();
    } else if (s.position.x > width + MARGIN) {
      s.position.x = -MARGIN;
      createGalaxies();
    }

    if (s.position.y < -MARGIN) {
      s.position.y = height + MARGIN;
      createGalaxies();
    } else if (s.position.y > height + MARGIN) {
      s.position.y = -MARGIN;
      createGalaxies();
    }
  }
}


/**
 * update the properties of the spaceship
 */
function updateShipProperty() {
  healthbar.changeAnimation(HEALTH[currentHealth- 1]);
  updateStatusBar(); // update the UI
}

function updateStatusBar() {
  rank.position.y = windowHeight - 200;
  rank.position.x = windowWidth / 2;
  rank.scale = 4;
  
  healthbar.position.y = rank.position.y;
  healthbar.position.x = rank.position.x - 300;
  healthbar.scale = 4;
}


function collectFuelTank(spaceship, fueltank) {
  console.log("I am called");
  fueltank.remove();
  currentHealth++;
}
