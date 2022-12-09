// player object
let spaceship; // the spaceship object that players could control
let asteroids; // asteroids in the world
let bullets; // the group of bullets
let rank;
let healthbar;
let bg;
let galaxies;
let earth;
let shields; // group of the upgrade model
let upgradeModel; // upgrade model across the map
let difficulty;

// Menu logistic control variables
let flag = false;
let buttonStart;
let counter = 0;

// images
let rankImage_arr;
let healthbar_imgs;
let background_imgs;
let earth_img;
let start_img;



// tracking information
let currentHealth = 5;
let ranks = 1;
let maxspeed = 5;
let hitTracker = 0;
let score = 0;


// animations
let spaceshipAnimation_1; // normal animation
let spaceshipAnimation_2; // faster animation
let spaceshipAnimation_3; // firing power animation
let spaceshipAnimation_4; // fuel animation
let destroyAnimation;     // destroy animation
let destroyAnimation2;    // another destroy animation
let galaxyAnimation_1;
let shieldAnimation;
let enemyShip_img;
let upgradeIconAnimation; // upgrade icon animation
let missleAnimation;
let bulletAnimation;

// some constants
const MARGIN = 40;
const MAXLIFE = 10;
const CANVASWIDTH = 800;
const CANVASHEIGHT = 800;
const MAXUPGRADE = 12;

const RANK1 = "rank1";
const RANK2 = "rank2";
const RANK3 = "rank3";
const HEALTH = ["health1", "health2", "health3", "health4", "health5", "health6", "health7", "health8", "health9", "health10"];

const SPAC_ANI_ARR = ["spaceshipAnimation1", "spaceshipAnimation2", "spaceshipAnimation3", "spaceshipAnimation4"];
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
  enemyShip_img = loadAnimation("./assets/spaceship/enemy_ship.png", { size: [84, 80], frames: 1 });


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
  earth_img = loadAnimation("./assets/decorations/earth_planet.png", { size: [70, 70], frames: 60 });
  earth_img.frameDelay = 10;

  // load all images
  start_img = loadImage("./assets/background/title_screen.png");

  // load the upgrade model animations
  shieldAnimation = loadAnimation("./assets/props/shield.png", { size: [64, 64], frames: 7 });
  shieldAnimation.frameDelay = 2;

  // load the bullet image


  // load spaceship destroy animation
  destroyAnimation = loadAnimation("./assets/asteroids/explosion_particles.png", { size: [64, 64], frames: 25 });
  destroyAnimation.frameDelay = 3;
  destroyAnimation2 = loadAnimation("./assets/asteroids/explosion_particles_blue.png", { size: [64, 64], frames: 25 });
  destroyAnimation2.frameDelay = 3;


  // load upgrade icon animation
  upgradeIconAnimation = loadAnimation("./assets/asteroids/upgrade_icon.png", { size: [64, 64], frames: 1 });
  asteroid_img = new Array();
  asteroid_img.length = 3;
  asteroid_img[0] = loadAnimation("./assets/asteroids/brown_easy.png", { size: [64, 64], frames: 1 });
  asteroid_img[1] = loadAnimation("./assets/asteroids/gray_medium_2.png", { size: [80, 80], frames: 1 });
  asteroid_img[2] = loadAnimation("./assets/asteroids/black_hard_2.png", { size: [90, 90], frames: 1 });

  asteroid_brown_ani = loadAnimation("./assets/asteroids/brown_easy.png", { size: [64, 64], frames: 32 });
  asteroid_gray_ani = loadAnimation("./assets/asteroids/gray_medium_2.png", { size: [80, 80], frames: 32 });
  asteroid_black_ani = loadAnimation("./assets/asteroids/black_hard_2.png", { size: [85, 85], frames: 32 });
  asteroid_black_ani.frameDelay = 8;
  asteroid_brown_ani.frameDelay = 8;
  asteroid_gray_ani.frameDelay = 8;


  // load the missle animation
  bulletAnimation = loadAnimation("./assets/asteroids/asteroids_bullet.png", { size: [4, 4], frames: 1 });
  missleAnimation = loadAnimation("./assets/asteroids/missle_rocket.png", { size: [64, 64], frames: 3 });
  missleAnimation.frameDelay = 2;
}


function setup() {
  createCanvas(CANVASWIDTH, CANVASWIDTH);
  if(counter < 1){
    buttonStart = createButton("NEW GAME");
    buttonStart.position(550, 1000);
    buttonStart.style('font-size', '30px');
    buttonStart.style('color', 'white');
    buttonStart.style('font-family', 'helvetica');
    buttonStart.style('background-color', 'navy');
    buttonStart.size(150, 100);

    buttonStart.mousePressed(mousePress);
  }

  
  if(!flag){
    background(start_img);
  }else{
  
    buttonStart.remove();
  //set some constants
  currentHealth = 5;

  // set up the props and decorations across the map
  shields = new Group();
  let o = new Sprite();
  o.addAni("", shieldAnimation);
  o.bounciness = 0;
  // o.removeColliders();
  o.position.x = 400;
  o.position.y = 400;
  o.scale = 0.8;
  o.layer = 4;
  // o.collideWithOne(o, spaceShip, collectShield);
  shields.add(o);
  shields.kinematic = false;
  // o.remove();
  // fueltanks.add(o);


  // set up earth and galaxies
  galaxies = new Group();
  earth = new Sprite();
  earth.removeColliders();
  createEarth();
  createGalaxies();

  // enemy = new Sprite();
  // enemy.addImage("enemy", enemyShip_img);
  // enemy.layer = 4;
  // enemy.kinematic = true;
  // enemy.rotation = 180;
  // enemy.position.y = 100;

  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  spaceship.addAni(SPAC_ANI_4, spaceshipAnimation_4);
  spaceship.addAni(SPAC_ANI_3, spaceshipAnimation_3);
  spaceship.addAni(SPAC_ANI_2, spaceshipAnimation_2);
  spaceship.addAni(SPAC_ANI_1, spaceshipAnimation_1);
  // spaceship.direction = -90;
  spaceship.layer = 4;

  // shields.removeColliders();
  spaceship.kinematic = true;
  spaceship.update = function () {
    healthbar.changeAnimation(HEALTH[currentHealth - 1]);
    let size = upgradeIcons.size();
    if (size > 0 && rank < 6) {
      return;
    }
    if (size >= 6 && size < 12) {
      spaceship.addAni(SPAC_ANI_4);
      maxspeed = 8;
      return;
    }
    if (size >= 12) {
      spaceship.addAni(SPAC_ANI_2);
      maxspeed = 10;
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
  rank.update = function () {
    let size = upgradeIcons.size();
    if (size > 0 && rank < 6) {
      rank.changeAnimation(RANK1);
      return;
    }
    if (size >= 6 && size < 12) {
      rank.changeAnimation(RANK2);
      return;
    }
    if (size >= 12) {
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
    createNewAsteroid(ceil(random(3)), px, py, difficulty);
  }

  // set up the upgrade icons
  upgradeIcons = new Group();
  }


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
  var a = createSprite(x, y, type * 30)
  a.speed = 6 - (type) + (difficulty*2);
  a.direction = random(180);
  a.rotationSpeed = 0.5;
  a.type = type;
  a.health = 0;
  // a.color = "brown";

  if (a.type == 3) {
    a.addImage("black", asteroid_img[2]);
    a.scale = 1.75;
    a.health = 3;
  }
  if (a.type == 2) {
    a.addImage("gray", asteroid_img[1]);
    a.scale = 1.65;
    a.health = 2;
  }
  if (a.type == 1) {
    a.addImage("brown", asteroid_img[0]);
    a.scale = 1.55;
    a.health = 1;
  }
  a.mass = 2 + a.scale;
  asteroids.add(a);
  return a;
}

function createShield() {
  let o = new Sprite();
  o.addAni("", shieldAnimation);
  // o.kinematic = true;
  o.position.x = floor(random(1200));
  o.position.y = random(floor(1200));
  o.scale = 0.8;
  o.layer = 4;
  // o.collideWithOne(o, spaceShip, collectShield);
  shields.add(o);
}

function mousePress(){
    console.log("i am called");
    counter = 1;
    flag = true;
    setup();
}

function draw() {
 

  if (!flag) {
    background(start_img);
  } else {

    clear();
    spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary      



    spaceShipControl();    // take charge of the control block of the spaceship
    spaceship.collide(shields, collectShield);
    asteroids.collide(bullets, asteroidHit);
    asteroids.collide(spaceship, spaceshipHit);
    // enemy.position.x += increment;
    // if (enemy.position.x > CANVASWIDTH - 40 || enemy.position.x < 40) {
    //   increment *= -1;
    // }

    if (asteroids.length < 8) {
      difficulty++;
      for (var i = 0; i < 10 + (difficulty*2); i++) {
        var angle = random(360);
        px = width / 2 + 1000 * cos(radians(angle));
        py = random(height / 2 + 1000 * sin(radians(angle)));
        setTimeout(createNewAsteroid(ceil(random(3)), px, py, difficulty), 20000);
      }
      // let t = new Sprite();
      // t.addAni("", shieldAnimation);
      // t.bounciness = 0;
      // // o.removeColliders();
      // t.position.x = floor(random(1200));
      // t.position.y = random(floor(1200));
      // t.scale = 0.8;
      // t.layer = 4;
      // // o.collideWithOne(o, spaceShip, collectShield);
      // fueltanks.add(o);
      // spaceship.overlaps(fueltanks, collectShield);
    }
    background(background_imgs[1]);
    // background(0);
  }
}

function spaceshipHit(spaceship, sprite) {
  createExplodeParticles(spaceship.position.x, spaceship.position.y, 2);
  currentHealth--;
  if (currentHealth == 0) {
    // spaceship.changeAnimation(SPAC_ANI_2);
    destructor();
  }
}

function asteroidHit(asteroid, sprite) {

  if (sprite.removed) {
    return;
  }
  score += 10;
  hitTracker += 1;
  hitTracker %= 4;
  // console.log(hitTracker);
  if (hitTracker == 3) {
    createShield();
  }
  // create shield every four hit

  // get score from hitting the asteroids
  let o = new Sprite();
  o.removeColliders();
  o.addAni("upgradeIconAnimation", upgradeIconAnimation);
  let size = upgradeIcons.size();
  o.position.x = rank.position.x + 80 + 30 * (size % 6);
  o.position.y = rank.position.y + 30 * floor((size / 6));
  upgradeIcons.add(o);
  createExplodeParticles_blue(asteroid.position.x, asteroid.position.y, 4);
  if (asteroid.type == 3) {
    let destroy = new Sprite();
    destroy.x = asteroid.position.x;
    destroy.y = asteroid.position.y;
    destroy.addAni("destroy_black", asteroid_black_ani);
    for (let i = 0; i < 2; i++) {
      createNewAsteroid(2, asteroid.position.x, asteroid.position.y, 1);
    }
    // if (asteroid.health == 0) { asteroid.remove(); }
    // else {
    // asteroid.health--;
    // // asteroid.removeColliders();
    // sprite.remove();
    // }
    // destroy.removeColliders();
    destroy.life = 20;
  }
  if (asteroid.type == 2) {
    let destroy = new Sprite();
    destroy.x = asteroid.position.x;
    destroy.y = asteroid.position.y;
    destroy.addAni("destroy_gray", asteroid_gray_ani);
    for (let i = 0; i < 2; i++) {
      console.log(i);
      createNewAsteroid(1, asteroid.position.x, asteroid.position.y, 1);
    }
    // if (asteroid.health > 0) { 
    //   // asteroid.collectShield
    //   asteroid.immovable = true;
    //   asteroid.health--;
    //   asteroid.immovable = false;
    //   sprite.remove();
    // }
    // else {
    //   asteroid.immovable = false;
    //   asteroid.remove();
    // }
    // destroy.removeColliders();
    destroy.life = 20;
  }
  if (asteroid.type == 1) {
    let destroy = new Sprite();
    destroy.x = asteroid.position.x;
    destroy.y = asteroid.position.y;
    destroy.addAni("destroy_brown", asteroid_brown_ani);
    //   if (asteroid.health == 0) { asteroid.remove(); }
    //   else {
    //   asteroid.health--;
    //   // asteroid.removeColliders();
    //   sprite.remove();
    //   }
    //   // destroy.removeColliders();
    destroy.life = 20;
  }
  sprite.remove();
  asteroid.remove();
}

// place holder function
// comment out this code if you don't want to see the screen
function gameOver() {
  background('red');
  textSize(40);
  text("Game Over", 300, 300);
  exit();
}


/**
 * This function is called to ensure that everything is set to 
 * initialized value when restarted
 */
function destructor() {
  allSprites.remove();
  // gameOver();
  flag = false;
  counter = 0;
  buttonStart.remove();
  setup();
}

/**
 * The control part of the spaceship
 */
function spaceShipControl() {

  if (!spaceship.removed && kb.presses('x')) {
    let size = upgradeIcons.size();
    spaceship.changeAnimation(SPAC_ANI_3);
    if (size >= 6 && size < 12) {
      createBullet(20, 15, spaceship.rotation, "bullet2");
    } else if (size >= 12) {
      for (let i = 0; i < 5; i++) {
        createBullet(20, 20, spaceship.orientation + i * 90, "bullet2");
      }
    } else {
      createBullet(15, 15, spaceship.rotation, "bullet1");
    }

  } else {
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
    spaceship.rotaion = spaceship.direction;
  }

  if (kb.presses('right') || kb.presses('D') || kb.pressing('right') || kb.pressing('D')) {
    spaceship.rotation += 3;
    spaceship.direction += 3;
    spaceship.rotation = spaceship.direction;
  }

  if ((kb.pressing('up') || kb.pressing('W'))) {
    if (spaceship.speed < maxspeed) {
      spaceship.addSpeed(0.5, spaceship.rotation);
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

  if ((kb.presses('down') || kb.presses('S'))) {
    if (spaceship.speed > 0) {
      if (spaceship.speed - 0.2 > 0) {
        spaceship.speed -= 0.2;
      } else {
        spaceship.speed = 0;
      }
    } else {
      spaceship.speed = 0;
    }
  }
}

function createBullet(speed, life, direction, animation) {
  let bullet = new Sprite();
  bullet.life = life;
  bullet.setSpeed(speed + spaceship.speed, direction);
  bullet.addAni("bullet2", missleAnimation);
  bullet.addAni("bullet1", bulletAnimation);
  bullet.changeAnimation(animation);
  bullet.scale = 3;
  bullet.position.x = spaceship.position.x;
  bullet.position.y = spaceship.position.y;
  bullet.width = 10;
  bullet.height = 10;
  bullet.layer = 3;
  bullet.rotation = direction - 90;

  bullet.kinematic = true;
  bullets.add(bullet);
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
 * 
 * @param {} spaceship 
 * @param {*} shield 
 */
function collectShield(spaceship, shield) {
  // console.log("I am called");
  // console.log(currentHealth);
  shield.remove();
  if(currentHealth < MAXLIFE){
    currentHealth++;
  }
}
