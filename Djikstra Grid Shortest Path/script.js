let rows = 10;
let cols = 10;

let grid = new Array(cols);
let w;

let queue = [];
let visited = new Array(cols);
let dist = new Array(cols);
let start, end;

let v = [];
let path = [];
let current;

function PriorityQueue(a, b){
  return a.dist - b.dist;
}

function setup(){
  createCanvas(400, 400);
  frameRate(15);
  w = width / rows;

  for(let i = 0; i < cols; i++){ grid[i] = new Array(rows); }
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j] = new Cell(i, j);
    }
  }

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j].addNeighbor(grid);
    }
  }
  
  for(let i = 0; i < cols; i++){ visited[i] = new Array(rows); }
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      visited[i][j] = false; 
    }
  }

  for(let i = 0; i < cols; i++){ dist[i] = new Array(rows); }
  for(let i = 0; i < cols; i++){ 
    for(let j = 0; j < rows; j++){
      dist[i][j] = Number.POSITIVE_INFINITY; 
    }
  }

  start = grid[0][0];
  start.walls = false;
  start.weight = 0;
  dist[0][0] = 0;
  end = grid[cols - 1][rows - 1];
  end.walls = false;
  end.weight = 0;

  queue.push({index: [start.i, start.j] , dist : 0});

  console.log(dist);
}

function draw(){
  background(220);
  
  if(queue.length != 0){
    // solve it
    let top = queue.shift();
    let index = top.index;
    let minValue = top.dist;
    let i = index[0];
    let j = index[1];

    visited[i][j] = true;
    current = grid[i][j];
    v.push(grid[i][j]);

    console.log(visited[i][j]);
    if(dist[i][j] < minValue) { redraw(); }
    grid[i][j].neighbors.forEach(edge => {
      let edgeTo = [edge.i, edge.j];
      let edgeI = edgeTo[0];
      let edgeJ = edgeTo[1];
      if(grid[edgeI][edgeJ].walls == false){
        if(visited[edgeI][edgeJ]) { redraw(); }
        let newDist = dist[i][j] + edge.weight;

        if(newDist < dist[edgeI][edgeJ]){
          grid[edgeI][edgeJ].prev = current;
          dist[edgeI][edgeJ] = newDist;
          queue.push({ index: [ edgeI, edgeJ ], dist: newDist })
        }
        queue.sort(PriorityQueue);
      }
    })

    if(grid[i][j] == end){
      queue.splice(0, queue.length);
      console.log("found ", grid[i][j]);
      noLoop();
    }
  } else {
    console.log("no solution");
    noLoop();
  }

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      grid[i][j].show(255);
    }
  }

  for(let i = 0; i < v.length; i++){
    v[i].show(color(0, 0, 255, 50));
  }

  let path = [];
  let temp = current;
  path.push(current);
  while(temp.prev){
    path.push(temp.prev);
    temp = temp.prev;
  }

  for(let i = 0; i < path.length; i++){
    path[i].show(color(255, 0, 0, 50));
  }

  current.show(color(0, 255, 0, 50))
}