import { useEffect, useState } from "react"
import { useTheme } from "../context/ThemeProvider"

export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: theme === "light"
          ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgb(233, 245, 216, 0.15), transparent 80%)`
          : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
      }}
    />
  )
}