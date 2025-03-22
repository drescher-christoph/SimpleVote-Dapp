// import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import MyContractABI from "../contracts/SimpleVote.json";
// import { CONTRACT_ADDRESS } from "../../constants";
// import { useContract } from "./useContract";

// export const useVote = () => {

//     const { getContract } = useContract();

//     const voteChoice = async(voteID, choice) => {
//         const contract = await getContract();
//         const voteTx = await contract.vote(voteID, choice);
//         voteTx.wait();
//         return voteTx;
//     }

//     return { voteChoice };
// }

import { useWriteContract } from "wagmi";
import { CONTRACT_ADDRESS } from "../../constants";
import MyContractABI from "../contracts/SimpleVote.json";

export const useVote = () => {
  const { data: hash, writeContract } = useWriteContract();

  const voteChoice = async (voteID, choice) => {
    try {

      writeContract({
        address: CONTRACT_ADDRESS,
        abi: MyContractABI.abi,
        functionName: "vote",
        args: [BigInt(voteID), choice],
      });

      console.log("Transaction Hash:", hash);
      return hash;
    } catch (error) {
      console.error("Fehler bei der Abstimmung:", error);
      throw error;
    }
  };

  return { voteChoice, hash };
};
