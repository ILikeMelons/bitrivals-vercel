import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [56]
});

const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://bsc-dataseed.binance.org`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});



export const connectors = {
  injected: injected,
  walletConnect: walletconnect
};
