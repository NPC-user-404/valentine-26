import { useEffect } from "react";

export default function CursorHeartSplash() {
  useEffect(() => {
    const createHeart = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.className = "cursor-heart";
      heart.textContent = "❤️";

      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1200);
    };

    window.addEventListener("mousemove", createHeart);

    return () => {
      window.removeEventListener("mousemove", createHeart);
    };
  }, []);

  return null; // nothing visual to render
}
