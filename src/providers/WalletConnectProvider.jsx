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
import { sepolia } from "viem/chains";
import { http, WagmiProvider } from "wagmi";

export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(`https://eth-sepolia.g.alchemy.com/v2/w9-AuglMlwA3N5eQ-iIjeTqfZLBOzlPz`),
        // [sepolia.id]: http("https://eth-sepolia.g.alchemy.com/v2/gBBwftqNWwma4VOcaYivkywima42GT8h"),
    },
    wallets: [{
        groupName: "Recommended",
        wallets: [
            metaMaskWallet,
            walletConnectWallet,
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
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}