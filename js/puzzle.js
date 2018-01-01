function Puzzle(canvas) {
    this.canvas = canvas;
    this.game_area = canvas.getContext("2d");
    this.game_area.font = "30px Arial";
    this.size = 3; // default: 3*3 puzzle
    this.block_size = canvas.width / this.size;

    this.drawTile = function(i, j) {
        var w = j * this.block_size;
        var h = i * this.block_size;
        var num = this.grid[i][j];

        this.game_area.clearRect(w, h, this.block_size, this.block_size);

        if (i != this.emptyRow || j != this.emptyCol) {
            this.game_area.fillText(""+num, w+this.block_size/2,
                h+this.block_size/2);
        }
    }

    this.slideTile = function(i, j) {
        this.grid[this.emptyRow][this.emptyCol] = this.grid[i][j];
        this.grid[i][j] = this.size * this.size; // empty block
        var tmp = i; i = this.emptyRow; this.emptyRow = tmp;
        tmp = j; j = this.emptyCol; this.emptyCol = tmp;
        this.drawTile(i, j);
        this.drawTile(this.emptyRow, this.emptyCol);
        if (this.is_solved()) {
            this.emptyRow = -1;
            this.emptyCol = -1;
            this.drawTile(this.size-1, this.size-1);
        }
    }

    this.init = function() {
        // Random shuffle 2D array `grid`
        this.grid = initPuzzle(this.size, this.size);
        // Locate empty tile
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == this.size * this.size) {
                    this.emptyRow = i;
                    this.emptyCol = j;
                }
            }
        }
        for (var i = 0; i < this.grid.length; i++) {
            for (var j = 0; j < this.grid[i].length; j++) {
                this.drawTile(i, j);
            }
        }
    }

    this.is_solved = function() {
        for (var r = 0; r < this.grid.length; r++) {
            for (var c = 0; c < this.grid[r].length; c++) {
                // TODO: is it the right way to compare two floating numbers?
                if (!(r == Math.floor((this.grid[r][c]-1)/this.size) &&
                      c == Math.floor((this.grid[r][c]-1)%this.size))) {
                    return false;
                }
            }
        }
        return true;
    }
}