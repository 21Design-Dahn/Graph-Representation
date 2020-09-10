class Cell{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.w = 40;
    this.parent = null;
    this.traversed = false;
    this.discovered = false;
    this.end = false;
  }
  
  SetDiscovered(cond) { this.discovered = cond; }
  SetEnd(cond) { this.end = cond; }

  Display(){
    stroke(244);
    square(this.x * this.w, this.y * this.w, this.w);
    if(this.current){
      fill(94, 208, 86)
    }

    if(this.discovered){
      fill(86, 208, 200);
    } else if(this.end){
      fill(98, 204, 86);
    } else {
      fill(208, 86, 94);
    }

    if(this.traversed){
      fill(244);
    }
  }

  index(i, j){
    if(i < 0 || i >= rows || j < 0 || j >= columns){
      return -1;
    }

    return i + j * columns;
  }

  CheckNeighbors(){
    let neighbors = [];

    let top = grid[this.index(this.x, this.y - 1)];
    let right = grid[this.index(this.x + 1, this.y)];
    let bottom = grid[this.index(this.x, this.y + 1)];
    let left = grid[this.index(this.x - 1, this.y)];

    if(top && !top.discovered){
      neighbors.push(top)
    }
    if(right && !right.discovered){
      neighbors.push(right);
    }
    if(bottom && !bottom.discovered){
      neighbors.push(bottom);
    }
    if(left && !left.discovered){
      neighbors.push(left);
    }

    return neighbors;
  }
}