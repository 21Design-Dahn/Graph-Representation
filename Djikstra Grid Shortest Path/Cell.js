class Cell{
  constructor(i, j){
    this.i = i;
    this.j = j;

    this.neighbors = [];
    this.prev = undefined;
    this.weight = Math.ceil(random(0, 5));

    this.walls;
    if(random(1) < 0.25){
      this.walls = true;
      this.weight = Number.POSITIVE_INFINITY;
    } else {
      this. walls = false;
    }
  }

  show(col){
    fill(col);
    if(this.walls){
      fill(0);
    }
    rect(this.i * w, this.j * w, w);
    
    textSize(14);
    fill(0);
    text(this.weight, this.i * w + 20, this.j * w + 20);
  }

  addNeighbor(grid){
    var i = this.i;
    var j = this.j;

    if(i < cols - 1){
      this.neighbors.push(grid[i + 1][j]);
    }
    if(i > 0){
      this.neighbors.push(grid[i - 1][j]);
    }
    if(j < rows - 1){
      this.neighbors.push(grid[i][j + 1]);
    }
    if(j > 0){
      this.neighbors.push(grid[i][j - 1]);
    }
  }
};