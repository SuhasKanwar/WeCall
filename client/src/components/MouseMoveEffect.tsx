import { useEffect, useState } from "react";

export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }}
    />
  );
}

// export function CustomCursor() {
//   const [position, setPosition] = useState({ x: 0, y: 0 })
//   const [clicked, setClicked] = useState(false)

//   useEffect(() => {
//     const updatePosition = (e: MouseEvent) => {
//       setPosition({ x: e.clientX, y: e.clientY })
//     }

//     const handleClick = () => {
//       setClicked(true)
//       setTimeout(() => setClicked(false), 300)
//     }

//     window.addEventListener("mousemove", updatePosition)
//     window.addEventListener("click", handleClick)

//     return () => {
//       window.removeEventListener("mousemove", updatePosition)
//       window.removeEventListener("click", handleClick)
//     }
//   }, [])

//   return (
//     <div
//       className={`custom-cursor ${clicked ? "cursor-click" : ""}`}
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//       }}
//     />
//   )
// }