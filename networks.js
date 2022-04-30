export const networkParams = {
    live:{
        chainId: 56,
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        chainName: 'Binance Smart Chain',
        nativeCurrency: { name: "BNB", decimals: 18, symbol:"BNB"},
        blockExplorerUrls: ["https://bscscan.com/"],
        iconUrls : ''
    },
    test:{
        chainId: 97,
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        chainName: 'Smart Chain - Testnet',
        nativeCurrency: { name: "BNB", decimals: 18, symbol:"BNB"},
        blockExplorerUrls: ["https://bscscan.com/"],
        iconUrls : ''
    }
}