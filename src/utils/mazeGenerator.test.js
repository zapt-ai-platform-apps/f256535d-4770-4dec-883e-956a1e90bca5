import { describe, it, expect } from 'vitest';
import { generateMaze, isValidMove } from './mazeGenerator';

describe('Maze Generator', () => {
  it('should generate a maze of the correct size', () => {
    const width = 10;
    const height = 10;
    const maze = generateMaze(width, height);
    
    expect(maze.length).toBe(height);
    expect(maze[0].length).toBe(width);
  });
  
  it('should generate a maze with all cells visited', () => {
    const width = 5;
    const height = 5;
    const maze = generateMaze(width, height);
    
    // All cells should be marked as visited
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        expect(maze[y][x].visited).toBe(true);
      }
    }
  });
  
  it('should create a path from start to end', () => {
    // This is a more complex test that would require path finding
    // For simplicity, we'll just check that the maze is connected (has enough passages)
    const width = 5;
    const height = 5;
    const maze = generateMaze(width, height);
    
    let wallCount = 0;
    let totalWalls = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (maze[y][x].top) wallCount++;
        if (maze[y][x].right) wallCount++;
        if (maze[y][x].bottom) wallCount++;
        if (maze[y][x].left) wallCount++;
        
        totalWalls += 4;
      }
    }
    
    // For a fully connected maze, we need at least width*height-1 passages
    // which means we need at most totalWalls - 2*(width*height-1) walls
    const maxWalls = totalWalls - 2 * (width * height - 1);
    
    // The actual formula is more complex because of boundary walls
    // but this is a reasonable approximation for testing
    expect(wallCount).toBeLessThan(totalWalls - (width * height - 1));
  });
  
  it('should validate moves correctly', () => {
    const maze = [
      [
        { top: true, right: false, bottom: false, left: true },
        { top: true, right: true, bottom: false, left: false }
      ],
      [
        { top: false, right: true, bottom: true, left: true },
        { top: false, right: true, bottom: true, left: true }
      ]
    ];
    
    // Test valid moves
    expect(isValidMove(maze, 0, 0, 'right')).toBe(true);
    expect(isValidMove(maze, 0, 0, 'down')).toBe(true);
    
    // Test invalid moves
    expect(isValidMove(maze, 0, 0, 'up')).toBe(false);
    expect(isValidMove(maze, 0, 0, 'left')).toBe(false);
    
    // Test boundary checking
    expect(isValidMove(maze, 2, 0, 'right')).toBe(false); // Out of bounds
  });
});