import { CoverText } from '../components/CoverText'
import Footer from '../components/Footer'
import GlobeFeatures from '../components/GlobeFeatures'
import HeroSection from '../components/HeroSection'
import InfiniteCarusel from '../components/InfiniteCarausel'
import NavBar from '../components/NavBar'
import Timeline from '../components/Timeline'

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <HeroSection badge="WeCall" title1="Seamless Calls" title2=" Instant Connections" logoUrl="/logo.svg" />
      <Timeline />
      <InfiniteCarusel />
      <GlobeFeatures />
      <CoverText />
      <Footer />
    </div>
  )
}