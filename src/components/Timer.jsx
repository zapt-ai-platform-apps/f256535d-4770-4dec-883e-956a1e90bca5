import React, { useState, useEffect } from 'react';

const Timer = ({ isRunning, onUpdate }) => {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      if (!startTime) {
        setStartTime(Date.now() - elapsedTime);
      }
      
      interval = setInterval(() => {
        const currentElapsed = Date.now() - startTime;
        setElapsedTime(currentElapsed);
        onUpdate(currentElapsed);
      }, 10);
    } else {
      clearInterval(interval);
      
      // Reset timer if not running and elapsed time is 0
      if (elapsedTime === 0) {
        setStartTime(null);
      }
    }
    
    return () => clearInterval(interval);
  }, [isRunning, startTime, elapsedTime, onUpdate]);
  
  // Format time as mm:ss.ms
  const formatTime = (time) => {
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor(time / (1000 * 60));
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="text-lg md:text-xl font-mono">
      {formatTime(elapsedTime)}
    </div>
  );
};

export default Timer;