import { createContext, useState, useContext } from "react";

// 1. Context erstellen
const WalletContext = createContext();

// 2. Provider-Komponente
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

// 3. Custom Hook für einfacheren Zugriff
export const useWallet = () => useContext(WalletContext);