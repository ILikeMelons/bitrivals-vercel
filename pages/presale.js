import { useEffect, useState } from "react";

import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import Layout from '../components/Layout'
import Navbar from "../components/Navbar"
import Web3connect from '../components/Modals/Web3connect';
import useLocalStorage from "../hooks/useLocalStorage";
import { networkParams } from "../networks";
import { connectors } from "../connectors";
import { Parallax } from 'react-parallax';
import { getUserBalanceBNB, getUserBalanceBUSD } from "../utils/web3";
import bitrivals from '../public/bitrivals_icon.svg' 


const Presale = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        library,
        chainId,
        account,
        activate,
        deactivate,
        active
      } = useWeb3React();

    const [signature, setSignature] = useState("");
    const [error, setError] = useState("");
    const [network, setNetwork] = useState(undefined);
    const [message, setMessage] = useState("");
    const [signedMessage, setSignedMessage] = useState("");
    const [verified, setVerified] = useState();
    const [wrongChainMessage, setWrongChainMessage] = useState("");
    const [balance, setBalance] = useState(0);

    const refreshState = () => {
        window.localStorage.setItem("provider", undefined);
        setNetwork("");
        setWrongChainMessage("");
        setMessage("");
        setSignature("");
        setVerified(undefined);
      };
    
      const disconnect = () => {
        refreshState();
        deactivate();
      };

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        console.log(provider);
        console.log(chainId);
        console.log(account);
        if(chainId !== undefined){
          setWrongChainMessage("")
          if(chainId !== 56){
            setWrongChainMessage(`Wrong network selected! ChainID:${chainId}`)
          }
        }
        if (provider){
           activate(connectors[provider]);
          if (account!==undefined) {
            getUserBalanceBUSD(account).then((bal)=> setBalance(bal)).catch(e=>console.log(e))
           
          }
        }else{
          disconnect();
        } 
       
        
      }, [account]);

      
    return(
        <Layout>
            {/* <div className="pt-10 ml-32 flex overflow-y-hidden">
             <Image src={bitrivals.src} width={150} height={24} alt='logo'/>

            </div> */}
            <div className='w-full relative h-screen bg-brand flex justify-center items-center'>
            
                <div className='p-2 flex justify-center'>
                  
                {console.log(account)}
                    {/*<h1 className='text-pink font-morgan text-30px'>PRESALE COMING SOON!</h1> */}
                    {!active
                    ? 
                  
                    <button onClick={onOpen} className='text-white border-white border-2 px-4 py-1 rounded-lg hover:text-pink hover:border-pink'>
                        Connect Wallet
                    </button> : 
                      <div>
                       <button onClick={disconnect} className='text-white border-white border-2 px-4 py-1 rounded-lg hover:text-pink hover:border-pink'>
                    Disconnect
                </button>
                <p className="text-white pt-2">Your address : {account && account}</p>
                <p className="text-white pt-2">Your balance : {balance.toFixed(2)} BUSD</p>
                <p className="text-pink">{wrongChainMessage}</p>
                      </div>
                   
                    }
                    <Web3connect isOpen={isOpen} closeModal={onClose} />
                    <div>

                    </div>
                </div>
               
            </div>
           
        </Layout>
    );
}

export default Presale;