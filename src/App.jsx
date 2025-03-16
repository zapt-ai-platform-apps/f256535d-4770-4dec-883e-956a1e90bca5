import React from 'react';
import MazeGame from './components/MazeGame';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-white">
      <header className="bg-gray-900 p-4 text-center">
        <h1 className="text-xl md:text-2xl font-bold">Maze Escape Challenge</h1>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-2 md:p-4">
        <MazeGame />
      </main>
      
      <footer className="bg-gray-900 p-2 text-center text-xs">
        <div className="zapt-badge">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            Made on ZAPT
          </a>
        </div>
      </footer>
    </div>
  );
}