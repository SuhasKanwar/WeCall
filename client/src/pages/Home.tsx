import HeroSection from '../components/HeroSection'
import NavBar from '../components/NavBar'
import Timeline from '../components/TimeLine'

export default function Home() {
  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <HeroSection badge="WeCall" title1="Seamless Calls" title2=" Instant Connections" logoUrl="/logo.svg" />
      <Timeline />
    </div>
  )
}