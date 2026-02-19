import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartCatchGame } from "./HeartCatchGame";

export const BackgroundMusicPlayer: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  if (showGame) {
    return <HeartCatchGame />;
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => setShowGame(true)}
        className="rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:scale-105 active:scale-95"
      >
        Catch My Heart 💗
      </Button>
    </div>
  );
};

export default BackgroundMusicPlayer;

