
import { ethers } from "ethers";
import MyContractABI from "../contracts/SimpleVote.json";
import { CONTRACT_ADDRESS } from "../../constants";

export const useContract = () => {
  const getContract = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, MyContractABI.abi, signer);
  };

  return { getContract };
};