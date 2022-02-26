import React from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from './../lib/gtag'
import { hotjar } from 'react-hotjar'
import { useEffect, useState } from 'react'
import Preloader from '../components/Preloader'
import { UserContextProvider } from '../hooks/authUser'
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState('');
  const toggleHidden = (loading) => {
  if(!loading){
    setTimeout(()=>{setHidden(" hidden ")}, 1200)
  }
  }
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    
    setTimeout(() => {setLoading(false); toggleHidden(false)}, 1200);
    router.events.on('routeChangeComplete', handleRouteChange)


    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    hotjar.initialize(2706531, 6)
  }, [])
  return (
    <>
      <Head>
        <title>Bit Rivals | Play games, earn crypto, win rewards</title>
        <meta name="Bit Rivals" content="The ultimate crypto powered platform for gamers" />
        <meta property="og:title" content="Bit Rivals" />
        <meta property="og:url" content="https://www.bitrivals.gg" />
        <meta property="og:description" content="Bit Rivals is a tailor-made ecosystem, built for gamers and crypto enthusiasts. Get rewarded for playing your favourite games, compete in tournaments, form your team, connect with new players, mint your own NFTs, earn passive income, and more." />
        <meta property="og:image" content="/shareImage.png" />
        <meta property="twitter:image" content="/shareImageTwitter.png" />        
        <link rel="icon" href="/favicon.png" />
        <Script  strategy='lazyOnload' src="https://unpkg.com/axios/dist/axios.min.js"></Script>

      </Head>
      <Script 
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />
      <Script src="https://kit.fontawesome.com/e7a9cfc5e0.js" crossOrigin="anonymous" />
      <Script 
      id='datalayerScript'
      strategy='lazyOnload'
      >
        {
           `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config',  '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
             page_path: window.location.pathname,
           });
         `
        }
      </Script>
      <UserContextProvider>
          <div className={loading ? "invisible" : "visible"}>
            <Component {...pageProps}  /> 
          </div>
      </UserContextProvider>
          <Preloader className={"transition-opacity duration-1000 ease-out  " + (loading ? " opacity-100 " : " opacity-0 ") + hidden}/> 
          
          
     
         
          
     
   
    </>
  )
}


export default MyApp
