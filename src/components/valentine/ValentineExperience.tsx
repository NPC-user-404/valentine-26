import { useState } from "react";
import { motion } from "framer-motion";
import OpenWhenLetters from "./OpenWhenLetters";
import FloatingLoveNotes from "./FloatingLoveNotes";
import DayNightRomanceToggle from "./DayNightRomanceToggle";
import BackgroundMusicPlayer from "./BackgroundMusicPlayer";
import ProposalSurprise from "./ProposalSurprise";

type RomanceMode = "day" | "night";

export const ValentineExperience: React.FC = () => {
  const [mode, setMode] = useState<RomanceMode>("day");

  const isNight = mode === "night";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingLoveNotes />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-[-10rem] h-80 w-80 rounded-full bg-gradient-to-br from-rose-300/70 via-pink-300/60 to-fuchsia-300/50 blur-3xl" />
        <div className="absolute right-[-5rem] top-24 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-500/50 via-fuchsia-400/50 to-rose-300/40 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-10 h-72 w-72 rounded-full bg-gradient-to-tr from-rose-400/55 via-amber-200/40 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
              Valentine 2026
            </p>
            <h1 className="font-script text-4xl md:text-5xl text-rose-700 drop-shadow-sm">
              Our Little Love Universe
            </h1>
          </div>
          <DayNightRomanceToggle onModeChange={setMode} />
        </header>

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 pb-16 pt-6 overflow-y-auto">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel rounded-3xl border border-white/40 bg-white/15 p-6 shadow-[0_24px_70px_rgba(248,113,166,0.45)] backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose-400">
                  Welcome to us
                </p>
                <h2 className="font-script text-3xl text-rose-700">
                  Made with Soft Magical Love
                </h2>
                <p className="mt-2 max-w-xl text-sm text-rose-700/90">
                  Letters to open on the right days, little notes that float by, a silly little game, and
                  a question big enough to Last a Lifetime...
                </p>
              </div>

              <div className="mt-2 md:mt-0">
                <BackgroundMusicPlayer />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="space-y-8"
          >
            <OpenWhenLetters />
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
          >
            <ProposalSurprise />
          </motion.section>
        </main>

        <footer className="pb-6 text-center text-[0.7rem] text-rose-400">
          This page is best viewed with someone&apos;s hand in yours.
        </footer>
      </div>

      <div
        className={
          isNight
            ? "pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-slate-900 via-violet-950 to-slate-950"
            : "pointer-events-none fixed inset-0 -z-20 bg-gradient-to-br from-rose-50 via-rose-100 to-fuchsia-100"
        }
      />
    </div>
  );
};

export default ValentineExperience;

