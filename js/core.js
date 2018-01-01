function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}


var canvas = document.getElementById("game");
var puzzle = new Puzzle(canvas);
var restart_btn = document.getElementById("restart-btn");
var ng_btn = document.getElementById("ng-btn");

canvas.addEventListener("load", puzzle.init());
canvas.addEventListener("click", function(evt) {
    mousePos = getMousePos(evt);
    var row = Math.floor(mousePos.y / puzzle.block_size);
    var col = Math.floor(mousePos.x / puzzle.block_size);

    if (manhattanDistance(row, col, puzzle.emptyRow, puzzle.emptyCol) == 1)
        puzzle.slideTile(row, col);
});
restart_btn.addEventListener("click", function(evt) {
    puzzle.restart();
});
ng_btn.addEventListener("click", function(evt) {
    puzzle.init();
});
