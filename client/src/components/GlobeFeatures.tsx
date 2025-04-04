import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Sphere, Text } from "@react-three/drei"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import type * as THREE from "three"
import type { JSX } from "react"

interface Feature {
  id: number
  name: string
  description: string
  icon: JSX.Element
}

const features: Feature[] = [
  {
    id: 1,
    name: "P2P Connection",
    description: "Direct peer-to-peer connectivity minimizes server load and reduces latency for smoother conversations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 17H7A5 5 0 0 1 7 7h2" />
        <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
        <line x1="8" x2="16" y1="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Adaptive Streaming",
    description: "Our technology automatically adjusts video quality based on network conditions for uninterrupted calls.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Encrypted Media",
    description: "All audio and video streams are secured with DTLS/SRTP encryption to protect your conversations.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 4,
    name: "NAT Traversal",
    description: "Our STUN/TURN infrastructure ensures connections can be established even through firewalls and routers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Multi-Device Support",
    description: "Seamlessly switch between devices during a call without dropping your connection or losing quality.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
]

interface EarthProps {
  position?: [number, number, number]
  activeFeature: number | null
}

function Earth({ position = [0, 0, 0] }: EarthProps): JSX.Element {
  const earthRef = useRef<THREE.Mesh>(null)
  const texture = useTexture("/earth-texture.jpg")

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]} position={position}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

interface FeaturePointProps {
  position: [number, number, number]
  isActive: boolean
  label: string
}

function FeaturePoint({ position, isActive, label }: FeaturePointProps): JSX.Element {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z += 0.01
    }
  })

  return (
    <group position={position}>
      <Sphere args={[0.08, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={isActive ? "#10b981" : "#6366f1"}
          emissive={isActive ? "#10b981" : "#6366f1"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere args={[0.12, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color={isActive ? "#10b981" : "#6366f1"} transparent opacity={0.2} />
      </Sphere>
      {isActive && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {label}
        </Text>
      )}
    </group>
  )
}

export default function GlobeWithFeatures(): JSX.Element {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const featurePositions = features.map((_, index) => {
    const angle = (index / features.length) * 2 * Math.PI
    const radius = 2.5
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle) * 0.5
    const z = radius * Math.sin(angle) * 0.8
    return [x, y, z] as [number, number, number]
  })

  return (
    <div className="relative w-full min-h-[700px] overflow-hidden">
      <div className="absolute inset-0" />

      <div className="container mx-auto px-4 py-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Global Solutions Platform
        </motion.h1>

        <div className="flex flex-col lg:flex-row w-full gap-8 items-center">
          <div className="relative w-full lg:w-1/2 h-[500px]">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
              <Earth position={[0, 0, 0]} activeFeature={activeFeature} />

              {featurePositions.map((position, index) => (
                <FeaturePoint
                  key={features[index].id}
                  position={position}
                  isActive={activeFeature === features[index].id}
                  label={features[index].name}
                />
              ))}

              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-5 rounded-xl transition-all duration-300 ${
                    activeFeature === feature.id
                      ? "bg-primary/10 border-l-4 border-primary shadow-lg"
                      : "bg-card border border-border hover:border-primary/30 hover:shadow-md"
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        activeFeature === feature.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        {feature.name}
                        {activeFeature === feature.id && (
                          <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                        )}
                      </h3>
                      <p className="text-muted-foreground mt-2">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}