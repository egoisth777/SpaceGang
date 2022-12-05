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
let upgradeModel; // upgrade model across the map
let difficulty;


// images
let rankImage_arr;
let healthbar_imgs;
let background_imgs;
let earth_img;
let bullet_img;

// tracking information
let currentHealth = 5;
let ranks = 1;
let score = 0;
let maxspeed = 5;


// animations
let spaceshipAnimation_1; // normal animation
let spaceshipAnimation_2; // faster animation
let spaceshipAnimation_3; // firing power animation
let spaceshipAnimation_4; // fuel animation
let destroyAnimation;     // destroy animation
let destroyAnimation2;    // another destroy animation
let galaxyAnimation_1;
let shieldAnimation;
let upgradeIconAnimation; // upgrade icon animation

// some constants
const MARGIN = 40;
const MAXLIFE = 10;
const CANVASWIDTH = 1200;
const CANVASHEIGHT = 1200;
const MAXUPGRADE = 12;

const RANK1 = "rank1";
const RANK2 = "rank2";
const RANK3 = "rank3";
const HEALTH = ["health1", "health2", "health3", "health4", "health5", "health6", "health7", "health8", "health9", "health10"];


const SPAC_ANI_1 = "spaceshipAnimation1";
const SPAC_ANI_2 = "spaceshipAnimation2";
const SPAC_ANI_3 = "spaceshipAnimation3";
const SPAC_ANI_4 = "spaceshipAnimation4";



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
  healthbar_imgs[3] = loadAni("./assets/healthbar/healthbar_03.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[4] = loadAni("./assets/healthbar/healthbar_04.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[5] = loadAni("./assets/healthbar/healthbar_05.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[6] = loadAni("./assets/healthbar/healthbar_06.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[7] = loadAni("./assets/healthbar/healthbar_07.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[8] = loadAni("./assets/healthbar/healthbar_08.png", { size: [64, 64], frames: 1 });
  healthbar_imgs[9] = loadAni("./assets/healthbar/healthbar_09.png", { size: [64, 64], frames: 1 });



  // load all animations
  spaceshipAnimation_1 = loadAnimation("./assets/spaceship/spaceship.png", { size: [64, 64], frames: 4 });
  spaceshipAnimation_2 = loadAnimation("./assets/spaceship/spaceship_faster.png", { size: [64, 64], frames: 4 });
  spaceshipAnimation_3 = loadAnimation("./assets/spaceship/spaceship_firepower.png", { size: [64, 64], frames: 4 });
  spaceshipAnimation_4 = loadAnimation("./assets/spaceship/spaceship_firepower.png", { size: [64, 64], frames: 4 });


  galaxyAnimation_1 = loadAnimation("./assets/decorations/milky_galaxy.png", { size: [70, 70], frames: 50 });
  galaxyAnimation_1.frameDelay = 50;

  // load rank images
  rankImage_arr = new Array();
  rankImage_arr.length = 3;
  rankImage_arr[0] = loadAnimation("./assets/ranks/rank1.png", { size: [64, 64], frames: 2 });
  rankImage_arr[1] = loadAnimation("./assets/ranks/rank2.png", { size: [64, 64], frames: 2 });
  rankImage_arr[2] = loadAnimation("./assets/ranks/rank3.png", { size: [64, 64], frames: 2 });
  rankImage_arr.forEach(s => s.frameDelay = 20);

  // load earth animation
  earth_img = loadAnimation("./assets/decorations/earth_planet.png", { size: [70, 70], frames: 50 });
  earth_img.frameDelay = 50;

  // load the upgrade model animations
  shieldAnimation = loadAnimation("./assets/props/shield.png", { size: [64, 64], frames: 7 });
  shieldAnimation.frameDelay = 2;

  // load the bullet image
  bullet_img = loadImage("./assets/asteroids/asteroids_bullet.png");

  // load spaceship destroy animation
  destroyAnimation = loadAnimation("./assets/asteroids/explosion_particles.png", { size: [64, 64], frames: 25 });
  destroyAnimation.frameDelay = 3;
  destroyAnimation2 = loadAnimation("./assets/asteroids/explosion_particles_blue.png", { size: [64, 64], frames: 25 });
  destroyAnimation2.frameDelay = 3;
  

  // load upgrade icon animation
  upgradeIconAnimation = loadAnimation("./assets/asteroids/upgrade_icon.png", { size: [64, 64], frames: 1});
  asteroid_img = new Array();

}


function setup() {
  createCanvas(CANVASWIDTH, CANVASWIDTH);
  //set some constants
  currentHealth = 5;

  // set up the props and decorations across the map
  fueltanks = new Group();
  let o = new Sprite();
  o.addAni("", shieldAnimation);
  o.bounciness = 0.1;
  // o.removeColliders();
  o.position.x = 400;
  o.position.y = 400;
  o.scale = 0.5;
  o.layer = 4;
  fueltanks.add(o);


  // set up earth and galaxies
  galaxies = new Group();
  earth = new Sprite();
  earth.removeColliders();
  createEarth();
  createGalaxies();

  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  spaceship.addAni(SPAC_ANI_4, spaceshipAnimation_4);
  spaceship.addAni(SPAC_ANI_3, spaceshipAnimation_3);
  spaceship.addAni(SPAC_ANI_2, spaceshipAnimation_2);
  spaceship.addAni(SPAC_ANI_1, spaceshipAnimation_1);
  spaceship.direction = -90;
  spaceship.layer = 4;
  spaceship.overlaps(fueltanks, collectShield);
  spaceship.kinematic = true;
  spaceship.update= function(){
    let size = upgradeIcons.size();
    if(size > 0 && rank < 6){
      return;
    }
    if(size >= 6 && size < 12){
      spaceship.addAni(SPAC_ANI_4);
      maxspeed = 10;
      return;
    }
    if(size >= 12){
      spaceship.addAni(SPAC_ANI_2);
      maxspeed = 15;
      return
    }
  }

  // set up the bullets 
  bullets = new Group(); // create a group of bullet
  bullets.removeAll();

  // set up the rank
  rank = new Sprite();
  rank.removeColliders();
  rank.addAni(RANK3, rankImage_arr[2]);
  rank.addAni(RANK2, rankImage_arr[1]);
  rank.addAni(RANK1, rankImage_arr[0]);
  rank.layer = 1;
  rank.position.y = CANVASHEIGHT - 100;
  rank.position.x = CANVASWIDTH / 2;
  rank.scale = 1.5;
  rank.update = function(){
    let size = upgradeIcons.size();
    if(size > 0 && rank < 6){
      rank.changeAnimation(RANK1);
      return;
    }
    if(size >= 6 && size < 12){
      rank.changeAnimation(RANK2);
      return;
    }
    if(size >= 12){
      rank.changeAnimation(RANK3);
      return
    }
  }
  //set up the healthbar
  healthbar = new Sprite();
  healthbar.removeColliders();
  healthbar.position.y = rank.position.y;
  healthbar.position.x = rank.position.x - 100;
  healthbar.scale = 1.5;
  healthbar.layer = 1;
  for (let i = 0; i < healthbar_imgs.length; i++) {
    healthbar.addAni(HEALTH[i], healthbar_imgs[i]);
  }
  healthbar.changeAnimation(HEALTH[currentHealth - 1]);


  //set up the asteroids
  asteroids = new Group();
  difficulty = 0;
  // asteroids.removeAll();
  for (var i = 0; i < 10; i++) {
    var angle = random(360);
    px = width / 2 + 1000 * cos(radians(angle));
    py = random(height / 2 + 1000 * sin(radians(angle)));
    createNewAsteroid(ceil(random(4)), px, py, difficulty);
  }

  // set up the upgrade icons
  upgradeIcons = new Group();
}

function createEarth() {
  earth.addAni("earthAni", earth_img);
  earth.scale = 1;
  earth.position.x = CANVASWIDTH - 200;
  earth.position.y = 200;
  earth.layer = 0;
}

function createGalaxies() {
  // set up the decorations
  galaxies.removeAll();
  for (let i = 0; i < 5; i++) {
    let s = new Sprite();
    s.layer = 0;
    s.removeColliders();
    s.scale = floor(random(2, 4));
    s.addAni("galaxyAni", galaxyAnimation_1);
    s.position.x = floor(random(1000));
    s.position.y = floor(random(1000));
    s.vel.x = random(1.2);
    s.vel.y = random(1.2);
    s.direction = random(360);
    galaxies.add(s);
  }
}

/**
 * Create particles at current location
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} size 
 */
function createExplodeParticles(x, y, size) {
  let particles = new Sprite();
  particles.scale = size;
  particles.x = x;
  particles.y = y;
  particles.removeColliders();
  particles.addAni("destroy", destroyAnimation);
  particles.life = 20;
}

/**
 * Create particles at current location
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} size 
 */
 function createExplodeParticles_blue(x, y, size) {
  let particles = new Sprite();
  particles.scale = size;
  particles.x = x;
  particles.y = y;
  particles.removeColliders();
  particles.addAni("destroy", destroyAnimation2);
  particles.life = 30;
}

/**
 * Create asteroids
 * @param {*} type 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function createNewAsteroid(type, x, y, difficulty) {
  var a = createSprite(px, py, type * 20)
  a.speed = 8 - (type) + difficulty;
  a.direction = random(180);
  a.rotationSpeed = 0.5;
  a.type = type;
  a.color = "brown";

  if (a.type == 4) {
    a.scale = 1.75;
  }
  if (a.type == 3) {
    a.scale = 1.65;
  }
  if (a.type == 2) {
    a.scale = 1.55;
  }
  if (a.type == 1) {
    a.scale = 1.5;
  }
  a.mass = 2 + a.scale;
  asteroids.add(a);
  return a;
}


function draw() {

  clear();
  spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary      

  spaceShipControl();    // take charge of the control block of the spaceship
  updateShipProperty();     // draw the cuzrrent health of the spaceship according to some condition
  asteroids.collide(bullets, asteroidHit);
  asteroids.collide(spaceship, spaceshipHit);
  // Set the asteroids control logic

  // set up the background images

  // background(0);       

  if (asteroids.length < 6){
    difficulty++;
    for (var i = 0; i < 10 + (difficulty); i++) {
      var angle = random(360);
      px = width / 2 + 1000 * cos(radians(angle));
      py = random(height / 2 + 1000 * sin(radians(angle)));
      setTimeout(createNewAsteroid(ceil(random(2, 4)), px, py, difficulty), 20000);
    }
  }
  background(background_imgs[1]);
  // background(0);
}

function spaceshipHit(spaceship, sprite) {
  createExplodeParticles(spaceship.position.x, spaceship.position.y, 2);
  currentHealth--;
  if (currentHealth == 0) {
    spaceship.changeAnimation(SPAC_ANI_2);
    destructor();
  }
}

function asteroidHit(asteroid, sprite) {
  if (sprite.removed) {
    return;
  }

  // get score from hitting the asteroids
  let o = new Sprite();
  o.removeColliders();
  o.addAni("upgradeIconAnimation", upgradeIconAnimation);
  let size = upgradeIcons.size();
  o.position.x = rank.position.x + 80  + 30 * (size % 6);
  o.position.y = rank.position.y + 30 * floor((size / 6));
  upgradeIcons.add(o);
  createExplodeParticles_blue(asteroid.position.x, asteroid.position.y, 4);
  sprite.remove();
  asteroid.remove();
}

// place holder function
// comment out this code if you don't want to see the screen
// function gameOver(){
//   background('red');
//   textSize(40);
//   text("Game Over", 300, 300);
//   exit();
// }


/**
 * This function is called to ensure that everything is set to 
 * initialized value when restarted
 */
function destructor() {
  spaceship.remove();
  asteroids.removeAll();
  galaxies.removeAll();
  setup();
}

function spaceShipControl() {

  if (!spaceship.removed && kb.presses('J')) {
    spaceship.changeAnimation(SPAC_ANI_3);
    // create sprites
    let bullet = new Sprite();
    bullet.position.x = spaceship.position.x;
    bullet.position.y = spaceship.position.y;
    bullet.width = 10;
    bullet.height = 10;
    bullet.layer = 3;
    bullet.debug = true;
    bullet.setSpeed(20 + spaceship.speed, spaceship.direction);
    // bullet.removeColliders();
    bullet.life = 20;
    bullet.kinematic = true;
    bullets.add(bullet);
  }else{
    spaceship.changeAnimation(SPAC_ANI_1);
  }
  // spaceship.direction -= 90; // adjust the rotation direction
  // console.log(spaceship.direction);
  // console.log(spaceship.rotation);
  // console.log(spaceship.speed);
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
    if (spaceship.speed < maxspeed) {
      spaceship.addSpeed(0.5, spaceship.direction);
    } else {
      spaceship.speed == maxspeed;
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
    let s = allSprites[i];
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
}


/**
 * update the properties of the spaceship
 */
function updateShipProperty() {
  healthbar.changeAnimation(HEALTH[currentHealth - 1]);
}


/**
 * 
 * @param {} spaceship 
 * @param {*} shield 
 */
function collectShield(spaceship, shield) {
  // console.log("I am called");
  shield.remove();
  currentHealth++;
}
