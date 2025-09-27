import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
    argentWallet,
    bifrostWallet,
    binanceWallet,
    bitgetWallet,
    bitskiWallet,
    bitverseWallet,
    bloomWallet,
    braveWallet,
    bybitWallet,
    clvWallet,
    coin98Wallet,
    coinbaseWallet,
    compassWallet,
    coreWallet,
    dawnWallet,
    desigWallet,
    enkryptWallet,
    foxWallet,
    frameWallet,
    frontierWallet,
    gateWallet,
    imTokenWallet,
    injectedWallet,
    iopayWallet,
    kaiaWallet,
    kaikasWallet,
    krakenWallet,
    kresusWallet,
    ledgerWallet,
    magicEdenWallet,
    metaMaskWallet,
    mewWallet,
    nestWallet,
    oktoWallet,
    okxWallet,
    omniWallet,
    oneInchWallet,
    oneKeyWallet,
    phantomWallet,
    rabbyWallet,
    rainbowWallet,
    ramperWallet,
    roninWallet,
    safeheronWallet,
    safepalWallet,
    safeWallet,
    seifWallet,
    subWallet,
    tahoWallet,
    talismanWallet,
    tokenaryWallet,
    tokenPocketWallet,
    trustWallet,
    uniswapWallet,
    valoraWallet,
    walletConnectWallet,
    xdefiWallet,
    zealWallet,
    zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia, base } from "viem/chains";
import { http, WagmiProvider } from "wagmi";
import { WALLETCONNECT_PROJECT_ID } from 'data/constant';

// Define Kadena EVM Chains
const kadenaChain20 = {
  id: 5920,
  name: 'Kadena Chain 20',
  network: 'kadena-20',
  nativeCurrency: {
    decimals: 18,
    name: 'Kadena',
    symbol: 'KDA',
  },
  rpcUrls: {
    default: {
      http: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc'],
    },
    public: {
      http: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kadena Explorer',
      url: 'https://explorer.chainweb.com',
    },
  },
  testnet: true,
};

const kadenaChain21 = {
  id: 5921,
  name: 'Kadena Chain 21',
  network: 'kadena-21',
  nativeCurrency: {
    decimals: 18,
    name: 'Kadena',
    symbol: 'KDA',
  },
  rpcUrls: {
    default: {
      http: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc'],
    },
    public: {
      http: ['https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kadena Explorer',
      url: 'https://explorer.chainweb.com',
    },
  },
  testnet: true,
};

export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: WALLETCONNECT_PROJECT_ID,
    chains: [sepolia, base, kadenaChain20, kadenaChain21],
    transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/w9-AuglMlwA3N5eQ-iIjeTqfZLBOzlPz`),
        [base.id]: http('https://mainnet.base.org'),
        [kadenaChain20.id]: http('https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc'),
        [kadenaChain21.id]: http('https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc'),
        // [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/gBBwftqNWwma4VOcaYivkywima42GT8h"),
    },
    wallets: [{
        groupName: "Recommended",
        wallets: [
            metaMaskWallet,
            walletConnectWallet,
            // kadenaWallet(), // Temporarily disabled - fixing createWallet error
            trustWallet,
            phantomWallet,
            binanceWallet,
            argentWallet,
            bifrostWallet,
            bitgetWallet,
            bitskiWallet,
            bitverseWallet,
            bloomWallet,
            braveWallet,
            bybitWallet,
            clvWallet,
            coin98Wallet,
            coinbaseWallet,
            compassWallet,
            coreWallet,
            dawnWallet,
            desigWallet,
            enkryptWallet,
            foxWallet,
            frameWallet,
            frontierWallet,
            gateWallet,
            imTokenWallet,
            injectedWallet,
            iopayWallet,
            kaiaWallet,
            kaikasWallet,
            krakenWallet,
            kresusWallet,
            ledgerWallet,
            magicEdenWallet,
            mewWallet,
            nestWallet,
            oktoWallet,
            okxWallet,
            omniWallet,
            oneInchWallet,
            oneKeyWallet,
            rabbyWallet,
            rainbowWallet,
            ramperWallet,
            roninWallet,
            safeWallet,
            safeheronWallet,
            safepalWallet,
            seifWallet,
            subWallet,
            tahoWallet,
            talismanWallet,
            tokenaryWallet,
            tokenPocketWallet,
            uniswapWallet,
            valoraWallet,
            xdefiWallet,
            zealWallet,
            zerionWallet,
        ]
    }]
    // ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function WalletConnectProvider({ children }) {
    // config contains the chains configured above (we don't add networks here).
    // Passing `chains={config.chains}` ensures RainbowKit has the same chains
    // and will show its standard "Switch network" UI when the user is on a wrong chain.
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider 
                    chains={config.chains} 
                    showRecentTransactions={true}
                    modalSize="compact"
                    coolMode
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}