var Game = function() {
  this.model = new Game.Model();
  this.view = new Game.View();
};

Game.prototype.render = function() {
  this.view.clear_board();
  this.view.render(this.model);
  this.view.render_tetromino(this.model.active_tetromino);
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
  this.active_tetromino = new Tetromino();
  this.directions = {
    //TODO: disable moving up when done testing
    87: 'up',
    65: 'left',
    83: 'down',
    68: 'right',
  };
};

Game.Model.prototype.move = function(key_code) {
  this.active_tetromino.move(this.directions[key_code]);
};

Game.View = function() {};

Game.View.prototype.clear_board = function() {
  $('.game_board').empty();
};

Game.View.prototype.render = function(model) {
  //TODO: refactor render function
  for (var i = 0; i < model.height; i++) {
    var row = $('<tr></tr>');
    for (var j = 0; j < model.width; j++) {
      var col = $('<td></td>');
      //color squares
      if (typeof model.board[i][j] != 'undefined') {
        col.css("backgroundColor", model.board[i][j]);
      }
      row.append(col);
    }
    $('.game_board').append(row);
  }
};

Game.View.prototype.render_tetromino = function(tetromino) {
  var x_min = tetromino.coords.x_min;
  var x_max = tetromino.coords.x_max;
  var y_min = tetromino.coords.y_min;
  var y_max = tetromino.coords.y_max;
  for (var i = y_min; i <= y_max; i++) {
    var row = $('tr:eq(' + i + ')');
    for (var j = x_min; j <= x_max; j++) {
      var col = row.children()[j];
      if (tetromino.occupies(i - y_min, j - x_min)) {
        col.style.backgroundColor = tetromino.color;
      }
    }
  }
};

Tetromino = function() {
  this.type = 'T';
  this.color = 'red';
  this.size = 3;
  this.bounding_square = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.bounding_square[i] = new Array(this.size);
  }
  this.bounding_square[0][1] = true;
  this.bounding_square[1][0] = true;
  this.bounding_square[1][1] = true;
  this.bounding_square[1][2] = true;
  this.coords = {
    x_min: 0,
    x_max: 2,
    y_min: 0,
    y_max: 1,
  }
};

Tetromino.prototype.occupies = function(i, j) {
  return this.bounding_square[i][j];
};

Tetromino.prototype.move = function(direction) {
  switch(direction) {
    case 'left':
      if (this.coords.x_min > 0) {
        this.coords.x_min -= 1;
        this.coords.x_max -= 1;
      }
      break;
    case 'right':
      if (this.coords.x_max < 9) {
        this.coords.x_min += 1;
        this.coords.x_max += 1;
      }
      break;
    case 'up':
      if (this.coords.y_min > 0) {
        this.coords.y_min -= 1;
        this.coords.y_max -= 1;
      }
      break;
    case 'down':
      if (this.coords.y_max < 19) {
        this.coords.y_min += 1;
        this.coords.y_max += 1;
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
