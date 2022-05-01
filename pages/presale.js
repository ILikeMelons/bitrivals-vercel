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
import Navbarsale from "../components/Navbarsale"
import Web3connect from '../components/Modals/Web3connect';
import useLocalStorage from "../hooks/useLocalStorage";
import { networkParams } from "../networks";
import { checkAddress } from "../requests/presale";
import { connectors } from "../connectors";
import { Parallax } from 'react-parallax';
import { getUserBalanceBNB, getUserBalanceBUSD, sendBUSDtoWallet } from "../utils/web3";
import bitrivals from '../public/bitrivals_icon.svg' 
import Container from "../components/Container";
import Image from "next/dist/client/image";
import Web3 from "web3";
import { BigNumber } from "ethers";

const Presale = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const toggleLoading = () => setLoading(value => !value);
    
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
    const [blockUser, setBlockUser] = useState(false);
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

      const [tokens, setTokens] = useState({
        busd: 0,
        rival: 0
    })

    // --------------

    const tokenPrice = 0.00833;
    const contributed = 0; // Get from our sheet
    let maxContribution = 8000; // Get from whitelist sheet
    const whitelisted = true; // Get from whitelist sheet
    const devWallet = '0x976DAab65D56Bd171dB845F1850724BBEc6C288B'
    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

    // --------------

    maxContribution = maxContribution - contributed;
    const userBUSDmax = balance.toFixed(2);
    const maxBUSD = userBUSDmax > maxContribution ? maxContribution : userBUSDmax;
    const maxRival = maxBUSD * (1 / tokenPrice);
    
    const changeTokens = (e, token) => {
      let value = e.target.value
      if(token == 'BUSD') {
        if (value > maxBUSD || value > userBUSDmax) {
          value = maxBUSD
        }
        setTokens({...tokens, busd: value, rival: (value * (1 / tokenPrice).toFixed(2))});
      } else {
        if (value > maxRival) {
          value = maxRival
        }
        setTokens({...tokens, rival: value, busd: (value * tokenPrice).toFixed(2)});
      }
    }

    const maxTokens = () => {
      setTokens({...tokens, rival: (maxBUSD * (1 / tokenPrice).toFixed(2)), busd: maxBUSD});
    }

    const web3 = new Web3(Web3.givenProvider);
    const ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"assetProtectionRole","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"betaDelegateWhitelister","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposedOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"EIP712_DOMAIN_HASH","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supplyController","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"currentOwner","type":"address"},{"indexed":true,"name":"proposedOwner","type":"address"}],"name":"OwnershipTransferProposed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldProposedOwner","type":"address"}],"name":"OwnershipTransferDisregarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressFrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"AddressUnfrozen","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"}],"name":"FrozenAddressWiped","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldAssetProtectionRole","type":"address"},{"indexed":true,"name":"newAssetProtectionRole","type":"address"}],"name":"AssetProtectionRoleSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyIncreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"SupplyDecreased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldSupplyController","type":"address"},{"indexed":true,"name":"newSupplyController","type":"address"}],"name":"SupplyControllerSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"seq","type":"uint256"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"BetaDelegatedTransfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldWhitelister","type":"address"},{"indexed":true,"name":"newWhitelister","type":"address"}],"name":"BetaDelegateWhitelisterSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"newDelegate","type":"address"}],"name":"BetaDelegateWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"oldDelegate","type":"address"}],"name":"BetaDelegateUnwhitelisted","type":"event"},{"constant":false,"inputs":[],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"initializeDomainSeparator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proposedOwner","type":"address"}],"name":"proposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"disregardProposeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"reclaimBUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newAssetProtectionRole","type":"address"}],"name":"setAssetProtectionRole","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"freeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unfreeze","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"wipeFrozenAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isFrozen","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newSupplyController","type":"address"}],"name":"setSupplyController","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"increaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"decreaseSupply","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"address"}],"name":"nextSeqOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sig","type":"bytes"},{"name":"to","type":"address"},{"name":"value","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"seq","type":"uint256"},{"name":"deadline","type":"uint256"}],"name":"betaDelegatedTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"r","type":"bytes32[]"},{"name":"s","type":"bytes32[]"},{"name":"v","type":"uint8[]"},{"name":"to","type":"address[]"},{"name":"value","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"seq","type":"uint256[]"},{"name":"deadline","type":"uint256[]"}],"name":"betaDelegatedTransferBatch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"isWhitelistedBetaDelegate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newWhitelister","type":"address"}],"name":"setBetaDelegateWhitelister","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"whitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"unwhitelistBetaDelegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
    var ApprovalContract = new web3.eth.Contract(ABI, busdAddress); 
    const accounts = web3.eth.requestAccounts().then((user) => {
      return user;
    });
    
    const sendTokens = async () => {
      if(tokens.busd > 0) {
        const a = await accounts.then((wallet) => {
          toggleLoading()
          ApprovalContract.methods.transfer(devWallet, web3.utils.toWei(`${tokens.busd}`)).send({
            from: wallet[0], 
            chainId: 56
          }).on('error', function (error) {
            location.reload();
          }).on('confirmation', function (confirmationNumber, receipt) {
            toggleLoading();
            // Google sheets callback
          })
        });
      }
    }
    
    useEffect(() => {
      
      const provider = window.localStorage.getItem("provider");
        if(chainId !== undefined){
          setWrongChainMessage("")
          if(chainId !== 56){
            setWrongChainMessage(`Wrong network selected! ChainID:${chainId}`)
          }
        }
        if (provider){
           activate(connectors[provider]);
           console.log(account)
          if (account!==undefined) {
            getUserBalanceBUSD(account).then((bal)=> setBalance(bal)).catch(e=>console.log(e));
            checkAddress(account).then((response)=> {console.log(response)}).catch(e=> {
              if(e.msg){
                setBlockUser(true);
              }
            })
          }
        }else{
          disconnect();
        } 
      }, [account]);

    return(
        <Layout>
          <Navbarsale></Navbarsale>
          <div className="fixed top-0 z-10 w-full h-full pointer-events-none bg md:h-screen">
            <div className="bg_sector min-w-sm" quadrant="bottom-left" style={{backgroundImage: "url('/images/background/bottom_left.png')"}} />
            <div className="hidden bg_sector md:block" quadrant="bottom-right" style={{backgroundImage: "url('/images/background/bottom_right.png')"}} />
            <div className="bg_sector" quadrant="top-right" style={{backgroundImage: "url('/images/background/top_right.png')"}} />
            <div className="bg_sector" quadrant="top-left" style={{backgroundImage: "url('/images/background/top_left.png')"}} />
          </div>
          <div className="fixed z-30 w-full">
            <Container className="relative">
              {active
                ? <button onClick={disconnect} className='absolute px-8 pt-3 pb-3 text-sm font-semibold rounded-md bg-yellow text-black-50 top-3 right-6'>Disconnect</button>
                : <button onClick={onOpen} className="absolute px-8 pt-3 pb-3 text-sm font-semibold rounded-md bg-yellow text-black-50 top-3 right-6">Connect wallet</button>
              }
            </Container>
          </div>
          <Container className="relative z-20 flex flex-wrap min-h-screen py-20 font-sans font-semibold text-white pt-28 inner md:pt-0">
            <div className="relative items-center hidden w-full lg:w-1/2 lg:flex">
              <div className="relative flex items-center w-full h-full md:pt-32">
                <img src="/images/character.png" alt="" />
              </div>
            </div>
            <div className="flex items-center w-full pl-4 md:pb-8 md:pt-36 lg:w-1/2">
              <div className="w-full">
                <div className="md:w-2/3">
                  <h1 className="mb-3 text-5xl uppercase font-morgan">Private Sale Contribution</h1>
                  <p className="mb-8 text-yellow">Buy $RIVAL with BUSD</p>
                </div>
                <div className={`p-3 px-4 mb-8 text-xs leading-5 text-white rounded-md bg-pink ${whitelisted ? "hidden" : ""}`}>
                  Sorry. It looks as though your wallet has not been whitelisted. If you feel this is a mistake, please contact whoever issued you the whitelist spot or visit our <a className="underline" href="t.me/bitrivals">Telegram</a> for further support.
                </div>
                <div className={`${!whitelisted ? "opacity-40 pointer-events-none" : ""}`}>
                  <div className="flex flex-wrap items-center gap-5 mb-8 md:flex-nowrap">
                    <div className="relative w-full md:w-1/2">
                      <div className="absolute text-sm transform left-5" style={{top: '17px'}}>
                        <Image src="/images/busd.svg" width="24px" height="24px" alt="" />
                      </div>
                      <input defaultValue="0" value={tokens.busd} onChange={(e) => changeTokens(e, 'BUSD')} type="number" className="w-full p-2 py-4 pr-20 font-sans transition-all duration-300 border-2 rounded-md outline-none pl-14 bg-black-250 border-black-200 focus:border-yellow"></input>
                      <span className="absolute pt-4 pl-4 text-sm transform -translate-y-1/2 border-l-2 right-5 top-1/2 border-black-200">BUSD</span>
                      <span className="absolute text-xs rounded-sm cursor-pointer right-5 top-2.5 text-yellow" onClick={(e) => maxTokens()}>max</span>
                      <span className="absolute right-0 pt-1 text-xs rounded-sm top-16 text-yellow">Balance: <span>{(balance.toFixed(2)).toLocaleString()}</span></span>
                    </div>
                    <div className="flex justify-center w-full transform rotate-90 md:rotate-0 md:w-auto">
                      <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.01685 7.99997L12.8768 7.99997L9.24685 12.36C9.07711 12.5642 8.99545 12.8275 9.01983 13.0919C9.0442 13.3563 9.17263 13.6002 9.37685 13.77C9.58106 13.9397 9.84434 14.0214 10.1088 13.997C10.3732 13.9726 10.6171 13.8442 10.7868 13.64L15.7868 7.63997C15.8205 7.59224 15.8506 7.54211 15.8768 7.48997C15.8768 7.43997 15.8768 7.40997 15.9468 7.35997C15.9922 7.24531 16.0159 7.12326 16.0168 6.99997C16.0159 6.87668 15.9922 6.75463 15.9468 6.63997C15.9468 6.58997 15.9468 6.55997 15.8768 6.50997C15.8506 6.45783 15.8205 6.40769 15.7868 6.35997L10.7868 0.359969C10.6928 0.247086 10.5751 0.156306 10.442 0.0940843C10.3089 0.0318627 10.1638 -0.000270402 10.0168 -3.19958e-05C9.78319 -0.000488826 9.55676 0.0808863 9.37685 0.229967C9.27559 0.313917 9.19189 0.417018 9.13053 0.533366C9.06918 0.649713 9.03139 0.777019 9.01931 0.907996C9.00723 1.03897 9.02112 1.17104 9.06016 1.29665C9.09921 1.42225 9.16264 1.53892 9.24685 1.63997L12.8768 5.99997L1.01685 5.99997C0.75163 5.99997 0.497275 6.10532 0.309739 6.29286C0.122203 6.4804 0.0168463 6.73475 0.0168463 6.99997C0.0168463 7.26518 0.122202 7.51954 0.309739 7.70707C0.497275 7.89461 0.751629 7.99997 1.01685 7.99997Z" fill="#F9BA3F"/>
                      </svg>
                    </div>
                    <div className="relative w-full md:w-1/2">
                      <div className="absolute text-sm transform left-5" style={{top: '16px'}}>
                        <Image src="/images/rivalToken.svg" width="27px" height="27px" alt="" />
                      </div>
                      <input defaultValue="0" value={tokens.rival} onChange={(e) => changeTokens(e, 'RIVAL')} type="number" className="w-full p-2 py-4 pr-20 font-sans transition-all duration-300 border-2 rounded-md outline-none pl-14 bg-black-250 border-black-200 focus:border-yellow"></input>
                      <span className="absolute pt-4 pl-4 text-sm transform -translate-y-1/2 border-l-2 right-5 top-1/2 border-black-200">RIVAL</span>
                      <span className="absolute text-xs rounded-sm cursor-pointer right-5 top-2.5 text-yellow" onClick={(e) => maxTokens()}>max</span>
                      <span className="absolute right-0 pt-1 text-xs rounded-sm top-16 text-yellow">Balance: <span>{(contributed * (1 / tokenPrice).toFixed(2)).toLocaleString()}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-8 pb-8 mt-12 text-sm border-t-2 border-b-2 border-black-200">
                  <div className="flex justify-between w-full">
                      <span className="text-black-150">Remaining contribution</span>
                      <span>{maxContribution.toLocaleString()} BUSD</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-black-150">Outgoing token</span>
                      <span>{tokens.busd.toLocaleString()} BUSD</span>
                    </div>
                    <div className="flex justify-between w-full ">
                      <span className="text-black-150">Incoming token</span>
                      <span>{tokens.rival.toLocaleString()} RIVAL</span>
                    </div>
                    <div className="flex justify-between w-full">
                      <span className="text-black-150">Price per token</span>
                      <span className="text-yellow">${tokenPrice}</span>
                    </div>
                    <div className="flex justify-between w-full ">
                      <span className="text-black-150">Swap ratio</span>
                      <span className="text-yellow">1 BUSD = ~{Math.floor(1 / tokenPrice)} RIVAL</span>
                    </div>
                  </div>
                  
                    <div className={`text-xs w-full mt-8 text-blue rounded-md p-6 ${contributed != 0 ? "flex" : "hidden"}`} style={{background: '#1ebafa2b'}}>
                    {maxContribution != 0 
                      ? <span>You are the proud owner of {(contributed * (1 / tokenPrice).toFixed(2)).toLocaleString()} RIVAL. You may purchase up to {(maxContribution * (1 / tokenPrice).toFixed(2)).toLocaleString()} (${maxContribution.toLocaleString()}) more.</span>
                      : <span>You have reached the maximum RIVAL you may buy at this time. Thank you very much for conributing.</span>
                      }
                    </div> 
                  <p className="mt-8 mb-4 text-sm">By purchasing these tokens you agree to the vesting schedule as follows</p>
                  <ul className="flex flex-col gap-1.5 text-sm">
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
                    <input id="terms" type="checkbox" className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer bg-black-250 border-black-200" />
                    <label className="cursor-pointer" htmlFor="terms">I have read and agree to the terms and conditions</label>
                  </div>

                  {active
                    ? <button onClick={()=>{!blockUser ? sendTokens() : '' }} className={`px-8 pt-3 pb-3 mt-8 text-sm font-semibold rounded-md bg-yellow text-black-50 ${!whitelisted || maxContribution == 0 || loading ? "bg-black-200 text-white" : ""}`} disabled={`${!whitelisted || maxContribution == 0 || loading ? "disabled" : ""}`}>
                      {loading ? <div class="text-white pl-6"><div className="ldio-qhqvj17an8"><div/><div><div/></div></div>Reserving. Please wait</div>  : 'Reserve your tokens'}
                    </button>
                    : <button onClick={onOpen} className="px-8 pt-3 pb-3 mt-8 text-sm font-semibold rounded-md bg-yellow text-black-50">Connect wallet</button>
                  }
                </div>
              </div>
            </div>
            <Web3connect isOpen={isOpen} closeModal={onClose} />
          </Container>
        </Layout>
    );
}

export default Presale;