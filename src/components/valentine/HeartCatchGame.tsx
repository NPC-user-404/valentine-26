import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface FloatingHeart {
  id: number;
  x: number;
  duration: number;
}

export const HeartCatchGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [pops, setPops] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const heartIdRef = useRef(0);
  const popIdRef = useRef(0);
  const spawnIntervalRef = useRef<number | null>(null);

  const HEART_TARGET = 7; // Number of hearts to catch to win
  const SPAWN_INTERVAL = 700; // ms between heart spawns
  const MAX_WIDTH = typeof window !== "undefined" ? window.innerWidth : 1200;

  // Spawn hearts at bottom of screen
  useEffect(() => {
    if (!gameActive || gameComplete) return;

    spawnIntervalRef.current = window.setInterval(() => {
      const newHeart: FloatingHeart = {
        id: heartIdRef.current++,
        x: Math.random() * (MAX_WIDTH - 60),
        duration: 3 + Math.random() * 2, // 3-6 seconds
      };
      setHearts((prev) => [...prev, newHeart]);
    }, SPAWN_INTERVAL);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameActive, gameComplete, MAX_WIDTH]);

  // Auto-remove hearts after animation ends
  useEffect(() => {
    const removeTimeouts = hearts.map((heart) => {
      return setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      }, heart.duration * 1000);
    });

    return () => removeTimeouts.forEach((timeout) => clearTimeout(timeout));
  }, [hearts]);

  // Check completion
  useEffect(() => {
    if (score >= HEART_TARGET) {
      setGameActive(false);
      setGameComplete(true);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    }
  }, [score]);

  const handleHeartClick = (
    heartId: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    // Remove heart
    setHearts((prev) => prev.filter((h) => h.id !== heartId));

    // Increment score
    setScore((prev) => prev + 1);

    // Create pop animation
    const rect = e.currentTarget.getBoundingClientRect();
    const pop = {
      id: popIdRef.current++,
      x: rect.left,
      y: rect.top,
    };
    setPops((prev) => [...prev, pop]);

    // Remove pop after animation
    setTimeout(() => {
      setPops((prev) => prev.filter((p) => p.id !== pop.id));
    }, 600);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setGameComplete(false);
    setGameActive(true);
    setHearts([]);
    setPops([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-rose-50 via-rose-100 to-fuchsia-100">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl pointer-events-none" />

      {/* Score display */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-20">
        <div className="rounded-full border border-white/40 bg-white/10 px-6 py-3 backdrop-blur-lg shadow-[0_10px_30px_rgba(248,113,166,0.2)]">
          <p className="text-lg font-semibold text-rose-900">
            Love Collected: {score} 💘
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Floating hearts */}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 cursor-pointer"
            style={{
              left: `${heart.x}px`,
              width: "60px",
              height: "60px",
              animation: `float-up-heart ${heart.duration}s ease-in-out forwards`,
            }}
            onClick={(e) => handleHeartClick(heart.id, e)}
          >
            <div className="w-full h-full flex items-center justify-center text-5xl transition-transform hover:scale-125 duration-200 drop-shadow-[0_0_15px_rgba(248,113,166,0.6)]">
              💗
            </div>
          </div>
        ))}

        {/* Pop animations */}
        {pops.map((pop) => (
          <div
            key={pop.id}
            className="fixed pointer-events-none font-bold text-rose-500 animate-pulse"
            style={{
              left: `${pop.x}px`,
              top: `${pop.y}px`,
              animation: `pop-text 0.6s ease-out forwards`,
            }}
          >
            +1 💕
          </div>
        ))}
      </div>

      {/* Completion Screen - Fixed positioning above game */}
      {gameComplete && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Celebration burst */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: "50%",
                  top: "50%",
                  animation: `burst-heart ${1.5}s ease-out forwards`,
                  animationDelay: `${i * 75}ms`,
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                }}
              >
                💕
              </div>
            ))}
          </div>

          {/* Popup message */}
          <div className="relative w-full max-w-lg rounded-3xl border border-white/40 bg-rose-200 p-8 sm:p-8 text-center backdrop-blur-xl shadow-[0_24px_100px_rgba(248,113,166,0.45)]">
            <div className="mb-6 text-6xl animate-bounce">💞</div>
            <h2 className="mb-3 text-3xl font-bold text-rose-900">
              You Caught My Heart!
            </h2>
            <p className="mb-8 text-sm sm:text-base text-rose-700">
              Damn Girl., You collected all 7 Hearts. You are definitely Special.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                onClick={handlePlayAgain}
                className="rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-6 sm:px-8 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_10px_25px_rgba(244,114,182,0.4)] hover:scale-105 active:scale-95"
              >
                Play Again 💗
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="rounded-full border border-white/40 px-6 sm:px-8 py-2 text-sm font-semibold text-rose-900 transition-all hover:bg-white/10"
              >
                Return Home
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float-up-heart {
          0% {
            bottom: 0;
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(${Math.random() > 0.5 ? 1 : -1} * 40px) scale(1);
          }
          100% {
            bottom: 100vh;
            opacity: 0;
            transform: translateX(0) scale(0.8);
          }
        }

        @keyframes pop-text {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120px) scale(1.5);
          }
        }

        @keyframes burst-heart {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(360deg) translateY(-150px);
          }
        }
      `}</style>
    </div>
  );
};

export default HeartCatchGame;
