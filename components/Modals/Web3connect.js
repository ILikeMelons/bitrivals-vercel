import { useWeb3React } from "@web3-react/core";

import {
    VStack,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Text,
  } from "@chakra-ui/react";
import walletconnect from '../../public/walletconnect.svg'
import useLocalStorage from '../../hooks/useLocalStorage';
import { connectors } from "../../connectors";

const Web3connect = ({isOpen, closeModal}) => {
    const { activate } = useWeb3React();
    

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
      };

    return(
        <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <div className=" w-full">
        <ModalContent w="300px">
          <ModalHeader className="">Select Wallet</ModalHeader>
          <ModalCloseButton
            _focus={{
              boxShadow: "none"
            }}
          />
          <ModalBody paddingBottom="1.5rem" className="">
            <VStack>
              <Button
                
                onClick={() => {
                  activate(connectors.walletConnect);
                  setProvider("walletConnect");
                  closeModal();
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                <Image
                    src={walletconnect.src}
                    alt="Metamask Logo"
                    width={150}
                    height={25}
                    borderRadius="3px"
                  />
                </HStack>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  activate(connectors.injected);
                  setProvider("injected");
                  closeModal();
                }}
                w="100%"
              >
                <HStack w="100%" justifyContent="center">
                  <Image
                    src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                    alt="Metamask Logo"
                    width={25}
                    height={25}
                    borderRadius="3px"
                  />
                  <Text>Metamask</Text>
                </HStack>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
        </div>
        
      </Modal>
    )
}

export default Web3connect;