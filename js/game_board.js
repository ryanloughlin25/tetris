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
    console.log("bind key press");
  //TODO: move pressKey function
  var game = this;
  var tetromino = game.model.active_tetromino;
  var pressKey = function(event) {
    switch(event.which) {
      //TODO: disable moving up when done testing
      case 87:
        tetromino.move('up');
        break;
      case 65:
        tetromino.move('left');
        break;
      case 83:
        tetromino.move('down');
        break;
      case 68:
        tetromino.move('right');
        break;
      default:
        return;
    }
    game.render();
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

Game.View.prototype.clear_board = function() {
  $('.game_board').empty();
};

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
};

Game.View.prototype.render_tetromino = function(tetromino) {
  var x = tetromino.coords.x;
  var y = tetromino.coords.y;
  for(var i = 0; i < tetromino.size; i++) {
    var row = $('tr:eq(' + (i + y) + ')');
    for(var j = 0; j < tetromino.size; j++) {
      var col = row.children()[j + x];
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
    x: 1,
    y: 1,
  }
  this.bounding_square = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.bounding_square[i] = new Array(this.size);
  }
  this.bounding_square[0][1] = true;
  this.bounding_square[1][0] = true;
  this.bounding_square[1][1] = true;
  this.bounding_square[1][2] = true;
};

Tetromino.prototype.occupies = function(i, j) {
  return this.bounding_square[i][j];
};

Tetromino.prototype.move = function(direction) {
  //TODO: need to prevent the tetromino from leaving the board
  //instead, currently prevents the bounding square from leaving the board
  switch(direction) {
    case 'left':
      if(this.coords.x > 0) {
        this.coords.x -= 1;
      }
      break;
    case 'right':
      if(this.coords.x < 10 - this.size) {
        this.coords.x += 1;
      }
      break;
    case 'up':
      if(this.coords.y > 0) {
        this.coords.y -= 1;
      }
      break;
    case 'down':
      if(this.coords.y < 20 - this.size) {
        this.coords.y += 1;
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
