
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Hero from '../sections/Hero'
import What from '../sections/What'
import Why from '../sections/Why'
import Zones from '../sections/Zones'
import Roadmap from '../sections/Roadmap'
import Team from '../sections/Squad'
import Footer from '../sections/Footer'
import Tokenomics from '../sections/Tokenomics/tokenomics'
import Allocations from '../sections/Allocations/allocations'

const Presale= () =>  {
    const [user, setUser] = useState(null);
    useEffect(()=>{
      setUser(supabase.auth.user());
    }, [])
    return (
        <main className='relative overflow-hidden bg-black-50'>
           
          <Hero user={user}/>
          <What />
          <Zones />
          <Tokenomics />
          <Allocations />
          <Why />
          <Roadmap />
          <Team />
          <Footer />
        </main>
   
    )
  }

  export default Presale;