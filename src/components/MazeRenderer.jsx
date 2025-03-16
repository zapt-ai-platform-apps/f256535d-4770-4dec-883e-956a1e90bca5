import React from 'react';

const MazeRenderer = ({ maze, size, playerPosition }) => {
  if (!maze) return null;
  
  const cellSize = `repeat(${size.width}, 1fr)`;
  
  return (
    <div 
      className="cells-container" 
      style={{ 
        gridTemplateColumns: cellSize, 
        gridTemplateRows: `repeat(${size.height}, 1fr)`
      }}
    >
      {maze.map((row, y) => (
        row.map((cell, x) => {
          const isPlayerHere = playerPosition.x === x && playerPosition.y === y;
          const isStart = x === 0 && y === 0;
          const isEnd = x === size.width - 1 && y === size.height - 1;
          
          let cellClass = "cell";
          if (isStart) cellClass += " start-cell";
          if (isEnd) cellClass += " end-cell";
          
          return (
            <div key={`${x}-${y}`} className={cellClass}>
              {cell.top && <div className="wall-top"></div>}
              {cell.right && <div className="wall-right"></div>}
              {cell.bottom && <div className="wall-bottom"></div>}
              {cell.left && <div className="wall-left"></div>}
              
              {isPlayerHere && <div className="player"></div>}
              
              {isStart && !isPlayerHere && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-bold text-gray-700">START</div>
                </div>
              )}
              
              {isEnd && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-bold text-gray-700">EXIT</div>
                </div>
              )}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default MazeRenderer;