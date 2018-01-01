function initPuzzle(rows, cols) {
    var grid = new Array(rows);
    for (var i = 0; i < grid.length; i++) {
        grid[i] = new Array(cols);
        for (var j = 0; j < cols; j++)
            grid[i][j] = i*rows + j + 1;
    }

    var i = rows * cols - 1;
    while (i > 0) {
        var j = Math.floor(Math.random() * i);
        var xi = i % rows;
        var yi = Math.floor(i / rows);
        var xj = j % cols;
        var yj = Math.floor(j / cols);

        var tmp = grid[xi][yi];
        grid[xi][yi] = grid[xj][yj];
        grid[xj][yj] = tmp;
        i--;
    }
    var tilesNum = rows*cols;
    if (!is_solvable(grid)) {
        // if the empty tile is the first two elements, swap the last two
        // tiles to make it solvable.
        if (grid[0][0] == tilesNum || grid[0][1] == tilesNum) {
            var tmp = grid[rows-1][cols-1];
            grid[rows-1][cols-1] = grid[rows-1][cols-2];
            grid[rows-1][cols-2] = tmp;
        }
        // Otherwise, swap the first two tiles.
        else {
            var tmp = grid[0][0];
            grid[0][0] = grid[0][1];
            grid[0][1] = tmp;
        }
    }
    console.log(countInversions(grid));
    return grid;
}

function countInversions(grid) {
    var inversions = 0;
    var rows = grid.length;
    var cols = grid[0].length;
    var tilesNum = rows*cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if (grid[i][j] == tilesNum)
                continue;
            // Calculate the inversion of entry (i,j)
            for (var ind = i*cols+j+1; ind < tilesNum; ind++) {
                var k = Math.floor(ind/cols);
                var l = Math.floor(ind%cols);
                if (grid[k][l] != tilesNum && grid[i][j] > grid[k][l])
                    inversions++;
            }
        }
    }
    return inversions;
}

/**
 * Test whether the initialized puzzle is solvable.
 * @return {Boolean} true if solvable, false otherwise.
 */
function is_solvable(grid) {
    var rows = grid.length;
    var cols = grid[0].length;
    var emptyRow;
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++)
            if (grid[i][j] == rows*cols)
                emptyRow = i;
    if (rows % 2 == 1)
        return (countInversions(grid) % 2 == 0);
    else
        return ((countInversions(grid)+cols-emptyRow) % 2 == 0);
}