import React from 'react'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as gtag from './../lib/gtag'

import { hotjar } from 'react-hotjar'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

useEffect(() => {
  const handleRouteChange = url => {
    gtag.pageview(url)
  }
  router.events.on('routeChangeComplete', handleRouteChange)
  return () => {
    router.events.off('routeChangeComplete', handleRouteChange)
  }
}, [router.events])

  useEffect(() => {
    hotjar.initialize(2706531, 6)
  }, [])
  return (
    <React.Fragment>
      <Head>
      {/*Global site tag (gtag.js) - Google Analytics --> */} 
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-5MJ3ME1WMT"></script>
      <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config',  'G-5MJ3ME1WMT', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
     

        <title>Bit Rivals | Crypto powered eSports tournaments</title>
        <meta name="Bit Rivals" content="Crypto powered eSports tournaments" />
        <meta property="og:title" content="Bit Rivals" />
        <meta property="og:url" content="https://www.bitrivals.gg" />
        <meta property="og:description" content="Bit Rivals is a tailor-made ecosystem, built for gamers and crypto enthusiasts. Get rewarded for playing your favourite games, compete in tournaments, form your team, connect with new players, mint your own NFTs, earn passive income, and more." />
        <meta property="og:image" content="/shareImage.png" />
        <meta property="twitter:image" content="/shareImageTwitter.png" />
        
        <link rel="icon" href="/favicon.png" />
      </Head>
      
      <Component {...pageProps} />
    </React.Fragment>
  )
}


export default MyApp
