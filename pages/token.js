import Hero from '../sections/Hero'
import Why from '../sections/Why'
import Roadmap from '../sections/Roadmap'
import Team from '../sections/Squad'
import Footer from '../sections/Footer'
import Tokenomics from '../sections/Tokenomics/tokenomics'
import Layout from '../components/Layout'
import { UserContextProvider } from '../hooks/authUser'
export default function Home() {
  return (
      <Layout>
        <UserContextProvider>
          <Hero variant={'token'} />
          <Tokenomics />
          <Why />
          <Roadmap />
          <Team />
          <Footer />
        </UserContextProvider>
      </Layout>
 
  )
}
