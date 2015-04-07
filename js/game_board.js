var GameBoard = function() {
  this.model = new Model();
  this.view = new View();
};

var GameBoard.Model = function() {
  this.height = 20;
  this.width = 10;
  this.board = 
};

var buildBoard = function() {
  for(var i = 0; i < height; i++) {
    var row = $('<div class="row"></div>');
    for(var j = 0; j < width; j++) {
      var column = $('<div class="col"></div>');
      row.append(column);
    }
    $('.game_board').append(row);
  }
};

var setup = function() {
  buildBoard();
};

$(document).ready(setup);
