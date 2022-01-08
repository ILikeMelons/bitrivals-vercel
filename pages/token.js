
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Hero from '../sections/Hero'
import Why from '../sections/Why'
import Roadmap from '../sections/Roadmap'
import Team from '../sections/Squad'
import Footer from '../sections/Footer'
import Tokenomics from '../sections/Tokenomics/tokenomics'
import { UserContextProvider } from '../hooks/authUser'
export default function Home() {
  return (
      <main className='relative overflow-hidden bg-black-50'>
        <UserContextProvider>
        <Hero variant={'token'} />
        <Tokenomics />
        <Why />
        <Roadmap />
        <Team />
        <Footer />
        </UserContextProvider>
      </main>
 
  )
}
