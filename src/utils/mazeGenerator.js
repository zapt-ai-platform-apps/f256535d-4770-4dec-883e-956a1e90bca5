/**
 * Generates a random maze using the Depth-First Search algorithm
 * @param {number} width - Width of the maze
 * @param {number} height - Height of the maze
 * @returns {Array} 2D array representing the maze
 */
export function generateMaze(width, height) {
  // Create a 2D array filled with cells having all walls intact
  const maze = Array(height).fill().map(() => 
    Array(width).fill().map(() => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
      visited: false
    }))
  );
  
  // Stack for backtracking
  const stack = [];
  
  // Start at cell (0, 0)
  let currentY = 0;
  let currentX = 0;
  maze[currentY][currentX].visited = true;
  stack.push({ x: currentX, y: currentY });
  
  // DFS to carve paths
  while (stack.length > 0) {
    const neighbors = getUnvisitedNeighbors(maze, currentX, currentY, width, height);
    
    if (neighbors.length === 0) {
      // Backtrack
      const cell = stack.pop();
      if (!cell) break;
      currentX = cell.x;
      currentY = cell.y;
      continue;
    }
    
    // Choose a random neighbor
    const randomIndex = Math.floor(Math.random() * neighbors.length);
    const { x, y, direction } = neighbors[randomIndex];
    
    // Remove walls between current cell and chosen neighbor
    if (direction === 'top') {
      maze[currentY][currentX].top = false;
      maze[y][x].bottom = false;
    } else if (direction === 'right') {
      maze[currentY][currentX].right = false;
      maze[y][x].left = false;
    } else if (direction === 'bottom') {
      maze[currentY][currentX].bottom = false;
      maze[y][x].top = false;
    } else if (direction === 'left') {
      maze[currentY][currentX].left = false;
      maze[y][x].right = false;
    }
    
    // Mark neighbor as visited
    maze[y][x].visited = true;
    stack.push({ x: currentX, y: currentY });
    
    // Move to the neighbor
    currentX = x;
    currentY = y;
  }
  
  return maze;
}

/**
 * Gets unvisited neighbors of a cell
 * @param {Array} maze - The maze grid
 * @param {number} x - X coordinate of the cell
 * @param {number} y - Y coordinate of the cell
 * @param {number} width - Width of the maze
 * @param {number} height - Height of the maze
 * @returns {Array} List of unvisited neighbor cells
 */
function getUnvisitedNeighbors(maze, x, y, width, height) {
  const neighbors = [];
  
  // Check top neighbor
  if (y > 0 && !maze[y-1][x].visited) {
    neighbors.push({ x, y: y-1, direction: 'top' });
  }
  
  // Check right neighbor
  if (x < width - 1 && !maze[y][x+1].visited) {
    neighbors.push({ x: x+1, y, direction: 'right' });
  }
  
  // Check bottom neighbor
  if (y < height - 1 && !maze[y+1][x].visited) {
    neighbors.push({ x, y: y+1, direction: 'bottom' });
  }
  
  // Check left neighbor
  if (x > 0 && !maze[y][x-1].visited) {
    neighbors.push({ x: x-1, y, direction: 'left' });
  }
  
  return neighbors;
}

/**
 * Checks if a move is valid in the maze
 * @param {Array} maze - The maze grid
 * @param {number} x - Current X position
 * @param {number} y - Current Y position
 * @param {string} direction - Direction to move (up, right, down, left)
 * @returns {boolean} Whether the move is valid
 */
export function isValidMove(maze, x, y, direction) {
  if (!maze[y] || !maze[y][x]) return false;
  
  switch (direction) {
    case 'up':
      return !maze[y][x].top;
    case 'right':
      return !maze[y][x].right;
    case 'down':
      return !maze[y][x].bottom;
    case 'left':
      return !maze[y][x].left;
    default:
      return false;
  }
}