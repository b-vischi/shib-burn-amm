"use client";

import React, { ReactNode } from "react";
import { WagmiProvider, createConfig } from "wagmi";
import { mainnet, shibarium } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { defineChain } from "viem";

// 1. Manually define Puppynet to avoid "Export not found" errors
const puppynet = defineChain({
  id: 157,
  name: 'Shibarium Puppynet',
  nativeCurrency: { name: 'BONE', symbol: 'BONE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://puppynet.shibrpc.com'] },
  },
  blockExplorers: {
    default: { name: 'Puppyscan', url: 'https://puppyscan.shib.io' },
  },
  testnet: true,
});

// 2. Configure the dApp architecture
const config = createConfig(
  getDefaultConfig({
    chains: [mainnet, shibarium, puppynet],
    walletConnectProjectId: "DEFAULT", 
    appName: "ShibBurn AMM",
    ssr: true,
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};