import { useEffect } from 'react';
import { bitrivals} from '../../public'
import Script from 'next/script'

function initShare(code){
    const twitterBtn = document.querySelector(".twitter-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");
const messengerBtn = document.querySelector(".messenger-btn");
const mailBtn = document.querySelector(".mail-btn");
        const img = bitrivals.src;

        const postUrl = encodeURI("Bitrivals.gg/?invite="+code)
        const postTitle = encodeURI("Join BitRivals today! Register your rivalID to claim 10$ of $RIVAL tokens.")
        const postImg = encodeURI(img);
        
        twitterBtn.setAttribute("href", `https://twitter.com/share?url=${postUrl}&text=${postTitle}&hashtags=#BitRivals`);
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
        <>
        <Script src="https://kit.fontawesome.com/e7a9cfc5e0.js" crossorigin="anonymous" />
        <a href='#' className='border-2 border-pink border-opacity-10 px-8 py-2 rouded-xl twitter-btn' target="_blank">
          <i className='fab fa-twitter text-pink'></i>
        </a>
        <a href='#' className='border-2 border-pink border-opacity-10 px-8 py-2 rouded-xl whatsapp-btn' target="_blank">
          <i className='fab fa-whatsapp text-pink'></i>
        </a>
        <a href='#' className='border-2 border-pink border-opacity-10 px-8 py-2 rouded-xl messenger-btn' target="_blank">
          <i className='fab fa-facebook-messenger text-pink'></i>
        </a>
        <a href='#' className='border-2 border-pink border-opacity-10 px-8 py-2 rouded-xl mail-btn' target="_blank">
          <i className='fas fa-envelope text-pink h-auto'></i>
        </a>
        </>
    )
}

export default ShareButtons;