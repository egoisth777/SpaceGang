// player object
let spaceship; // the spaceship object that players could control
let asteroids; // asteroids in the world
let bullets; // the group of bullets
let healthbars; // the group of health bar objects
let rank;
let r;
let px;
let py;
let counter = 0;

// images
let rankImage;

// numbered constants
let currentHealth = 5; // current health of the spaceship
let ranks = 1;
let num_asteroids;



// some constants
let MARGIN = 40;
let MAXSPEED = 8;
let MAXLIFE = 10;
let RANK1 = "rank1";
let RANK2 = "rank2";
let RANK3 = "rank3";


/**
 * Loading assets preemptively to avoid further discomfort
 */
preload = function () {
  rankImage = new Array();
  rankImage.length = 3;
  rankImage[0] = loadImage("./assets/ranks/rank1.png");
  rankImage[1] = loadImage("./assets/ranks/rank2.png");
  rankImage[2] = loadImage("./assets/ranks/rank3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  spaceship.rotation = -90; // adjust the rotation direction
  spaceship.color = "pink";

  asteroids = new Group(); // create new asteroids
  asteroids.color = 'brown';

  // set up the bullets 
  bullets = new Group(); // create a group of bullet

  // set up the rank
  rank = new Sprite();
  rank.removeColliders();
  rank.addImage(RANK1, rankImage[0]);
  rank.layer = 1;
  rank.position.y = windowHeight - MARGIN - 64;
  rank.position.x = windowWidth / 2;

  // px = width;
  // py = height;

  for (var i = 0; i < 10; i++) {
    var angle = random(360);
    px = width + 1000* cos(radians(angle));
    py = sin(radians(angle));
    // createAsteroid(3, x, y);
    createNewAsteroid(ceil(random(4), px, py))
  }
}

function createNewAsteroid(type, x, y) {
  var a = createSprite(px, py, type * 20)
  a.speed = 6 - (type);
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

  spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary
  spaceShipControl();    // take charge of the control block of the spaceship
  spaceshipHealth();     // draw the current health of the spaceship according to some condition
  drawranks();
  // bullet shooting logic         
  if (!spaceship.removed && kb.presses('J')) {
    // create sprites
    let bullet = createSprite(spaceship.position.x, spaceship.position.y);
    bullet.removeColliders();
    bullet.setSpeed(10 + spaceship.speed, spaceship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
  }

  for (var i = 0; i < asteroids.length; i++) {
    var sprite = asteroids[i];
    if (sprite.position.x < -MARGIN) {
      sprite.position.x = width + MARGIN;
    }
    if (sprite.position.x > width + MARGIN) {
      sprite.position.x = -MARGIN;
    }
    if (sprite.position.y < -MARGIN) {
      sprite.position.y = height + MARGIN;
    }
    if (sprite.position.y > height + MARGIN) {
      sprite.position.y = -MARGIN;
    }
  }

  asteroids.overlap(spaceship, asteroidHit);
  asteroids.overlap(bullets, asteroidHit);

  // player.overlap(coins, collect);
  // drawSprites();
  background(0);        //background to be set dark
  // clear();
}

function asteroidHit(asteroid, sprite) {
  sprite.remove();
  asteroid.remove();
}



function spaceShipControl() {
  // control the player movement
  if (kb.presses('left') || kb.presses('A') || kb.pressing('left') || kb.pressing('A')) {
    // (direction, speed, distance)
    spaceship.rotation -= 1.5;
    spaceship.direction -= 1.5;
  }

  if (kb.presses('right') || kb.presses('D') || kb.pressing('right') || kb.pressing('D')) {
    // (direction, speed, distance)
    spaceship.rotation += 1.5;
    spaceship.direction += 1.5;
  }

  if ((kb.pressing('up') || kb.pressing('W'))) {
    if (spaceship.speed < MAXSPEED) {
      spaceship.addSpeed(0.1, spaceship.rotation);
    } else {
      spaceship.speed == MAXSPEED;
    }
  } else {
    spaceship.speed = (spaceship.speed > 0) ? spaceship.speed - 0.1 : 0;
  }
}

function spaceshipResetPosit() {
  for (let i = 0; i < allSprites.length; i++) {
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
 * Function takes in charge of drawing of the health bar
 */
function spaceshipHealth() {

}

function drawranks() {

}