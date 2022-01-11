import { UserContextProvider } from '../hooks/authUser'
import Hero from '../sections/Hero'
import What from '../sections/What'
import Why from '../sections/Why'
import Zones from '../sections/Zones'
import Roadmap from '../sections/Roadmap'
import Team from '../sections/Squad'
import Footer from '../sections/Footer'
import Tokenomics from '../sections/Tokenomics/tokenomics'
import Allocations from '../sections/Allocations/allocations'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <UserContextProvider>
         <Hero />
         <What />
         <Zones />
         <Tokenomics />
         <Allocations />
         <Why />
         <Roadmap />
         <Team />
         <Footer />
      </UserContextProvider>
    </Layout>
  )
}