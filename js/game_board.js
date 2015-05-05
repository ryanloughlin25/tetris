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
  this.movements = {
    //TODO: disable moving up when done testing
    65: 'left',
    68: 'right',
    87: 'up',
    83: 'down',
    69: 'rotate',
  };
};

Game.Model.prototype.move = function(keyCode) {
  this.activeTetromino.move(this.movements[keyCode]);
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
  var coords = tetromino.coordsToColor();
  for (var i = 0; i < coords.length; i++) {
    this.colorSquare(coords[i].x, coords[i].y, tetromino.color);
  }
};

var setup = function() {
  game = new Game();
  game.bindEvents();
  game.render();
};

$(document).ready(setup);
