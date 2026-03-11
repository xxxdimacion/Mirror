import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

interface DinoGameProps {
  onWin: () => void;
}

export default function DinoGame({ onWin }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover' | 'won'>('start');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isJumping = false;
    let dinoY = 100;
    let velocityY = 0;
    const gravity = 0.6;
    const jumpStrength = -11;
    const groundLine = 130;

    let obstacles: { x: number; passed: boolean }[] = [];
    let frameCount = 0;
    let currentScore = 0;
    let gameSpeed = 5;
    let nextSpawn = 60;

    const handleJump = () => {
      if (!isJumping) {
        isJumping = true;
        velocityY = jumpStrength;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      ctx.beginPath();
      ctx.moveTo(0, groundLine + 2);
      ctx.lineTo(canvas.width, groundLine + 2);
      ctx.strokeStyle = '#d6d3d1'; // stone-300
      ctx.lineWidth = 2;
      ctx.stroke();

      // Physics
      velocityY += gravity;
      dinoY += velocityY;

      if (dinoY >= groundLine - 30) {
        dinoY = groundLine - 30;
        isJumping = false;
        velocityY = 0;
      }

      // Draw Dino
      ctx.fillStyle = '#44403c';
      // Head & Snout
      ctx.fillRect(50 + 12, dinoY, 14, 10);
      ctx.fillRect(50 + 16, dinoY + 4, 14, 6);
      // Eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(50 + 16, dinoY + 2, 4, 4);
      ctx.fillStyle = '#44403c';
      // Body
      ctx.fillRect(50 + 6, dinoY + 10, 16, 14);
      // Tail
      ctx.fillRect(50, dinoY + 12, 6, 8);
      ctx.fillRect(50 - 4, dinoY + 10, 4, 6);
      // Tiny arms
      ctx.fillRect(50 + 22, dinoY + 14, 4, 2);
      // Legs (animated)
      if (isJumping || Math.floor(frameCount / 6) % 2 === 0) {
        ctx.fillRect(50 + 8, dinoY + 24, 4, 6);
        ctx.fillRect(50 + 16, dinoY + 24, 4, 4);
      } else {
        ctx.fillRect(50 + 8, dinoY + 24, 4, 4);
        ctx.fillRect(50 + 16, dinoY + 24, 4, 6);
      }

      // Obstacles
      if (frameCount >= nextSpawn) {
        obstacles.push({ x: canvas.width, passed: false });
        nextSpawn = frameCount + 70 + Math.random() * 100; // Random spawn interval
      }

      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        // Draw Mirror Obstacle
        // Frame
        ctx.fillStyle = '#d6d3d1'; // stone-300
        ctx.beginPath();
        ctx.ellipse(obs.x + 10, groundLine - 20, 10, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        // Glass
        ctx.fillStyle = '#bae6fd'; // sky-200
        ctx.beginPath();
        ctx.ellipse(obs.x + 10, groundLine - 20, 7, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        // Stand
        ctx.fillStyle = '#a8a29e'; // stone-400
        ctx.fillRect(obs.x + 8, groundLine - 4, 4, 4);
        ctx.fillRect(obs.x + 2, groundLine, 16, 2);

        // Collision
        if (
          obs.x < 75 &&
          obs.x + 18 > 50 &&
          dinoY + 28 > groundLine - 34
        ) {
          setGameState('gameover');
          return; // Stop game loop
        }

        // Score
        if (obs.x + 20 < 50 && !obs.passed) {
          obs.passed = true;
          currentScore++;
          setScore(currentScore);
          
          if (currentScore >= 20) {
            setGameState('won');
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#fcd34d', '#f472b6', '#38bdf8', '#4ade80']
            });
            onWin();
            return;
          }
        }

        // Remove off-screen
        if (obs.x < -20) {
          obstacles.splice(i, 1);
        }
      }

      frameCount++;
      gameSpeed += 0.002; // Gradually increase speed

      // Draw Score
      ctx.fillStyle = '#44403c';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`Зеркала: ${currentScore}/20`, canvas.width - 170, 40);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, onWin]);

  return (
    <div className="w-full flex flex-col items-center my-4">
      <div 
        className="relative w-full max-w-[600px] h-[150px] bg-stone-50 rounded-xl overflow-hidden cursor-pointer border-2 border-stone-200 shadow-inner"
        onClick={() => {
          if (gameState === 'playing') {
            // Simulate jump on click/tap
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
          }
        }}
      >
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={150} 
          className="w-full h-full block"
        />
        
        {gameState === 'start' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]">
            <button 
              onClick={(e) => { e.stopPropagation(); setGameState('playing'); setScore(0); }}
              className="px-6 py-2.5 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Начать игру
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-[2px]">
            <p className="text-stone-800 font-bold mb-3 text-lg">Ой, столкновение!</p>
            <button 
              onClick={(e) => { e.stopPropagation(); setGameState('playing'); setScore(0); }}
              className="px-6 py-2 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {gameState === 'won' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50/90 backdrop-blur-[2px]">
            <p className="text-green-700 font-bold mb-1 text-xl">Победа! 🎉</p>
            <p className="text-green-600 font-medium">Скидка 20% применена!</p>
          </div>
        )}
      </div>
      {gameState === 'playing' && (
        <p className="text-xs text-stone-400 mt-2 text-center animate-pulse">
          Нажимайте пробел или кликайте по экрану, чтобы прыгать
        </p>
      )}
    </div>
  );
}
