import { createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { walletConnectProvider } from '@walletconnect/web3-provider'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'

// Konfiguriere Chains und Provider
const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base], 
  [
    walletConnectProvider({
      projectId: '85f0b5c47f526eb2a85f7e8b1e499deb', 
    }),
    publicProvider()
  ]
)

// WalletConnect und andere Wallets konfigurieren
const { connectors } = getDefaultWallets({
  appName: 'Simple-Vote',
  projectId: '85f0b5c47f526eb2a85f7e8b1e499deb',
  chains
})

// Erstelle wagmi-Client
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export { wagmiConfig, chains }