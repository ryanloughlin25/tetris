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
    x: 3,
    y: -1,
  },
  {
    type: 'O',
    color: 'yellow',
    boundingSquare: [
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    x: 3,
    y: 0,
  },
  {
    type: 'T',
    color: 'purple',
    boundingSquare: [
      [false, true, false],
      [true, true, true],
      [false, false, false],
    ],
    x: 3,
    y: 0,
  },
  {
    type: 'S',
    color: 'green',
    boundingSquare: [
      [false, true, true],
      [true, true, false],
      [false, false, false],
    ],
    x: 3,
    y: 0,
  },
  {
    type: 'Z',
    color: 'red',
    boundingSquare: [
      [true, true, false],
      [false, true, true],
      [false, false, false],
    ],
    x: 3,
    y: 0,
  },
  {
    type: 'J',
    color: 'blue',
    boundingSquare: [
      [true, false, false],
      [true, true, true],
      [false, false, false],
    ],
    x: 3,
    y: 0,
  },
  {
    type: 'L',
    color: 'orange',
    boundingSquare: [
      [false, false, true],
      [true, true, true],
      [false, false, false],
    ],
    x: 3,
    y: 0,
  },
];

Tetromino = function() {
  var tetrominoType = tetrominoTypes[Math.floor(Math.random()*tetrominoTypes.length)];
  for (var property in tetrominoType) {
    this[property] = tetrominoType[property];
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

Tetromino.prototype.move = function(direction) {
  switch(direction) {
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
  }
};
