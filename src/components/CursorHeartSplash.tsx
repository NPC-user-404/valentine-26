// import { useEffect } from "react";

// export default function CursorHeartSplash() {
//   useEffect(() => {
//     const createHeart = (e: MouseEvent) => {
//       const heart = document.createElement("div");
//       heart.className = "cursor-heart";
//       heart.textContent = "♥";

//       heart.style.left = `${e.clientX}px`;
//       heart.style.top = `${e.clientY}px`;

//       document.body.appendChild(heart);

//       setTimeout(() => {
//         heart.remove();
//       }, 1200);
//     };

//     window.addEventListener("mousemove", createHeart);

//     return () => {
//       window.removeEventListener("mousemove", createHeart);
//     };
//   }, []);

//   return null; // nothing visual to render
// }
import { useEffect } from "react";

export default function CursorHeartSplash() {
  useEffect(() => {
    // Small trailing hearts
    const createHeart = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.className = "cursor-heart";
      heart.textContent = "♥";

      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1200);
    };

    // Big heart explosion on click
    const explodeHeart = (e: MouseEvent) => {
      const centerX = e.clientX;
      const centerY = e.clientY;

      const particles = 26; // number of small hearts

      for (let i = 0; i < particles; i++) {
        const heart = document.createElement("div");
        heart.className = "explosion-heart";
        heart.textContent = "💗";

        // Heart shape formula
        const angle = (i / particles) * Math.PI * 2;
        const radius = 60;

        const x =
          16 * Math.pow(Math.sin(angle), 3);
        const y =
          13 * Math.cos(angle) -
          5 * Math.cos(2 * angle) -
          2 * Math.cos(3 * angle) -
          Math.cos(4 * angle);

        heart.style.left = `${centerX}px`;
        heart.style.top = `${centerY}px`;

        heart.style.setProperty("--x", `${x * 4}px`);
        heart.style.setProperty("--y", `${-y * 4}px`);

        document.body.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 1000);
      }
    };

    window.addEventListener("mousemove", createHeart);
    window.addEventListener("click", explodeHeart);

    return () => {
      window.removeEventListener("mousemove", createHeart);
      window.removeEventListener("click", explodeHeart);
    };
  }, []);

  return null;
}
