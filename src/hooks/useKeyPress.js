import { useEffect, useState } from 'react';

/**
 * Hook to detect when a key is pressed
 * @param {string} targetKey - Key to detect
 * @returns {boolean} Whether the key is currently pressed
 */
function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };
    
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };
    
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);
  
  return keyPressed;
}

export default useKeyPress;