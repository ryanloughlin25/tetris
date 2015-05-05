var tetrominoTypes = [
  {
    type: 'I',
    color: 'cyan',
    boundingSquare: [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ],
  },
  {
    type: 'O',
    color: 'yellow',
    boundingSquare: [
      [false, false, false, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
  },
  {
    type: 'T',
    color: 'purple',
    boundingSquare: [
      [false, true, false],
      [true, true, true],
      [false, false, false],
    ],
  },
  {
    type: 'S',
    color: 'green',
    boundingSquare: [
      [false, true, true],
      [true, true, false],
      [false, false, false],
    ],
  },
  {
    type: 'Z',
    color: 'red',
    boundingSquare: [
      [true, true, false],
      [false, true, true],
      [false, false, false],
    ],
  },
  {
    type: 'J',
    color: 'blue',
    boundingSquare: [
      [true, false, false],
      [true, true, true],
      [false, false, false],
    ],
  },
  {
    type: 'L',
    color: 'orange',
    boundingSquare: [
      [false, false, true],
      [true, true, true],
      [false, false, false],
    ],
  },
];

Tetromino = function() {
  var tetrominoType = tetrominoTypes[Math.floor(Math.random()*tetrominoTypes.length)];
  for (var property in tetrominoType) {
    this[property] = tetrominoType[property];
  }
  this.x = 3;
  if (this.boundingSquare.length === 3) {
    this.y = 0;
    this.size = 3;
  } else {
    this.y = -1;
    this.size = 4;
  }
};

Tetromino.prototype.coordsToColor = function() {
  coordsList = [];
  for (var y = 0; y < this.boundingSquare.length; y++) {
    for (var x = 0; x < this.boundingSquare[y].length; x++) {
      if (this.boundingSquare[y][x]) {
        coordsList.push({
          y: y + this.y,
          x: x + this.x,
        });
      }
    }
  }
  return coordsList;
};

//TODO: refactor move, boundMovement, and coordsToColor
//Theres at least one abstraction in here somewhere, but I have to go soon and this at least works
Tetromino.prototype.move = function(movement) {
  switch(movement) {
    case 'left':
      this.x -= 1;
      break;
    case 'right':
      this.x += 1;
      break;
    case 'up':
      this.y -= 1;
      break;
    case 'down':
      this.y += 1;
      break;
    case 'rotate':
      this.rotate();
      break;
  }
  this.boundMovement();
};

Tetromino.prototype.boundMovement = function() {
  var xMax = 10;
  var yMax = 20;
  for (var y = 0; y < this.boundingSquare.length; y++) {
    for (var x = 0; x < this.boundingSquare[y].length; x++) {
      if (this.boundingSquare[y][x]) {
        if (y + this.y < 0) {
          this.y += 1;
        }
        if (y + this.y >= yMax) {
          this.y -= 1;
        }
        if (x + this.x < 0) {
          this.x += 1;
        }
        if (x + this.x >= xMax) {
          this.x -= 1;
        }
      }
    }
  }
};

Tetromino.prototype.rotate = function() {
  transpose(this.boundingSquare);
  for (var i = 0; i < this.boundingSquare.length; i++) {
    this.boundingSquare[i].reverse();
  }
};
