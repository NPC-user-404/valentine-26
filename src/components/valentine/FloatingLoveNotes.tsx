import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type LoveNoteSide = "left" | "right";

interface LoveNote {
  id: number;
  text: string;
  side: LoveNoteSide;
  offsetPx: number;
  durationMs: number;
}

const LOVE_MESSAGES: string[] = [
"You are just so freaking Adorable.",
"I Love You., My Princess. ❤︎",
"You are My Favourite., My Mupkin. ♡ ♡ ♡",
"Stop Smiling Idiot., You are Distracting Me.",
"This is For You., My Love. 𑣲𖹭 𑣲𖹭 𑣲𖹭",
"Your Smile is the Greatest Gift.",
"You are My Divine Blessing. 𓆩♡𓆪",
"Saranghae. 🫰🫰🫰",
"(=♡ ᆺ ♡=) | (꒒ ০ ⌵ ୧)",
"ℒ𝓸𝓿𝒆 𝔂𝓸𝓾., My BabyGirl. ⁠𔘓 𔘓 𔘓",
"|˗ˏˋ ♡ ˎˊ˗|˗ˏˋ ♡ ˎˊ˗|˗ˏˋ ♡ ˎˊ˗|",
];

const MAX_NOTES = 8;

export const FloatingLoveNotes: React.FC = () => {
  const [notes, setNotes] = useState<LoveNote[]>([]);
  const [selected, setSelected] = useState<LoveNote | null>(null);

  const baseId = useMemo(() => Math.floor(Math.random() * 100000), []);

  useEffect(() => {
    let idCounter = baseId;

    const spawn = (side: LoveNoteSide) => {
      setNotes((prev) => {
        const next: LoveNote = {
          id: idCounter++,
          text: LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)],
          side,
          offsetPx: 8 + Math.random() * 12,
          durationMs: 9000 + Math.random() * 7000,
        };

        const trimmed = prev.slice(-MAX_NOTES + 1);
        return [...trimmed, next];
      });
    };

    const leftInterval = window.setInterval(() => spawn("left"), 1500);
    const rightInterval = window.setInterval(() => spawn("right"), 1900);

    return () => {
      window.clearInterval(leftInterval);
      window.clearInterval(rightInterval);
    };
  }, [baseId]);

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      >
        {notes.map((note) => {
          const isRight = note.side === "right";
          const style = isRight
            ? {
                right: `${note.offsetPx}px`,
                animation: `love-note-float ${note.durationMs}ms cubic-bezier(.22,.9,.25,1) forwards`,
              }
            : {
                left: `${note.offsetPx}px`,
                animation: `love-note-float ${note.durationMs}ms cubic-bezier(.22,.9,.25,1) forwards`,
              };

          return (
            <button
              key={note.id}
              type="button"
              className="pointer-events-auto absolute bottom-[-3rem] min-w-[7rem] max-w-[10rem] rounded-2xl bg-white/15 px-3 py-2 text-xs font-medium text-rose-50 shadow-[0_18px_40px_rgba(244,114,182,0.4)] backdrop-blur-md ring-1 ring-white/40 transition-transform hover:-translate-y-1 hover:scale-105"
              style={style}
              onClick={() => setSelected(note)}
            >
              <span className="line-clamp-2 text-left">{note.text}</span>
            </button>
          );
        })}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-sm border border-rose-100/80 bg-gradient-to-b from-rose-50 via-white to-rose-50 shadow-[0_24px_70px_rgba(244,114,182,0.5)]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-script text-3xl text-rose-600">
                  A little love note
                </DialogTitle>
              </DialogHeader>
              <p className="mt-3 text-sm leading-relaxed text-rose-900">{selected.text}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingLoveNotes;

