import { useState, useEffect } from "react";
import { ethers } from "ethers";
import MyContractABI from "../contracts/SimpleVote.json";
import { CONTRACT_ADDRESS } from "../../constants";
import { useContract } from "./useContract";
import { useAccount } from "wagmi";

//TODO: mithilfe von WAGMI umschreiben: https://wagmi.sh/react/guides/read-from-contract
// dann useAccount verwenden um hasVoted korrekt zu prüfen
// auch prüfen ob owner == address ist -> diese dann nicht anzeigen
// überprüfen ob Deadline der Vote abgelaufen ist

export const useVotes = () => {
  const { getContract } = useContract();

  const getVotes = async (address) => {
    const contract = await getContract();
    const votes = [];

    // Fetch Votes count (nextVoteId)
    const votesCount = (await contract.nextVoteID()).toString();
    console.log("Votes Count: ", votesCount);

    // fetch all votes
    for (let x = 0; x < votesCount; x++) {
      const voteItem = await contract.votes(x);
      if (Number(voteItem.deadline) < Math.floor(Date.now() / 1000)) {
        console.log(
          "Vote: ",
          voteItem.election,
          " has a deadline at ",
          voteItem.deadline
        );
        console.log("Current time: ", Date.now());
        console.log("Vote deadline is due");
        continue;
      }
      const hasVoted = await contract.hasVoted(voteItem.id, address);
      const completeVoteItem = {
        id: voteItem.id,
        owner: voteItem.owner,
        election: voteItem.election,
        votesYes: voteItem.votesYes,
        votesNo: voteItem.votesNo,
        deadline: voteItem.deadline,
        hasVoted: hasVoted,
      };
      console.log("Vote Item: ", completeVoteItem);
      votes[x] = completeVoteItem;
    }
    return votes;
  };

  return { getVotes };
};

// import { readContract } from '@wagmi/core';
// import { useReadContract } from 'wagmi';
// import MyContractABI from "../contracts/SimpleVote.json";
// import { CONTRACT_ADDRESS } from "../../constants";
// import { useState, useEffect } from 'react';

// export const useVotes = (address) => {
//   const [votes, setVotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Lese nextVoteID vom Smart Contract
//   const votesCountResult = useReadContract({
//     abi: MyContractABI,
//     address: CONTRACT_ADDRESS,
//     functionName: 'nextVoteID',
//   });

//   useEffect(() => {
//     const fetchVotes = async () => {
//       if (!votesCountResult.isSuccess || !votesCountResult.data) return;

//       try {
//         setLoading(true);
//         const votesCount = Number(votesCountResult.data);
//         console.log("Votes Count: ", votesCount);

//         const votesArray = [];

//         for (let x = 0; x < votesCount; x++) {
//           try {
//             // Verwende readContract mit detaillierten Parametern
//             const voteItem = await readContract({
//               abi: MyContractABI,
//               address: CONTRACT_ADDRESS,
//               functionName: 'votes',
//               args: [x],
//               // Optional: explizite Chain-ID angeben, falls benötigt
//               // chainId: 1, // z.B. 1 für Ethereum Mainnet, 5 für Goerli
//             });

//             let hasVoted = false;
//             if (address) {
//               hasVoted = await readContract({
//                 abi: MyContractABI,
//                 address: CONTRACT_ADDRESS,
//                 functionName: 'hasVoted',
//                 args: [voteItem.id, address],
//                 // Optional: explizite Chain-ID angeben, falls benötigt
//                 // chainId: 1, // z.B. 1 für Ethereum Mainnet, 5 für Goerli
//               });
//             }

//             const completeVoteItem = {
//               id: voteItem.id,
//               owner: voteItem.owner,
//               election: voteItem.election,
//               votesYes: voteItem.votesYes,
//               votesNo: voteItem.votesNo,
//               deadline: voteItem.deadline,
//               hasVoted: hasVoted
//             };

//             console.log("Vote Item: ", completeVoteItem);
//             votesArray[x] = completeVoteItem;
//           } catch (itemError) {
//             console.error(`Error fetching vote item ${x}:`, itemError);
//             // Wir setzen trotzdem fort, um andere Votes zu laden
//           }
//         }

//         setVotes(votesArray.filter(Boolean)); // Filtere leere Einträge
//       } catch (err) {
//         console.error("Error fetching votes:", err);
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (votesCountResult.isSuccess) {
//       fetchVotes();
//     }
//   }, [votesCountResult.isSuccess, votesCountResult.data, address]);

//   return { votes, loading, error };
// };
