import { useState } from "react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import EscapingButton from "@/components/EscapingButton";
import CelebrationScreen from "@/components/CelebrationScreen";

const Index = () => {
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return <CelebrationScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valentine-blush via-background to-valentine-rose/20 flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 text-center px-6">
        {/* Decorative hearts */}
        <div className="text-6xl md:text-8xl mb-4">💕</div>
        
        {/* Main question */}
        <h1 className="font-script text-5xl md:text-7xl lg:text-8xl text-valentine-deep mb-4 drop-shadow-lg">
          Will you be my
        </h1>
        <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-primary mb-12 drop-shadow-lg">
          Valentine?
        </h1>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <Button
            size="lg"
            className="px-12 py-6 text-xl font-semibold bg-gradient-to-r from-valentine-pink to-valentine-red text-white shadow-xl animate-pulse-glow hover:scale-105 transition-transform"
            onClick={() => setAccepted(true)}
          >
            Yes 💖
          </Button>
          
          <EscapingButton />
        </div>
        
        {/* Decorative bottom hearts */}
        <div className="mt-12 text-3xl opacity-60">
          💗 💓 💗
        </div>
      </div>
    </div>
  );
};

export default Index;
