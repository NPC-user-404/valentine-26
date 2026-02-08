import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const EscapingButton = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasEscaped, setHasEscaped] = useState(false);

  const escape = useCallback(() => {
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setPosition({ x: newX, y: newY });
    setHasEscaped(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="lg"
      className="px-10 py-6 text-xl font-semibold border-2 border-valentine-pink/50 bg-valentine-blush text-valentine-deep hover:bg-valentine-rose/30 transition-all duration-100"
      style={{
        transform: hasEscaped ? `translate(${position.x}px, ${position.y}px)` : "none",
        position: hasEscaped ? "fixed" : "relative",
        zIndex: hasEscaped ? 50 : "auto",
      }}
      onMouseEnter={escape}
      onTouchStart={escape}
    >
      No 💔
    </Button>
  );
};

export default EscapingButton;
