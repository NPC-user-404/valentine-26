import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NoButtonPosition {
  top: number;
  left: number;
}

export const ProposalSurprise: React.FC = () => {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noPosition, setNoPosition] = useState<NoButtonPosition>({ top: 65, left: 60 });
  const confettiFrameRef = useRef<number | null>(null);

  const stopConfetti = () => {
    if (confettiFrameRef.current != null) {
      cancelAnimationFrame(confettiFrameRef.current);
      confettiFrameRef.current = null;
    }
    setShowConfetti(false);
  };

  const startConfetti = () => {
    setShowConfetti(true);

    const duration = 2200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: ["#fb7185", "#ec4899", "#a855f7", "#f97316"],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: ["#fb7185", "#ec4899", "#a855f7", "#f97316"],
      });

      if (Date.now() < end) {
        confettiFrameRef.current = requestAnimationFrame(frame);
      } else {
        stopConfetti();
      }
    };

    confettiFrameRef.current = requestAnimationFrame(frame);
  };

  useEffect(
    () => () => {
      stopConfetti();
    },
    []
  );

  const moveNoButton = () => {
    setNoPosition({
      top: 40 + Math.random() * 40,
      left: 20 + Math.random() * 60,
    });
  };

  const handleYes = () => {
    setHasAccepted(true);
    startConfetti();
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  const resetState = () => {
    stopConfetti();
    setHasAccepted(false);
    setNoPosition({ top: 65, left: 60 });
  };

  const closeModal = () => {
    setIsProposalOpen(false);
    resetState();
  };

  return (
    <div className="relative mt-100 flex flex-col items-center">
      <Button
        size="lg"
        className="relative overflow-hidden rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-10 py-6 text-base font-semibold text-white shadow-[0_22px_70px_rgba(244,114,182,0.7)] transition-transform duration-500 hover:-translate-y-1 hover:scale-105"
        onClick={() => setIsProposalOpen(true)}
      >
        <span className="relative z-10">Valentine 💖</span>
        <span className="pointer-events-none absolute inset-0 bg-white/20 opacity-0 blur-2xl transition-opacity duration-500 hover:opacity-100" />
      </Button>

      <AnimatePresence>
        {isProposalOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-rose-600/95 via-fuchsia-700/95 to-slate-900/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={cn(
                "relative mx-4 flex max-w-2xl flex-col items-center rounded-3xl border border-rose-200/40 bg-white/10 px-8 py-10 text-center shadow-[0_30px_120px_rgba(15,23,42,0.95)] backdrop-blur-3xl",
                "ring-1 ring-rose-300/25",
                showConfetti && "shadow-[0_0_60px_rgba(251,113,133,0.9)] ring-rose-200/60"
              )}
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <motion.div
                className="mb-4 text-6xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                💍
              </motion.div>

              <h2 className="font-script text-4xl md:text-5xl text-rose-50 drop-shadow-[0_8px_40px_rgba(251,113,133,0.9)]">
                {hasAccepted ? "I knew you'd say Yes." : "Will you be Mine Forever.?"}
              </h2>

              <p className="mt-4 max-w-xl text-sm md:text-base text-rose-100/90">
                {hasAccepted ? (
                  <>
                    Yay., you accepted my proposal., you really did., I can't believe it. 
                    Woah... Yay... Thank you for choosing us., again, and again, and again.
      
                    <span className="block text-center mt-2">
                      I Love You., Muah...
                    </span>
                  </>
                ) : (
                  "This isn't just any Valentine Proposal., this is a proposal I've made to you knowing ourselves and our past and our relationship. I want to wake up to your sleepy eyes., pull you closer and complain about how I don't want to go to work. I want to spend every afternoon having lunch and taking a sneaky lil nap with you. I want to spend my evening doing silly things with you. In the Night., I want to be the reason your breathing gets heavy and your body temperature rises. Will You be My Valentine.?"
                )}
              </p>


              <div className="relative mt-10 h-40 w-full max-w-md">
                {!hasAccepted && (
                  <>
                    <motion.button
                      type="button"
                      onClick={handleYes}
                      className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 px-10 py-3 text-base font-semibold text-emerald-950 shadow-[0_22px_70px_rgba(16,185,129,0.65)] transition-transform hover:-translate-y-1 hover:scale-105"
                      whileTap={{ scale: 0.94 }}
                    >
                      Yes 💍
                    </motion.button>

                    <motion.button
                      type="button"
                      onMouseEnter={handleNoHover}
                      onClick={moveNoButton}
                      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/80 px-8 py-2 text-sm font-medium text-rose-100 shadow-[0_16px_50px_rgba(15,23,42,0.9)]"
                      style={{
                        top: `${noPosition.top}%`,
                        left: `${noPosition.left}%`,
                      }}
                      animate={{
                        top: `${noPosition.top}%`,
                        left: `${noPosition.left}%`,
                      }}
                      transition={{ type: "spring", stiffness: 140, damping: 16 }}
                    >
                      No 🙈
                    </motion.button>
                  </>
                )}
              </div>

              {hasAccepted && (
                <motion.div
                  className="mt-6 flex flex-col items-center gap-4 text-base font-medium text-rose-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span>
                    No Need to Hide Your Smile and Red Blushy Face. You look so cute when you smile., cuter when you try to hide that Blush. My Cute Little Blushy Baby. 💖💖💖
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-rose-100/70 bg-rose-900/30 px-6 py-2 text-sm font-semibold text-rose-50 backdrop-blur-md hover:bg-rose-800/60"
                    onClick={closeModal}
                  >
                    Return Home 💕
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProposalSurprise;

