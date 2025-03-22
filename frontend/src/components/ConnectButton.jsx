import { useState, useEffect } from "react";

const ConnectButton = () => {
  const [address, setAddress] = useState("");

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
            method: "eth_accounts",
            });
            if (accounts.length > 0) {
            setAddress(accounts[0]);
            }
        }
        };

        checkIfWalletIsConnected();

        const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            setAddress(accounts[0]);
        } else {
            setAddress(""); // Wallet disconnected
        }
        };

        window.ethereum?.on("accountsChanged", handleAccountsChanged);

        return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
        };
    }, []);

    const handleConnect = async () => {
        if (typeof window.ethereum !== "undefined") {
        try {
            const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
            });

            setAddress(accounts[0]);
        } catch (error) {
            console.error("Verbindungsfehler:", error);
        }
        } else {
        alert("Bitte installiere MetaMask!");
        }
    };

    const formattedAddress = address
        ? `${address.substring(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet";

    return (
        <button
        onClick={handleConnect}
        className="
        px-8 py-3
        bg-gradient-to-r from-blue-500 to-purple-600
        backdrop-blur-lg
        text-white
        font-semibold
        rounded-2xl
        border-2 border-white/20
        shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]
        hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.5)]
        hover:-translate-y-0.5
        transition-all
        duration-300
        relative
        overflow-hidden
        group
        "
        >
        <span className="relative z-10">{formattedAddress}</span>
        <div
            className="
            absolute
            inset-0
            bg-gradient-to-r from-blue-500/30 to-purple-600/30
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
        "
        ></div>
        </button>
    );
};

export default ConnectButton;
