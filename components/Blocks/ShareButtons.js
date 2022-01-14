import { useEffect } from 'react';
import { bitrivals} from '../../public'
import Script from 'next/script'

function initShare(code){
  const twitterBtn = document.querySelector(".twitter-btn");
  const whatsappBtn = document.querySelector(".whatsapp-btn");
  const messengerBtn = document.querySelector(".messenger-btn");
  const mailBtn = document.querySelector(".mail-btn");
  const img = bitrivals.src;

  const postUrl = encodeURI("www.bitrivals.gg/?invite=" + code)
  const postTitle = encodeURI("Register your Rival ID today and claim 100 $RIVAL tokens before the presale!")
  const postImg = encodeURI(img);
  
  twitterBtn.setAttribute("href", `https://twitter.com/share?url=${postUrl}&text=${postTitle}&hashtags=BitRivals,fortheplayers`);
  whatsappBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`)
  // only works for mobile       
  // messengerBtn.setAttribute("href", `fb-messenger://share/?link=${postUrl}`);
  messengerBtn.setAttribute("href", `http://www.facebook.com/sharer.php?u=${postUrl}`)
  mailBtn.setAttribute("href", `mailto:?Subject=${postTitle}&body=${postUrl}`)
}

const ShareButtons = ({shareCode}) => {
  useEffect(()=> {
    initShare(shareCode);
  })
     
  return (
    <div className='grid grid-cols-1 sm:grid-cols-4 w-full gap-y-2 sm:gap-x-2'>
      <a href='#' className='flex justify-center  py-4 border-2 border-pink border-opacity-10 rouded-xl twitter-btn' target="_blank">
        <i className='fab fa-twitter text-pink'></i>
      </a>
      <a href='#' className='flex justify-center  py-4 border-2 border-pink border-opacity-10 rouded-xl whatsapp-btn' target="_blank">
        <i className='fab fa-whatsapp text-pink'></i>
      </a>
      <a href='#' className='flex justify-center  py-4 border-2 border-pink border-opacity-10 rouded-xl messenger-btn' target="_blank">
        <i className='fab fa-facebook text-pink'></i>
      </a>
      <a href='#' className='flex justify-center  py-4  border-2 border-pink border-opacity-10 rouded-xl mail-btn' target="_blank">
        <i className='h-auto fas fa-envelope text-pink'></i>
      </a>
    </div>
  )
}

export default ShareButtons;