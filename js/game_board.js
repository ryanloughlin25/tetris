var Game = function() {
  this.model = new Game.Model();
  this.view = new Game.View();
};

Game.prototype.render = function() {
  console.log(this);
  console.log(this.view);
  console.log(this.model);
  this.view.render(this.model);
};

Game.prototype.bindEvents = function() {
  //TODO: move pressKey function
  var pressKey = function(event) {
    event.preventDefault();
    switch(event.which) {
      case 37:
        break;
      case 38:
        break;
      case 39:
        break;
      case 40:
        break;

      default: return;
    }
  };
  $(document).on('keydown', pressKey);
};

Game.prototype.move = function() {
  return;
};

Game.Model = function() {
  this.height = 20;
  this.width = 10;
  this.board = new Array(this.height);
  for (var i = 0; i < this.height; i++) {
    this.board[i] = new Array(this.width);
  };
  this.active_tetromino = new Tetromino();
};

Game.View = function() {};

Game.View.prototype.render = function(model) {
  //TODO: refactor render function
  for(var i = 0; i < model.height; i++) {
    var row = $('<tr></tr>');
    for(var j = 0; j < model.width; j++) {
      var col = $('<td></td>');
      //color squares
      if (typeof model.board[i][j] != 'undefined') {
        col.css("backgroundColor", model.board[i][j]);
      }
      row.append(col);
    }
    $('.game_board').append(row);
  }

  var tetromino = model.active_tetromino;
  for(var i = tetromino.coords.x; i < tetromino.size; i++) {
    var row = $('tr:eq(' + i + ')');
    for(var j = tetromino.coords.y; j < tetromino.size; j++) {
      var col = row.children()[j];
      if (tetromino.occupies(i, j)) {
        col.style.backgroundColor = tetromino.color;
      }
    }
  }
};

Tetromino = function() {
  this.type = 'T';
  this.color = 'red';
  this.size = 3;
  this.coords = {
    x: 0,
    y: 0,
  }
  this.bounding_square = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.bounding_square[i] = new Array(this.size);
  }
  this.bounding_square[0][1] = true;
  this.bounding_square[1][0] = true;
  this.bounding_square[1][1] = true;
  this.bounding_square[1][2] = true;
  this.occupies = function(i, j) {
    return this.bounding_square[i][j];
  };
};

var setup = function() {
  game = new Game();
  game.bindEvents();
  game.render();
};

$(document).ready(setup);
