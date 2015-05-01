var tetrominoDescriptions = [
  {
    type: 'I',
    color: 'cyan',
    boundingSquare: [
      [false, false, false, false],
      [true, true, true, true],
      [false, false, false, false],
      [false, false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 6,
      yMin: 0,
      yMax: 0,
    },
  },
  {
    type: 'O',
    color: 'yellow',
    boundingSquare: [
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false],
    ],
    coords: {
      xMin: 4,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
  {
    type: 'T',
    color: 'purple',
    boundingSquare: [
      [false, true, false],
      [true, true, true],
      [false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
  {
    type: 'S',
    color: 'green',
    boundingSquare: [
      [false, true, true],
      [true, true, false],
      [false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
  {
    type: 'Z',
    color: 'red',
    boundingSquare: [
      [true, true, false],
      [false, true, true],
      [false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
  {
    type: 'J',
    color: 'blue',
    boundingSquare: [
      [true, false, false],
      [true, true, true],
      [false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
  {
    type: 'L',
    color: 'orange',
    boundingSquare: [
      [false, false, true],
      [true, true, true],
      [false, false, false],
    ],
    coords: {
      xMin: 3,
      xMax: 5,
      yMin: 0,
      yMax: 1,
    },
  },
];

Tetromino = function() {
  //var tetrominoDescription = tetrominoDescriptions[Math.floor(Math.random()*tetrominoDescriptions.length)];
  var tetrominoDescription = tetrominoDescriptions[1];
  this.type = tetrominoDescription.type;
  this.color = tetrominoDescription.color;
  this.boundingSquare = tetrominoDescription.boundingSquare;
  this.coords = tetrominoDescription.coords;
};

Tetromino.prototype.coordsToColor = function() {
  coordsList = []
  for (var y = 0; y < this.boundingSquare.length; y++) {
    var row = this.boundingSquare[y];
    for (var x = 0; x < row.length; x++) {
      if (this.boundingSquare[y][x]) {
        coordsList.push({
          y: y + this.coords.yMin,
          x: x + this.coords.xMin,
        });
      }
    }
  }
  return coordsList;
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
