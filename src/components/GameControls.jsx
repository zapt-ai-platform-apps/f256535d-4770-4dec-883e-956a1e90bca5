import React from 'react';

const GameControls = ({ onRestart }) => {
  return (
    <div className="flex justify-center">
      <button 
        onClick={onRestart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        New Maze
      </button>
    </div>
  );
};

export default GameControls;