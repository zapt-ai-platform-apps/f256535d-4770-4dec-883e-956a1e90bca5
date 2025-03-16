import React, { useState, useEffect, useCallback } from 'react';
import MazeRenderer from './MazeRenderer';
import Timer from './Timer';
import { generateMaze, isValidMove } from '../utils/mazeGenerator';
import GameControls from './GameControls';
import TouchControls from './TouchControls';
import useKeyPress from '../hooks/useKeyPress';

const MazeGame = () => {
  // Dynamic maze size based on screen
  const getInitialSize = () => {
    if (window.innerWidth < 480) return { width: 10, height: 15 };
    if (window.innerWidth < 768) return { width: 12, height: 18 };
    return { width: 15, height: 20 };
  };
  
  const [size, setSize] = useState(getInitialSize());
  const [maze, setMaze] = useState(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [completionTime, setCompletionTime] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Key press detection
  const upPressed = useKeyPress('ArrowUp') || useKeyPress('w');
  const rightPressed = useKeyPress('ArrowRight') || useKeyPress('d');
  const downPressed = useKeyPress('ArrowDown') || useKeyPress('s');
  const leftPressed = useKeyPress('ArrowLeft') || useKeyPress('a');
  
  // Initialize maze
  const initMaze = useCallback(() => {
    console.log('Generating new maze...');
    const newSize = getInitialSize();
    setSize(newSize);
    const newMaze = generateMaze(newSize.width, newSize.height);
    setMaze(newMaze);
    setPlayerPosition({ x: 0, y: 0 });
    setGameStarted(true);
    setGameCompleted(false);
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      
      // Only regenerate maze if size changed significantly
      const newSize = getInitialSize();
      if (size.width !== newSize.width || size.height !== newSize.height) {
        initMaze();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size, initMaze]);
  
  // Initialize maze on mount
  useEffect(() => {
    initMaze();
  }, [initMaze]);
  
  // Key press handling
  useEffect(() => {
    if (!maze || gameCompleted) return;
    
    let direction = null;
    
    if (upPressed) direction = 'up';
    else if (rightPressed) direction = 'right';
    else if (downPressed) direction = 'down';
    else if (leftPressed) direction = 'left';
    
    if (direction) {
      movePlayer(direction);
    }
  }, [upPressed, rightPressed, downPressed, leftPressed, maze, gameCompleted]);
  
  // Check for game completion
  useEffect(() => {
    if (maze && playerPosition.x === size.width - 1 && playerPosition.y === size.height - 1 && !gameCompleted) {
      setGameCompleted(true);
    }
  }, [maze, playerPosition, size, gameCompleted]);
  
  const movePlayer = (direction) => {
    if (!maze) return;
    
    let newX = playerPosition.x;
    let newY = playerPosition.y;
    
    switch (direction) {
      case 'up':
        if (isValidMove(maze, newX, newY, 'up')) newY -= 1;
        break;
      case 'right':
        if (isValidMove(maze, newX, newY, 'right')) newX += 1;
        break;
      case 'down':
        if (isValidMove(maze, newX, newY, 'down')) newY += 1;
        break;
      case 'left':
        if (isValidMove(maze, newX, newY, 'left')) newX -= 1;
        break;
      default:
        break;
    }
    
    if (newX !== playerPosition.x || newY !== playerPosition.y) {
      setPlayerPosition({ x: newX, y: newY });
    }
  };
  
  const handleTimerUpdate = (time) => {
    if (gameCompleted && completionTime === 0) {
      setCompletionTime(time);
    }
  };
  
  const restartGame = () => {
    setCompletionTime(0);
    initMaze();
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center bg-gray-700 rounded-lg shadow-lg overflow-hidden">
      <div className="w-full p-4 bg-gray-900">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold">Maze Challenge</h2>
          <Timer
            isRunning={gameStarted && !gameCompleted}
            onUpdate={handleTimerUpdate}
          />
        </div>
      </div>
      
      <div className="relative w-full flex-1 aspect-square max-h-[70vh]">
        {maze && (
          <MazeRenderer
            maze={maze}
            size={size}
            playerPosition={playerPosition}
          />
        )}
        
        {gameCompleted && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10">
            <div className="bg-gray-800 p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Maze Completed!</h2>
              <p className="text-xl mb-6">Your time: {(completionTime / 1000).toFixed(2)} seconds</p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
                onClick={restartGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="w-full p-4 bg-gray-900">
        <GameControls onRestart={restartGame} />
      </div>
      
      {isMobile && !gameCompleted && (
        <TouchControls onMove={movePlayer} />
      )}
    </div>
  );
};

export default MazeGame;