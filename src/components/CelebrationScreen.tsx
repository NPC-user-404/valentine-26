// import { useEffect, useState } from "react";
// import confetti from "canvas-confetti";

// const CelebrationScreen = () => {
//   useEffect(() => {
//     // Heart-shaped confetti burst
//     const duration = 5000;
//     const end = Date.now() + duration;

//     const colors = ["#ff6b8a", "#ff4d6d", "#ff85a2", "#fff0f3", "#c9184a"];

//     const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//       useEffect(() => {
//         const handleMouseMove = (e) => {
//           setMousePos({
//           x: e.clientX,
//           y: e.clientY,
//         });
//     };

//   window.addEventListener("mousemove", handleMouseMove);
//   return () => window.removeEventListener("mousemove", handleMouseMove);
// }, []);

//     const frame = () => {
//       confetti({
//         particleCount: 5,
//         angle: 60,
//         spread: 55,
//         origin: { x: 0, y: 0.8 },
//         colors,
//         shapes: ["circle"],
//         scalar: 1.2,
//       });
//       confetti({
//         particleCount: 5,
//         angle: 120,
//         spread: 55,
//         origin: { x: 1, y: 0.8 },
//         colors,
//         shapes: ["circle"],
//         scalar: 1.2,
//       });

//       if (Date.now() < end) {
//         requestAnimationFrame(frame);
//       }
//     };

//     // Initial big burst
//     confetti({
//       particleCount: 150,
//       spread: 100,
//       origin: { y: 0.6 },
//       colors,
//       scalar: 1.5,
//     });

//     frame();
//   }, []);

//   return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-valentine-blush via-valentine-rose/30 to-valentine-pink/20">
//         <div className="text-center px-8 animate-scale-in">
//           <div className="text-8xl mb-6 animate-celebration-bounce">💕</div>

//           <h1 className="font-script text-5xl md:text-7xl text-valentine-deep mb-6">
//            Yay! ❤️
//           </h1>

//           <p className="font-script text-2xl md:text-3xl text-valentine-deep/80 max-w-md mx-auto leading-relaxed">
//           I knew you'd say yes!!!
//           <br/>
//           <span className="block mt-4 text-4xl">
//             My Love. My Mupkin... 💕
//           </span>
//           </p>

//           <div className="mt-8 text-4xl">💖✨💕✨💖</div>   
//         </div>
//       </div>
//   );
// };

// export default CelebrationScreen;


import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";

const CelebrationScreen = () => {
  // ✅ 1. Track mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ 2. Confetti effect (your original logic, unchanged)
  useEffect(() => {
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#ff6b8a", "#ff4d6d", "#ff85a2", "#fff0f3", "#c9184a"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors,
        shapes: ["circle"],
        scalar: 1.2,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors,
        shapes: ["circle"],
        scalar: 1.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      scalar: 1.5,
    });

    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-valentine-blush via-valentine-rose/30 to-valentine-pink/20">
      <FloatingHearts />

      {/* 💖 Cursor-following heart */}
      <div
        className="pointer-events-none fixed z-[9999] text-4xl transition-transform duration-100"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        💖
      </div>

      <div className="text-center px-8 animate-scale-in">
        <div className="text-8xl mb-6 animate-celebration-bounce">💕</div>

        <h1 className="font-script text-5xl md:text-7xl text-valentine-deep mb-6">
          Yay! ❤️
        </h1>

        <p className="font-script text-2xl md:text-3xl text-valentine-deep/80 max-w-md mx-auto leading-relaxed">
          I knew you'd say yes!!!
          <br />
          <span className="block mt-4 text-4xl">
            My Love. My Mupkin... 💕
          </span>
        </p>

        <div className="mt-8 text-4xl">💖✨💕✨💖</div>
      </div>
    </div>
  );
};

export default CelebrationScreen;
