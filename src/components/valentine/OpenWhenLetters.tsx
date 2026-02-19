import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

type LetterKey = "sad" | "doNotClick" | "missing";

interface LetterConfig {
  id: LetterKey;
  title: string;
  tag: string;
  message: string;
  icon: string;
}

const OPEN_WHEN_LETTERS: LetterConfig[] = [
  {
    id: "sad",
    title: "Open When You Are Sad",
    tag: "For Rainy Heart Days",
    icon: "💌",
    message:
      "Aww., you are Sad. Why are you Sad.? Aww my baby. Come here. Let me hold you a little closer., a little tighter and let me give you a big hug. Big enough to overshadow your sadness. My Babygirl., it's okay to be sad. But isn't that exactly we have each other.? To hold a little closer, a little tighter when we are sad. That's why we have each other., my love... I am always here for you., always near you...",
  },
  {
    id: "doNotClick",
    title: "Do Not Click ❤️",
    tag: "Seriously. Don't.",
    icon: "🚫",
    message:
      "You were warned. And yet here you are, exactly where I was secretly hoping you’d end up — in the middle of a dramatic, over-the-top love confession. I don’t just want a Valentine with you; I want quiet Mondays, sleepy Sundays, shared playlists, ridiculous inside jokes, and a lifetime of ‘remember when we…’ stories that all come back to us choosing each other.",
  },
  {
    id: "missing",
    title: "Open When You Are Missing Me",
    tag: "For distance & Longing",
    icon: "💭",
    message:
      "It makes me Happy that you are missing me., my love... As much as it hurts you to miss me., it hurts me to be not there. Maybe we are not together right now it's okay because one day we'll be. One day My every Morning will be by seeing your lovely face and every night by seeing your sweet tired face as you sleep in my arms...",
  },
];

export const OpenWhenLetters: React.FC = () => {
  const [openId, setOpenId] = useState<LetterKey | null>(null);
  const [warningStep, setWarningStep] = useState<0 | 1 | 2 | 3>(0);
  const [noPosition, setNoPosition] = useState<{ top: number; left: number }>({
    top: 65,
    left: 60,
  });

  const activeLetter = OPEN_WHEN_LETTERS.find((l) => l.id === openId) ?? null;

  const isModalOpen = activeLetter !== null;

  const handleOpen = (id: LetterKey) => {
    if (id === "doNotClick") {
      setWarningStep(1);
      setOpenId(id);
    } else {
      setOpenId(id);
      setWarningStep(0);
    }
  };

  const shuffleNoButton = () => {
    setNoPosition({
      top: 35 + Math.random() * 40,
      left: 20 + Math.random() * 60,
    });
  };

  const closeModal = () => {
    setOpenId(null);
    setWarningStep(0);
    setNoPosition({ top: 65, left: 60 });
  };

  const triggerDoNotClickReveal = () => {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fb7185", "#ec4899", "#a855f7", "#f97316"],
    });
    setWarningStep(0);
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {OPEN_WHEN_LETTERS.map((letter) => {
          return (
            <Card
              key={letter.id}
              className={cn(
                "group relative flex cursor-pointer flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/40 bg-white/10 px-5 py-6 shadow-[0_18px_45px_rgba(248,113,161,0.15)] backdrop-blur-xl transition-shadow duration-500",
                "hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(248,113,166,0.35)]"
              )}
              onClick={() => {
                handleOpen(letter.id);
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-pink-200/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                {letter.id === "doNotClick" ? (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-500 text-2xl shadow-[0_18px_45px_rgba(244,114,182,0.6)]">
                    <span>{letter.icon}</span>
                  </div>
                ) : (
                  <div className="envelope-outer">
                    <div className="envelope-flap group-hover:animate-envelope-open" />
                    <div className="envelope-body" />
                    <div className="envelope-heart">{letter.icon}</div>
                  </div>
                )}

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-400">
                    {letter.tag}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-rose-900 drop-shadow-sm">
                    {letter.title}
                  </h3>
                </div>

                <div className="mt-4 text-xs text-rose-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                    {letter.id === "doNotClick" ? "Seriously. Don't." : "Tap to open"}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
        {activeLetter && activeLetter.id === "doNotClick" ? (
          warningStep > 0 ? (
            <DialogContent className="max-w-md border border-rose-100/80 bg-gradient-to-b from-rose-50/95 via-white/95 to-rose-50/95 shadow-[0_24px_80px_rgba(244,114,182,0.45)]">
              <DialogHeader>
                <DialogTitle className="font-script text-3xl text-rose-600">
                  {warningStep === 1 && "Are you sure You Want take a Peek?"}
                  {warningStep === 2 && "Last Chance to Turn Back."}
                  {warningStep === 3 && "This is What You Wanted, Right?"}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-rose-900">
                {warningStep === 1 && (
                  <p>
                    Some doors stay closed for a reason. This one is full of feelings, probably a
                    little too much honesty, and a tiny bit of forever. Still tempted?
                  </p>
                )}
                {warningStep === 2 && (
                  <p>
                    This isn&apos;t just a curious click anymore. Whatever you find on the other
                    side, you don&apos;t get to unknow. Your heart ready for that?
                  </p>
                )}
                {warningStep === 3 && (
                  <p>
                    If you open this, you accept full responsibility for any butterflies, soft
                    smiles, or sudden desire to hold me a little tighter.
                  </p>
                )}
              </div>
              <div className="mt-6 flex justify-between gap-3">
                {warningStep === 1 && (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full border-rose-200 bg-white/60 px-4 text-xs text-rose-600 hover:bg-rose-50"
                      onClick={closeModal}
                    >
                      Take Me Back 💕
                    </Button>
                    <Button
                      className="rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,114,182,0.6)] hover:-translate-y-0.5 hover:scale-105 transition-transform"
                      onClick={() => setWarningStep(2)}
                    >
                      I&apos;m Curious 💭
                    </Button>
                  </>
                )}
                {warningStep === 2 && (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full border-rose-200 bg-white/60 px-4 text-xs text-rose-600 hover:bg-rose-50"
                      onClick={closeModal}
                    >
                      Return While You Can 💌
                    </Button>
                    <Button
                      className="rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,114,182,0.6)] hover:-translate-y-0.5 hover:scale-105 transition-transform"
                      onClick={() => setWarningStep(3)}
                    >
                      I Need to Know ❤️
                    </Button>
                  </>
                )}
                {warningStep === 3 && (
                  <div className="flex w-full justify-center">
                    <Button
                      className="rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-8 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(244,114,182,0.6)] hover:-translate-y-0.5 hover:scale-105 transition-transform"
                      onClick={triggerDoNotClickReveal}
                    >
                      Open It.
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          ) : (
            <DialogContent className="flex max-w-3xl flex-col items-center justify-center gap-8 border border-rose-100/60 bg-gradient-to-br from-rose-600 via-fuchsia-700 to-slate-900 py-10 text-center shadow-[0_40px_120px_rgba(15,23,42,0.95)]">
              <DialogHeader>
                <DialogTitle className="font-script text-4xl text-rose-50 drop-shadow-[0_8px_40px_rgba(251,113,133,0.9)]">
                  You Never Listen, Do You? 🙈
                </DialogTitle>
                <DialogDescription className="text-xs uppercase tracking-[0.3em] text-rose-200/80">
                  Your Official Dramatic Love Interruption
                </DialogDescription>
              </DialogHeader>
              <div className="max-w-xl text-sm leading-relaxed text-rose-50/95">
                <p>{activeLetter.message}</p>
                <p className="mt-4 text-rose-100/80">
                  So since you&apos;re already here, I have just one tiny question: stay mine? On
                  the soft days, the loud days, and all the ordinary ones in between.
                </p>
              </div>
              <div className="relative mt-6 h-40 w-full max-w-md">
                <Button
                  type="button"
                  onClick={closeModal}
                  className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 px-10 py-3 text-base font-semibold text-emerald-950 shadow-[0_22px_70px_rgba(16,185,129,0.65)] transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  Okay Fine 💍
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-rose-200/80 bg-rose-900/70 px-8 py-2 text-sm font-medium text-rose-50 shadow-[0_16px_50px_rgba(15,23,42,0.9)]"
                  style={{ top: `${noPosition.top}%`, left: `${noPosition.left}%` }}
                  onMouseEnter={shuffleNoButton}
                  onClick={shuffleNoButton}
                >
                  No 🙈
                </Button>
              </div>
            </DialogContent>
          )
        ) : (
          <DialogContent className="max-w-md border border-rose-100/80 bg-gradient-to-b from-rose-50/95 via-white/95 to-rose-50/95 shadow-[0_24px_80px_rgba(244,114,182,0.45)]">
            {activeLetter && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-script text-3xl text-rose-600">
                    {activeLetter.title}
                  </DialogTitle>
                  <DialogDescription className="text-xs uppercase tracking-[0.25em] text-rose-400">
                    A love note just for you
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-rose-900">
                  <p>{activeLetter.message}</p>
                  <p className="text-right font-medium text-rose-500">
                    Forever yours,
                    <br />
                    <span className="font-script text-2xl">Your Darling</span>
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <Button
                    variant="outline"
                    className="rounded-full border-rose-200 bg-white/60 px-6 text-rose-600 hover:bg-rose-50"
                    onClick={closeModal}
                  >
                    Close with a smile
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default OpenWhenLetters;

