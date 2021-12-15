var myGamePiece, powerup;
var score = 0;

function startGame() {
  myGameArea.start();
  myGamePiece = new createComponent(30, 30, "black", 10, 120);
  powerup = new createComponent(20, 20, "gold", 300, 120)
}

  function createComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.movePos = function() {
      var newX = Math.floor(Math.random() * myGameArea.canvas.width + 1)
      var newY = Math.floor(Math.random() * myGameArea.canvas.height + 1)

      this.x = newX;
      this.y = newY;
    }
    this.crashWith = function(otherobj) {

      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
        crash = false;
      }
      return crash;
      
    }

  }

  var myGameArea = {
      canvas : document.createElement("canvas"),
      start : function() {
          this.canvas.width = 400;
          this.canvas.height = 400;
          this.context = this.canvas.getContext("2d");
          document.body.insertBefore(this.canvas, document.body.childNodes[0]);
          this.interval = setInterval(updateGameArea, 20);
          window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
            window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
          })
      },
      clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
  }

  function updateGameArea(){
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    var speedVar = 5;

    
    if (myGameArea.keys && myGameArea.keys[65]) {myGamePiece.speedX = -1 * speedVar; }
    if (myGameArea.keys && myGameArea.keys[68]) {myGamePiece.speedX = 1 * speedVar; }
    if (myGameArea.keys && myGameArea.keys[87]) {myGamePiece.speedY = -1 * speedVar; }
    if (myGameArea.keys && myGameArea.keys[83]) {myGamePiece.speedY = 1 * speedVar; }

    if (myGamePiece.crashWith(powerup)) {
      score += 1;
      document.getElementById("scoreKeeper").innerHTML = "Score: " + score;
      powerup.movePos();
    } else {
      myGamePiece.newPos();
      myGamePiece.update();
      powerup.update();
    }
  }

  function stopMove(){
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
  }
  
  function moveup(){
    myGamePiece.speedY -= 1;
  }

  function movedown() {
    myGamePiece.speedY += 1;
  }

  function moveleft() {
    myGamePiece.speedX -= 1;
  }

  function moveright() {
    myGamePiece.speedX += 1;
  }
