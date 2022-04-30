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
import Container from "../components/Container";
import Image from "next/dist/client/image";

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
            <Container className="relative h-screen font-semibold text-white inner">
              <div className="relative flex items-center w-1/2">
                <Image className="w-full" src="/images/character.png" layout="fill" alt="" />
              </div>
              <div className="flex items-center w-1/2">
                <div className="">
                  <div className="w-2/3">
                    <h1 className="mb-3 text-5xl uppercase font-morgan">Private Sale Contribution</h1>
                    <p className="mb-12 text-yellow">Buy $RIVAL with BUSD</p>
                  </div>
                  <div>
                    <input type="number" className="p-2 transition-all duration-300 border-2 rounded-md outline-none bg-black-50 border-black-100 focus:border-yellow"></input>
                  </div>
                  <div className="flex flex-col gap-2 pb-8 text-sm border-b-2 border-black-100">
                    <div className="flex justify-between w-full">
                      <span className="text-black-150">Outgoing token</span>
                      <span>0 BUSD</span>
                    </div>
                    <div className="flex justify-between w-full ">
                      <span className="text-black-150">Incoming token</span>
                      <span>0 RIVAL</span>
                    </div>
                    <div className="flex justify-between w-full ">
                      <span className="text-black-150">Swap ratio</span>
                      <span className="text-yellow">1 BUSD = 100 RIVAL</span>
                    </div>
                  </div>
                  <p className="my-8 text-sm">By purchasing these tokens you agree to the vesting schedule as follows</p>
                  <ul className="flex flex-col gap-1 text-sm">
                    <li className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 8.74998C13.75 11.25 11.865 13.604 9.22 14.13C7.92999 14.3869 6.59181 14.2303 5.396 13.6824C4.2002 13.1345 3.20772 12.2233 2.5599 11.0786C1.91207 9.93383 1.64192 8.61387 1.78791 7.30666C1.9339 5.99944 2.48859 4.77161 3.373 3.79798C5.187 1.79998 8.25 1.24998 10.75 2.24998" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.75 7.75L8.25 10.25L14.25 3.75" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      9 months total vesting
                    </li>
                    <li className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 8.74998C13.75 11.25 11.865 13.604 9.22 14.13C7.92999 14.3869 6.59181 14.2303 5.396 13.6824C4.2002 13.1345 3.20772 12.2233 2.5599 11.0786C1.91207 9.93383 1.64192 8.61387 1.78791 7.30666C1.9339 5.99944 2.48859 4.77161 3.373 3.79798C5.187 1.79998 8.25 1.24998 10.75 2.24998" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.75 7.75L8.25 10.25L14.25 3.75" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      10% TGE unlock
                    </li>
                    <li className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 8.74998C13.75 11.25 11.865 13.604 9.22 14.13C7.92999 14.3869 6.59181 14.2303 5.396 13.6824C4.2002 13.1345 3.20772 12.2233 2.5599 11.0786C1.91207 9.93383 1.64192 8.61387 1.78791 7.30666C1.9339 5.99944 2.48859 4.77161 3.373 3.79798C5.187 1.79998 8.25 1.24998 10.75 2.24998" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.75 7.75L8.25 10.25L14.25 3.75" stroke="#F9BA3F" strokeWidth="1.5" stroke-strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      10% monthly unlock
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 mt-8 text-sm">
                    <input type="checkbox" />I have read and agree to the terms and conditions
                  </div>
                  <button className="p-12 bg-yellow text-black-50">Reserve your tokens</button>
                </div>
              </div>
            </Container>
            <div className='hidden'>            
                <div className='flex justify-center p-2'>

                    {!active
                    ? 
                  
                    <button onClick={onOpen} className='px-4 py-1 text-white border-2 border-white rounded-lg hover:text-pink hover:border-pink'>
                        Connect Wallet
                    </button> : 
                      <div>
                       <button onClick={disconnect} className='px-4 py-1 text-white border-2 border-white rounded-lg hover:text-pink hover:border-pink'>
                    Disconnect
                </button>
                <p className="pt-2 text-white">Your address : {account && account}</p>
                <p className="pt-2 text-white">Your balance : {balance.toFixed(2)} BUSD</p>
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