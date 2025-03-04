import HeroSection from '../components/HeroSection'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <div>
      <NavBar />
      <HeroSection badge="WeCall" title1="Seamless Calls" title2=" Instant Connections" logoUrl="/logo.svg" />
    </div>
  )
}