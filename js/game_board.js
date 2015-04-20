var Game = function() {
  this.model = new Game.Model();
  this.view = new Game.View();
  this.view.appendBoardHTML(this.model);
};

Game.prototype.render = function() {
  this.view.render(this.model);
};

Game.prototype.bindEvents = function() {
  var game = this;
  var pressKey = function(event) {
    game.model.move(event.which);
    game.render();
  };
  $(document).on('keydown', pressKey);
};

Game.Model = function() {
  this.height = 20;
  this.width = 10;
  this.board = new Array(this.height);
  for (var i = 0; i < this.height; i++) {
    this.board[i] = new Array(this.width);
  };
  this.activeTetromino = new Tetromino();
  this.directions = {
    //TODO: disable moving up when done testing
    87: 'up',
    65: 'left',
    83: 'down',
    68: 'right',
  };
};

Game.Model.prototype.move = function(keyCode) {
  this.activeTetromino.move(this.directions[keyCode]);
};

Game.View = function() {};

Game.View.prototype.appendBoardHTML = function(model) {
  for (var i = 0; i < model.height; i++) {
    var row = $('<tr></tr>');
    for (var j = 0; j < model.width; j++) {
      row.append($('<td></td>'));
    }
    $('.game_board').append(row);
  }
};

Game.View.prototype.colorSquare = function(x, y, color) {
  var row = $('tr:eq(' + y + ')');
  var col = row.children()[x];
  if (typeof color == 'string') {
    col.style.backgroundColor = color;
  } else {
    col.style.backgroundColor = '';
  }
};

Game.View.prototype.render = function(model) {
  for (var x = 0; x < model.width; x++) {
    for (var y = 0; y < model.height; y++) {
      this.colorSquare(x, y, model.board[x][y]);
    }
  }
  this.renderTetromino(model.activeTetromino);
};

Game.View.prototype.renderTetromino = function(tetromino) {
  var coords = tetromino.coords;
  for (var y = coords.yMin; y <= coords.yMax; y++) {
    for (var x = coords.xMin; x <= coords.xMax; x++) {
      if (tetromino.occupies(x, y)) {
        this.colorSquare(x, y, tetromino.color);
      }
    }
  }
};

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

var setup = function() {
  game = new Game();
  game.bindEvents();
  game.render();
};

$(document).ready(setup);
