import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  midnightTheme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bscTestnet,
  goerli,
  bsc,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

import NavBar from "./sections/NavBar";
import CampaignsView from "./sections/CampaignsView";
import Footer from './sections/Footer';

import { useContract } from "./hooks/useContract";

const App = () => {
  
  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName: 'Simple-Vote',
    projectId: '85f0b5c47f526eb2a85f7e8b1e499deb',
    chains: [mainnet, polygon, optimism, arbitrum, base, bscTestnet, goerli, bsc],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}>
          <main>
            <NavBar />
            <CampaignsView />
            <Footer />
          </main>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
