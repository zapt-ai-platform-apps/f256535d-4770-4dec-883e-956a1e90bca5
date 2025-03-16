import React from 'react';

const TouchControls = ({ onMove }) => {
  return (
    <div className="w-full p-4 bg-gray-800 grid grid-cols-3 gap-2">
      {/* Top row - Up button */}
      <div className="flex justify-center">
        <button
          className="control-btn w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => onMove('up')}
          aria-label="Move up"
        >
          ↑
        </button>
      </div>
      
      {/* Middle row - Left, Blank Space, Right */}
      <div className="flex justify-center">
        <button
          className="control-btn w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => onMove('left')}
          aria-label="Move left"
        >
          ←
        </button>
      </div>
      <div className="flex justify-center">
        {/* Empty middle space */}
      </div>
      <div className="flex justify-center">
        <button
          className="control-btn w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => onMove('right')}
          aria-label="Move right"
        >
          →
        </button>
      </div>
      
      {/* Bottom row - Down button */}
      <div className="flex justify-center">
        <button
          className="control-btn w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => onMove('down')}
          aria-label="Move down"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default TouchControls;