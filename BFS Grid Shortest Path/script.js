let grid = [];
let queue = [];

let rows, columns;
let start, end;
const w = 40;

function setup() {
  createCanvas(400, 400);
  frameRate(15);
  rows = width / w;
  columns = height / w;

  for(let i = 0; i < rows; i++){
    for(let j = 0; j < columns; j++){
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  start = grid[22];
  end = grid[76];
  end.SetEnd(true);
  start.SetDiscovered(true);

  console.log(start);
  console.log(end);

  queue.push(start);
}

function draw() {
  background(220);

  if(queue.length == 0){
    noLoop();
  }
  
  let v = queue.shift();

  for(let i = 0; i < grid.length; i++){
    grid[i].Display();
  }

  if(v == end){
    console.log("found: ", end);

    end.traversed = true;
    let endParent = end.parent;

    while(endParent != null){
      if(endParent == start){
        break;
      }

      endParent.traversed = true;
      endParent = endParent.parent;
    }
    
    for(let i = 0; i < grid.length; i++){
      grid[i].Display();
    }

    noLoop();
  }

  let neighbors = v.CheckNeighbors();
  for(let i = 0; i < neighbors.length; i++){
    if(!neighbors[i].discovered){
      neighbors[i].discovered = true;
      neighbors[i].parent = v;
      queue.push(neighbors[i]);
    }
  }
}