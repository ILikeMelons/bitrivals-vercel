
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Hero from '../sections/Hero'
import Why from '../sections/Why'
import Roadmap from '../sections/Roadmap'
import Team from '../sections/Squad'
import Footer from '../sections/Footer'
import Tokenomics from '../sections/Tokenomics/tokenomics'

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    setUser(supabase.auth.user());
  }, [])
  return (
      <main className='relative overflow-hidden bg-black-50'>
        <Hero user={user} variant={'token'} />
        <Tokenomics />
        <Why />
        <Roadmap />
        <Team />
        <Footer />
      </main>
 
  )
}
