// player object
let spaceship; // the spaceship object that players could control

// interactivity
let asteroids; // asteroids in the world
let bullets; // the group of bullets

// some constants
let MARGIN = 40;
let MAXSPEED = 8;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // set up the spaceship
  spaceship = new Sprite(); // create the main character
  spaceship.rotation = -90; // adjust the rotation direction

  // set up the bullets 
  bullets = new Group(); // create a group of bullet
}

function draw() {

  spaceShipControl();    // take charge of the control block of the spaceship
  spaceshipResetPosit(); // reset the position of the spaceship if out of the boundary
  // bullet shooting logic         
  if (kb.presses('J')) {
    // create sprites
    new bullets.Sprite(spaceship.position.x, spaceship.position.y, 5);
    bullets.setSpeed(16, spaceship.rotation);
  }



  // player.overlap(coins, collect);
  // drawSprites();
  background(0);        //background to be set dark
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
