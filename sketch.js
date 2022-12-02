// player object
let spaceship; // the spaceship object that players could control

// interactivity
let asteroids; // asteroids in the world
let bullets; // the group of bullets

// some constants
let MARGIN = 42;


function setup() {
  createCanvas(windowWidth, windowHeight);
  setUpSpaceShip();
}

function draw() {
  spaceShipControl();
  // spaceShipBoundaryCond();



  // player.overlap(coins, collect);
  // drawSprites();
  background(0);
}


function spaceShipControl(){
    // control the player movement
    if (kb.presses('left') || kb.presses('A')) {
      // (direction, speed, distance)
      spaceship.rotation  -= 16;
    }
    
    if (kb.presses('right') || kb.presses('D')) {
      // (direction, speed, distance)
      spaceship.rotation += 16;
    } 
    
    if(kb.pressing('up') || kb.pressing('W')){
      spaceship.addSpeed(0.5, spaceship.rotation);
    }else{
      spaceship.speed = 0;
    }
}

function setUpSpaceShip(){
  spaceship = new Sprite(); // create the main character
  spaceship.rotation = -90; // adjust the rotation direction
}