import { useEffect, useRef, useState } from "react";

interface Heart {
  id: number;
  left: number; // percent
  duration: number; // seconds
  size: number; // px
  emoji: string;
  drift: number; // px
}

const EMOJIS = ["💖", "💕", "💗", "💘"];

const MAX_HEARTS = 30;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const idRef = useRef(1);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let spawnTimer: number | null = null;

    const spawn = () => {
      if (!mountedRef.current) return;

      setHearts((prev) => {
        if (prev.length >= MAX_HEARTS) return prev;
        const id = idRef.current++;
        const duration = 4 + Math.random() * 3; // 4-7s
        const size = 14 + Math.random() * 28; // 14-42px
        const left = 6 + Math.random() * 88; // keep within screen edges
        const drift = (Math.random() * 2 - 1) * 60; // -60px .. 60px
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

        const next: Heart = { id, left, duration, size, emoji, drift };

        // schedule removal when animation completes
        window.setTimeout(() => {
          setHearts((cur) => cur.filter((h) => h.id !== id));
        }, (duration + 0.2) * 1000);

        return [...prev, next];
      });

      // schedule next spawn at a random interval
      const nextDelay = 200 + Math.random() * 800; // 200ms - 1000ms
      spawnTimer = window.setTimeout(spawn, nextDelay) as unknown as number;
    };

    // kick off a few initial spawns for immediate visual feedback
    for (let i = 0; i < 3; i++) {
      const d = i * 150 + Math.random() * 150;
      window.setTimeout(spawn, d) as unknown as number;
    }

    return () => {
      mountedRef.current = false;
      if (spawnTimer) window.clearTimeout(spawnTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart absolute bottom-0 pointer-events-none select-none"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            // expose per-heart vars to CSS
            //@ts-ignore
            ["--drift"]: `${heart.drift}px`,
            //@ts-ignore
            ["--duration"]: `${heart.duration}s`,
          } as any}
          aria-hidden
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
