let coins;


function setup() {
  createCanvas(400, 400);
  player = new Sprite(); 
  coins = new Group();
  new coins.Sprite(100, 100, 10);
  new coins.Sprite(150, 150, 20);
}

function draw() {
  // player.overlap(coins, collect);
  background(220);
}
