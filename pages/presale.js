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
import { checkAddress, addAmount } from "../requests/presale";
import { connectors } from "../connectors";
import { Parallax } from 'react-parallax';
import { getUserBalanceBNB, getUserBalanceBUSD, sendBUSDtoWallet } from "../utils/web3";
import bitrivals from '../public/bitrivals_icon.svg' 
import Container from "../components/Container";
import Image from "next/dist/client/image";
import Web3 from "web3";
import ReactModal from 'react-modal';

const Presale = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const toggleLoading = () => setLoading(value => !value);

    const [terms, setTerms] = useState(false);
    const toggleTerms = () => setTerms(value => !value);

    const [validation, setValidation] = useState(false);
    const showValidation = (v) => setValidation(value => v);

    const [modalState, setModal] = useState(false);
    const toggleModal = () => setModal(value => !value);
    
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
    const [contributionTotal, setContributionTotal] = useState(0);
    const [numberConfirmation, setnumberConfirmation] = useState(0);
    const [maxContribution, setMaxContribution] = useState(0);
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
    const devWallet = '0x976DAab65D56Bd171dB845F1850724BBEc6C288B'
    const busdAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

    // --------------

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
      alert('we got the account')
      return user;
    });
    
    const sendTokens = async () => {
      if(terms) {
        if(tokens.busd > 0) {
          showValidation(false);
          alert('here')
          alert(accounts)
          const a = await accounts.then((wallet) => {
            
            toggleLoading()
            ApprovalContract.methods.transfer(devWallet, web3.utils.toWei(`${tokens.busd}`)).send({
              from: wallet[0], 
              chainId: 56
            }).on('error', function (error) {
              location.reload();
            }).on('confirmation', function (confirmationNumber, receipt) {
              setnumberConfirmation(confirmationNumber);
              if(confirmationNumber===1){
                const ammountReallySent = receipt.events.Transfer.returnValues.value/1e18;
                // add amount to google sheets
                addAmount(account,ammountReallySent).then((response)=>{
                  setContributionTotal(response.ammount);
                }).catch((e)=>{
                
                })
              }
              if(confirmationNumber===6){
                toggleLoading();
              }
            })
          });
        }
      } else {
        showValidation(true);
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
          if (account!==undefined) {
            getUserBalanceBUSD(account).then((bal)=> setBalance(bal))
            checkAddress(account).then((response)=> {
               if(!response.bool){ setBlockUser(true);}
              setContributionTotal(response.ammountSpent);
              setMaxContribution(response.maxContribution);
            }).catch(e=> {
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
                ? <button onClick={disconnect} className='absolute px-8 pt-3 pb-3 text-sm font-semibold rounded-md bg-yellow text-black-50 top-5 right-6'>Disconnect</button>
                : <button onClick={onOpen} className="absolute px-8 pt-3 pb-3 text-sm font-semibold rounded-md bg-yellow text-black-50 top-5 right-6">Connect wallet</button>
              }
            </Container>
          </div>
          <Container className="relative z-20 flex flex-wrap min-h-screen py-20 font-sans font-semibold text-white pt-28 inner md:pt-0">
            
            <div className="relative items-center hidden w-full lg:w-1/2 lg:flex">
              <div className="relative flex items-center w-full h-full md:pt-32">
                <img src="/images/character.png" alt="" />
              </div>
            </div>
            <div className="flex items-center w-full md:pl-4 md:pb-8 md:pt-36 lg:w-1/2">
            <ReactModal isOpen={modalState} style={{
                overlay: {
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgb(10 14 24 / 70%)'
                },
                content: {
                  position: 'absolute',
                  maxWidth: '800px',
                  color: 'white',
                  margin: 'auto',
                  top: '80px',
                  left: '24px',
                  right: '24px',
                  bottom: '80px',
                  border:'0',
                  background: 'rgb(20 28 45)',
                  overflow: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  borderRadius: '8px',
                  outline: 'none',
                  padding: '26px'
                }
              }}>
              <div onClick={()=>{toggleModal()}} className="sticky z-10 flex items-start justify-end w-12 h-12 p-2 text-right text-black rounded-full cursor-pointer bg-black-50 top-2 right-2 left-full">
                <svg width="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0V0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18V18Z" fill="#f9ba2d"/>
                  <path d="M12.7099 7.29C12.617 7.19627 12.5064 7.12188 12.3845 7.07111C12.2627 7.02034 12.132 6.9942 11.9999 6.9942C11.8679 6.9942 11.7372 7.02034 11.6154 7.07111C11.4935 7.12188 11.3829 7.19627 11.2899 7.29L9.99994 8.59L8.70994 7.29C8.52164 7.1017 8.26624 6.99591 7.99994 6.99591C7.73364 6.99591 7.47824 7.1017 7.28994 7.29C7.10164 7.4783 6.99585 7.7337 6.99585 8C6.99585 8.2663 7.10164 8.5217 7.28994 8.71L8.58994 10L7.28994 11.29C7.19621 11.383 7.12182 11.4936 7.07105 11.6154C7.02028 11.7373 6.99414 11.868 6.99414 12C6.99414 12.132 7.02028 12.2627 7.07105 12.3846C7.12182 12.5064 7.19621 12.617 7.28994 12.71C7.3829 12.8037 7.4935 12.8781 7.61536 12.9289C7.73722 12.9797 7.86793 13.0058 7.99994 13.0058C8.13195 13.0058 8.26266 12.9797 8.38452 12.9289C8.50638 12.8781 8.61698 12.8037 8.70994 12.71L9.99994 11.41L11.2899 12.71C11.3829 12.8037 11.4935 12.8781 11.6154 12.9289C11.7372 12.9797 11.8679 13.0058 11.9999 13.0058C12.132 13.0058 12.2627 12.9797 12.3845 12.9289C12.5064 12.8781 12.617 12.8037 12.7099 12.71C12.8037 12.617 12.8781 12.5064 12.9288 12.3846C12.9796 12.2627 13.0057 12.132 13.0057 12C13.0057 11.868 12.9796 11.7373 12.9288 11.6154C12.8781 11.4936 12.8037 11.383 12.7099 11.29L11.4099 10L12.7099 8.71C12.8037 8.61704 12.8781 8.50644 12.9288 8.38458C12.9796 8.26272 13.0057 8.13201 13.0057 8C13.0057 7.86799 12.9796 7.73728 12.9288 7.61542C12.8781 7.49356 12.8037 7.38296 12.7099 7.29V7.29Z" fill="#f9ba2d"/>
                </svg>
              </div>
              
              <div className="relative font-sans text-xs leading-5 md:text-sm">
                <h2 className="text-2xl font-morgan">PLATFORM TERMS OF USE</h2>
                <p className="mb-2 text-yellow">BIT RIVALS LLC (BR) is a company registered in Saint Vincent and the Grenadines under company number l293 LLC 2021, with its principal place of business at Suite 305, Griffith Corporate Centre, Beachmont, Kingstown, Saint Vincent and the Grenadines. BR operates the website: www.bitrivals.gg (the &quot;Platform&quot;).</p> 
                <p className="mt-6 mb-2 text-base text-yellow">1. Understanding these terms of use</p>
                <p className="mb-2">1.1 These terms of use (these &quot;Terms&quot;) describe how you may access and use the Platform.</p>
                <p className="mb-2">1.2 When certain words and phrases are used in these Terms, they have specific meanings (these are known as &quot;defined terms&quot;). You can identify these defined terms because they start with capital letters (even if they are not at the start of a sentence). Where a defined term is used, it has the meaning given to it in the section of these Terms where it was defined (you can find these meanings by looking at the sentence where the defined term is included in brackets and speech marks).</p>
                <p className="mb-2">1.3 In these Terms, when we refer to &quot;we&quot;, &quot;us&quot; or &quot;our&quot;, we mean BR; and when we refer to &quot;you&quot; or &quot;your&quot; we mean either:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.3.1 if you are a consumer, the individual using the Platform for a purpose that is wholly or mainly outside of their trade, business, craft or profession; and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.3.2 if you are not a consumer (for example if you are a professional esports player, gaming club, or sponsored streamer):</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>(a) the business that you have the authority to bind; or</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>(b) the individual using the Platform for purposes that are not wholly or mainly outside of their trade, business, craft or profession (in each case a &quot;Business&quot;).</p>
                <p className="mb-2">1.4 Please note, however, that certain functions made available on the Platform are governed by additional terms and conditions, including:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.4.1 your participation in esports tournaments and our rewards platform (&quot;Competitions&quot;), which are governed by our Global Rules (which apply to all Competitions) and any Competition-specific regulations (which can be found in the area of the Platform dedicated to the relevant Competition); and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.4.2 the allocation, use and withdrawal of utility tokens (including Rival Tokens [RIVAL]), which may (among other things) require that you have completed &quot;know your customer&quot; verification procedures, and we may, from time to time, introduce additional features and/or services, and will notify you of any applicable terms and conditions of use of the same.</p>
                <p className="mb-2">1.5 In addition to Clause 1.4 above, please note that:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.5.1 the Platform uses cookies, the use of which are governed by our cookies policy (available here); and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>1.5.2 we only use your personal information in accordance with our privacy notice (available here).</p>
                <p className="mt-6 mb-2 text-base text-yellow">2. The Platform</p>
                <p className="mb-2">2.1 The Platform is made available free of charge. We do not guarantee that the Platform, or any content on it, will always be available or be uninterrupted. Access to the Platform is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of the Platform without notice. We will not be liable to you if for any reason the Platform is unavailable at any time or for any period. We may update the Platform and/or change the content on it at any time.</p>
                <p className="mb-2">2.2 You are responsible for making all arrangements necessary for you to have access to the Platform. You are also responsible for ensuring that all persons who access the Platform through your internet connection are</p>
                <p className="mb-2">2.3 The Platform and the content on it are provided for general information purposes only. They are not intended to amount to advice on which you should rely.</p>         
                <p className="mb-2">2.4 Unless you are a Business competing in a Competition (pursuant to the Competition Rules) or as otherwise expressly authorised by us, you may only use the Platform for your own domestic, private and non-commercial use.</p>
                <p className="mt-6 mb-2 text-base text-yellow">3. Your account and password</p>
                <p className="mb-2">3.1 You will need to register an account with us on the Platform in order to access certain services available on the Platform (&quot;Account&quot;). If you register an Account, you will be asked to provide certain information (such as your email address) and to create a password, as part of our security procedures. You must treat such the password as confidential and you must not disclose it to any third party.</p>
                <p className="mb-2">3.2 We have the right to disable any Accounts and/or passwords, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these Terms.</p>
                <p className="mb-2">3.3 If you know or suspect that anyone other than you knows your Account login details, you must immediately notify us at hello@bitrivals.gg  </p>
                <p className="mb-2">3.4 You are responsible for any unauthorised use of your Account login details.</p>
                <p className="mt-6 mb-2 text-base text-yellow">4. Acceptable use</p>
                <p className="mb-2">General</p>
                <p className="mb-2">4.1 You agree not to:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.1.1 use the Platform in any way that breaches these Terms or any applicable local, national or international law or regulation;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.1.2 copy, or otherwise reproduce or re-sell any part of the Platform unless expressly permitted to do so in these Terms; or</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.1.3 do any act or thing that might damage, disrupt or otherwise interfere with the operation of the Platform or any equipment, network or software used in operating the Platform.</p>
                <p className="mb-2">User Generated Content</p>
                <p className="mb-2">4.2 If it is the case that you supply/upload any content to the Platform – whether it be pictures, text, sound recordings or whatever – the content you supply (&quot;User Generated Content&quot;) must comply with the following rules:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.1 it must not be obscene, abusive, offensive or racist and it must not promote or propose hatred or physical harm against anyone;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.2 it must not harass or bully another person;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.3 it must be true and honest so far as you know;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.4 it must not be defamatory of anyone;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.5 it must not use the material or content or infringe the rights or privacy of anyone else; for example you should not use images of well-known characters, footage or music (unless it is your own);</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.6 it must not contain someone else’s personal details or confidential information relating to other people; and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.2.7 it must not promote or condone terrorism, violence or illegal behaviour.</p>
                <p className="mb-2">4.3 We reserve the right to refuse to accept or refuse or cease to use any User Generated Content supplied by any person that we think contravenes these rules.</p>
                <p className="mb-2">4.4 You grant as a perpetual, worldwide, royalty-free, transferable and sub-licensable right and licence to use for any purpose any User Generated Content that you upload to the Platform.</p>
                <p className="mb-2">4.5 In addition, we may from time to time provide interactive services on the Platform that shall enable you to upload User Generated Content, including, without limitation:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.5.1 comment facilities;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.5.2 chat rooms; and/or</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>4.5.3 bulletin boards, (together &quot;Interactive Services&quot;).</p>
                <p className="mb-2">4.6 Where we provide an Interactive Service, we will use reasonable endeavours to provide information to you about the kind of service offered and if it is moderated. However, we are under no obligation to oversee, monitor or moderate any Interactive Service we provide.</p>
                <p className="mb-2">4.7 The use of any of our Interactive Services by a minor is subject to the consent of their parent or guardian. We advise parents who permit their children to use an Interactive Service that it is important that they communicate with their children about their safety online. Minors who are using any Interactive Service should be made aware of the potential risks to them.</p>   
                <p className="mb-2">Bugs/Viruses</p>
                <p className="mb-2">4.8 We do not guarantee that the Platform will be totally secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programmes and platform in order to access the Platform and we recommend that you use your own virus protection software.</p>
                <p className="mb-2">4.9 You must not misuse the Platform by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to the Platform, the server on which the Platform is stored or any server, computer or database connected to the Platform. You must not attack the Platform via a denial-of-service attack or a distributed denial-of service attack. By breaching this provision, you would commit a criminal offence under the Computer Misuse Act 1990. We will report any such breach to the relevant law enforcement authorities and we will co-operate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Platform will cease immediately and your right to trade or utilize the utility token [RIVAL] may be revoked.</p>
                <p className="mt-6 mb-2 text-base text-yellow">5. Intellectual property</p>
                <p className="mb-2">5.1 We are (as between you and us) the owner or licensee of all intellectual property rights in the Platform and its content. Those works are protected by intellectual property laws and treaties around the world. All such rights are reserved.</p>
                <p className="mb-2">5.2 You are not granted any right to use, and may not use, any of our intellectual property rights other than as set out in these Terms. You must not use the Platform (or any part of it or its content) for commercial purposes unless you are a Business competing in a Competition (and then only to the extent permitted by the Competition Rules) or as otherwise expressly authorised by us; however, you may download material from the Platform solely for noncommercial, personal use by you.</p>
                <p className="mb-2">5.3 No part of the Platform, including, without limitation, the text, designs, graphics, photographs and images contained in it, may be copied, reproduced, republished, uploaded, re-posted, modified, transmitted or distributed or otherwise used in any way for any non-personal, public or commercial purpose without our prior written consent.</p>
                <p className="mb-2">5.4 Any communications or materials you send to us through the Platform by electronic mail or other means will be treated as non-proprietary and non-confidential (other than communications in respect of your order if you use the Platform to buy products from us). We are free to publish, display, post, distribute and otherwise use any ideas, suggestions, concepts, designs, know-how and other information contained in such communications or material for 5 any purpose, including, but not limited to, developing, manufacturing, advertising and marketing us and our products.</p>
                <p className="mt-6 mb-2 text-base text-yellow">6. Our liability</p>
                <p className="mb-2">6.1 Nothing in these Terms excludes or limits our liability for:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.1.1 death or personal injury caused by our negligence;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.1.2 fraud or fraudulent misrepresentation; and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.1.3 any matter in respect of which it would be unlawful for us to exclude or restrict our liability.</p>
                <p className="mb-2">6.2 If you are a consumer:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.2.1 nothing in these Terms affects your statutory rights. Advice about your statutory rights is available from your local Citizens&quot; Advice Bureau or Trading Standards Office; and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.2.2 we only supply the Platform for domestic and private use. You agree not to use the Platform, or any content on the Platform, for any commercial or business purposes and we have no liability to you for any loss of profit, loss of business, business interruption, or loss of business opportunity.</p>
                <p className="mb-2">6.3 If you are a Business:</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.3.1 all warranties, conditions, terms, undertakings and obligations implied by statute, common law, custom, trade usage, course of dealing or otherwise, (including but not limited to implied undertakings of satisfactory quality, conformity with description, fitness for any particular purpose or ability to achieve a particular result) all of which are hereby excluded to the maximum extent permitted by law;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.3.2 we will under no circumstances whatsoever be liable to you, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising under or in connection with these Terms for: (a) any loss of profits, sales, business, or revenue; (b) loss or corruption of data, information or software; (c) loss of business opportunity; (d) loss of anticipated savings; (e) loss of goodwill; or (f) any indirect or consequential loss whatsoever;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.3.3 subject to Clause 6.1, our maximum aggregate liability under and/or in connection with these Terms (whether in contract, tort (including negligence) or otherwise), in respect of all our acts, omissions (including negligence), breach of statutory duty or breach of warranty, including those of our officers, employees, agents, contractors, or sub-contractors or affiliates, shall not exceed $100;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.3.4 you acknowledge that your sole remedy in respect of any breach of these Terms by us or any other act or omission by us in relation to these Terms and/or the Platform, to the exclusion of any and all other remedies (including, without limitation, any claim in tort), is a contractual claim for breach of these Terms; and</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>6.3.5 you shall indemnify us and keep us indemnified for any and all losses, expenses and liabilities resulting from all claims, demands, liabilities, damages, costs and expenses incurred by us or by any of our officers, contractors, sub-contractors, agents, employees or affiliates which arise out of your use of the Platform, and/or your breach of these Terms.</p>
                <p className="mb-2">6.4 We assume no responsibility for the content of websites linked to from the Platform (including links to our commercial sponsors and partners). Such links should not be interpreted as endorsement by us of those linked websites. We will not be liable for any loss or damage that may arise from your use of them.</p>
                <p className="mt-6 mb-2 text-base text-yellow">7. Suspension and termination</p>
                <p className="mb-2">7.1 If you breach any of these Terms, we may immediately do any or all of the following (without limitation):</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.1 issue a warning to you;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.2 temporarily or permanently remove any User Generated Content uploaded by you to the Platform;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.3 temporarily or permanently withdraw your right to use the Platform;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.4 suspend or terminate your Account;</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.5 issue legal proceedings against you for reimbursement of all costs resulting from the breach (including, but not limited to, reasonable administrative and legal costs);</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.6 take further legal action against you; and/or</p>
                <p className="mb-2 md:ml-2" style={{'color': '#d4dae7'}}>7.1.7 disclose such information to law enforcement authorities as we reasonably feel is necessary to do so.</p>
                <p className="mt-6 mb-2 text-base text-yellow">8. Changes to these Terms</p>
                <p className="mb-2">We may make changes to these Terms from time to time (if, for example, there is a change in the law that means we need to change these Terms). Please check these Terms regularly to ensure that you understand the Terms that apply at the time that you access and use the Platform.</p>
                <p className="mt-6 mb-2 text-base text-yellow">9. Other important information</p>
                <p className="mb-2">9.1 Severance. Each of the Clauses of these Terms operates separately. If any court or relevant authority decides that any of them are unlawful or unenforceable, the remaining clauses will remain in full force and effect.</p>
                <p className="mb-2">9.2 If we fail to insist that you perform any of your obligations under these Terms, or if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations. If we do waive a default by you, we will only do so in writing, and that will not mean that we will automatically waive any later default by you.</p>
                <p className="mt-6 mb-2 text-base text-yellow">10. Governing law and jurisdiction</p>
                <p className="mb-2">10.1 These Terms are governed by the laws of Saint Vincent and the Grenadines. This means that your access to and use of the Platform, and any dispute or claim arising out of or in connection therewith (including non-contractual disputes or claims), will be governed by Saint Vincent local law.</p>
                <p className="mb-2">10.2 You can bring proceedings in respect of these Terms in the Saint Vincent courts. However, if you are a consumer and you live in another nation and we direct this Platform 7 to the member state in which you are resident you can bring legal proceedings in respect of these Terms in either the English courts or the courts of that member state.</p>
                <p className="mb-2">10.3 If you are a consumer and we direct this Platform to the member state in which you are resident, you will benefit from any mandatory provisions of the law of the country in which you are resident. Nothing in these Terms, including clause 10.1, affects your rights as a consumer to rely on such mandatory provisions of local law.</p>
                <p className="mt-6 mb-2 text-base text-yellow">11. Contact</p>
                <p className="mb-2">Contacting us Should you have any reasons for a complaint, we will endeavour to resolve the issue and avoid any re-occurrence in the future. You can always contact us by using the following details:</p>
                <p className="mb-2">Address: Suite 305, Griffith Corporate Centre, Beachmont, Kingstown, Saint Vincent and the Grenadines</p>
                <p className="mb-2">Email address: <a href="mailto:hello@bitrivals.gg" className="underline text-yellow">hello@bitrivals.gg</a></p>
                <p className="mb-2">Thank you.</p>
                <p className="mb-2">Terms last updated 11 April 2022</p>
                </div>
              </ReactModal>
              <div className="w-full">
                <div className="md:w-2/3">
                  <h1 className="mb-3 text-5xl uppercase font-morgan">Private Sale Contribution</h1>
                  <p className="mb-8 text-yellow">Buy $RIVAL with BUSD</p>
                </div>
                <div className={`p-3 px-4 mb-8 text-xs leading-5 text-white rounded-md bg-pink ${!blockUser ? "hidden" : ""}`}>
                  Sorry. It looks as though your wallet has not been whitelisted. If you feel this is a mistake, please contact whoever issued you the whitelist spot or visit our <a className="underline" href="t.me/bitrivals">Telegram</a> for further support.
                </div>
                <div className={`${blockUser ? "opacity-40 pointer-events-none" : ""}`}>
                  <div className="flex flex-wrap items-center gap-5 mb-8 md:flex-nowrap">
                    <div className="relative w-full md:w-1/2">
                      <div className="absolute text-sm transform left-5" style={{top: '17px'}}>
                        <Image src="/images/busd.svg" width="24px" height="24px" alt="" />
                      </div>
                      <input value={tokens.busd} onChange={(e) => changeTokens(e, 'BUSD')} type="number" className="w-full p-2 py-4 pr-20 font-sans transition-all duration-300 border-2 rounded-md outline-none pl-14 bg-black-250 border-black-200 focus:border-yellow"></input>
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
                      <input value={tokens.rival.toFixed(2)} onChange={(e) => changeTokens(e, 'RIVAL')} type="number" className="w-full p-2 py-4 pr-20 font-sans transition-all duration-300 border-2 rounded-md outline-none pl-14 bg-black-250 border-black-200 focus:border-yellow"></input>
                      <span className="absolute pt-4 pl-4 text-sm transform -translate-y-1/2 border-l-2 right-5 top-1/2 border-black-200">RIVAL</span>
                      <span className="absolute text-xs rounded-sm cursor-pointer right-5 top-2.5 text-yellow" onClick={(e) => maxTokens()}>max</span>
                      <span className="absolute right-0 pt-1 text-xs rounded-sm top-16 text-yellow">Balance: <span>{(contributionTotal * (1 / tokenPrice).toFixed(2)).toLocaleString()}</span></span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-8 pb-8 mt-12 text-sm border-t-2 border-b-2 border-black-200">
                  <div className="flex justify-between w-full">
                      <span className="text-black-150">Remaining contribution</span>
                      <span>{(maxContribution-contributionTotal).toLocaleString()} BUSD</span>
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
                      ? <span>You are the proud owner of {(contributionTotal * (1 / tokenPrice).toFixed(2)).toLocaleString()} RIVAL. You may purchase up to {(maxContribution * (1 / tokenPrice).toFixed(2)).toLocaleString()} (${maxContribution.toLocaleString()}) more.</span>
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
                        <path d="M5.75 7.75L8.25 10.25L14.25 3.75" stroke="#F9BA3F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      10% monthly unlock
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 mt-8 text-sm">
                    <input onClick={()=>{toggleTerms()}} id="terms" type="checkbox" className="w-4 h-4 border-2 rounded-sm appearance-none cursor-pointer bg-black-250 border-black-200" />
                    <label className="cursor-pointer" htmlFor="terms">I have read and agree to the <a href="#" className="underline text-yellow" onClick={()=>{toggleModal()}}>terms and conditions</a></label>
                  </div>
                  
                  {active
                    ? <button onClick={()=>{!blockUser ? sendTokens() : ''}} className={`px-8 pt-3 pb-3 mt-8 text-sm font-semibold rounded-md bg-yellow text-black-50 ${blockUser || maxContribution == 0 || loading ? "bg-black-200 text-white" : ""}`} disabled={`${blockUser || maxContribution == 0 || loading ? "disabled" : ""}`}>
                        {loading ? <div className="pl-6 text-white"><div className="ldio-qhqvj17an8"><div/><div><div/></div></div>Reserving. Please wait... {numberConfirmation}/6</div>  : 'Reserve your tokens'}
                      </button>
                    : <button onClick={onOpen} className="px-8 pt-3 pb-3 mt-8 text-sm font-semibold rounded-md bg-yellow text-black-50">Connect wallet</button>
                  }

                  {validation ? <p className="mt-3 text-sm text-yellow">Please accept the terms and conditions and make sure you have a value in the BUSD input before continuing.</p> : ''}
                  
                </div>
              </div>
            </div>
            <Web3connect isOpen={isOpen} closeModal={onClose} />
          </Container>
         
        </Layout>
    );
}



export default Presale;