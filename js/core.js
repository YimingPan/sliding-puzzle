var canvas = document.getElementById("game");
var game_area = canvas.getContext("2d");
game_area.font = "30px Arial";

var width = canvas.width;
var size = 3; // 3*3 sliding puzzle
var block_size = width / size;

function init() {
    grid = new Array(size);
    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(size);
    }
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            grid[i][j] = {x: i, y: j};
            if (i == size-1 && j == size-1) {
                emptyBlock = {x: i, y: j};
            }
        }
    }
    // Random shuffle 2D array `grid`
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            drawTile(i, j);
        }
    }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function drawTile(i, j) {
    var x = i * block_size;
    var y = j * block_size;
    var num = grid[i][j].y*size + grid[i][j].x + 1;

    game_area.clearRect(x, y, block_size, block_size);

    if (i != emptyBlock.x || j != emptyBlock.y) {
        game_area.fillText(""+num, x+block_size/2, y+block_size/2);
        // console.log(num);
    }
}

function manhattanDistance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function slideTile(i, j, emptyX, emptyY) {
    grid[emptyBlock.x][emptyBlock.y].x = grid[i][j].x;
    grid[emptyBlock.x][emptyBlock.y].y = grid[i][j].y;
    grid[i][j].x = grid[emptyBlock.x][emptyBlock.y].x;
    grid[i][j].y = grid[emptyBlock.x][emptyBlock.y].y;
    emptyBlock.x = i;
    emptyBlock.y = j;
    drawTile(i, j);
    drawTile(emptyX, emptyY);
}

canvas.addEventListener("load", init());
canvas.addEventListener("click", function(evt) {
    mousePos = getMousePos(evt);
    var xid = Math.floor(mousePos.x / block_size);
    var yid = Math.floor(mousePos.y / block_size);
    // console.log(xid + ", " + yid);
    // console.log("empty: (" + emptyBlock.x + "," + emptyBlock.y + ")");

    if (manhattanDistance({x: xid, y: yid}, emptyBlock) == 1)
        slideTile(xid, yid, emptyBlock.x, emptyBlock.y);
});