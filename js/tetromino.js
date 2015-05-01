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
  this.type = 'T';
  this.color = 'red';
  this.size = 3;
  this.boundingSquare = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.boundingSquare[i] = new Array(this.size);
  }
  this.boundingSquare[0][1] = true;
  this.boundingSquare[1][0] = true;
  this.boundingSquare[1][1] = true;
  this.boundingSquare[1][2] = true;
  this.coords = {
    xMin: 0,
    xMax: 2,
    yMin: 0,
    yMax: 1,
  }
};

Tetromino.prototype.occupies = function(x, y) {
  return this.boundingSquare[y - this.coords.yMin][x - this.coords.xMin];
};

Tetromino.prototype.move = function(direction) {
  switch(direction) {
    case 'left':
      if (this.coords.xMin > 0) {
        this.coords.xMin -= 1;
        this.coords.xMax -= 1;
      }
      break;
    case 'right':
      if (this.coords.xMax < 9) {
        this.coords.xMin += 1;
        this.coords.xMax += 1;
      }
      break;
    case 'up':
      if (this.coords.yMin > 0) {
        this.coords.yMin -= 1;
        this.coords.yMax -= 1;
      }
      break;
    case 'down':
      if (this.coords.yMax < 19) {
        this.coords.yMin += 1;
        this.coords.yMax += 1;
      }
      break;
  }
};
