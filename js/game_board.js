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

Game.Model = function() {
  this.height = 20;
  this.width = 10;
  this.board = new Array(this.height);
  for (var i = 0; i < this.height; i++) {
    this.board[i] = new Array(this.width);
  };
};

Game.View = function() {};

Game.View.prototype.render = function(model) {
  for(var i = 0; i < model.height; i++) {
    var row = $('<div class="row"></div>');
    for(var j = 0; j < model.width; j++) {
      var column = $('<div class="col"></div>');
      //color squares
      if (typeof model.board[i][j] != 'undefined') {
        column.css("backgroundColor", model.board[i][j]);
      }
      row.append(column);
    }
    $('.game_board').append(row);
  }
};

var setup = function() {
  game = new Game();
  game.render();
};

$(document).ready(setup);
