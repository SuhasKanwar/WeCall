import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Sphere } from "@react-three/drei"
import { Dot } from "lucide-react"
import type * as THREE from "three"
import type { JSX } from "react"

interface Feature {
  id: number
  name: string
  description: string
}

const features: Feature[] = [
  { id: 1, name: "Global Coverage", description: "Reach customers anywhere in the world" },
  { id: 2, name: "Real-time Analytics", description: "Monitor performance as it happens" },
  { id: 3, name: "Secure Infrastructure", description: "Enterprise-grade security built in" },
  { id: 4, name: "Scalable Solution", description: "Grows with your business needs" },
  { id: 5, name: "24/7 Support", description: "Help whenever you need it" },
]

interface EarthProps {
  position?: [number, number, number]
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

export default function GlobeWithFeatures(): JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[600px] p-6 gap-8">
      <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Earth position={[0, 0, 0]} />
          <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        </Canvas>

        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full border-4 border-dashed border-primary/30 rounded-full">
            {features.map((feature, index) => {
              const angle = (index / features.length) * 2 * Math.PI
              const top = 50 + 45 * Math.sin(angle)
              const left = 50 + 45 * Math.cos(angle)

              return (
                <div
                  key={feature.id}
                  className="absolute flex items-center justify-center w-8 h-8 -ml-4 -mt-4 bg-background rounded-full shadow-md border border-primary"
                  style={{ top: `${top}%`, left: `${left}%` }}
                >
                  <Dot className="w-6 h-6 text-primary" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl font-bold text-primary">Our Global Features</h2>
        <div className="space-y-4">
          {features.map((feature) => (
            <div key={feature.id} className="p-4 border border-border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{feature.name}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}