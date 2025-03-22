import Card from "../components/Card";
import ActionButton from "../components/ActionButton";
import CreatePopup from "../components/CreatePopup";
import { useState, useEffect } from "react";
import { useContract } from "../hooks/useContract";
import { useVotes } from "../hooks/useVotes";
import { useVote } from "../hooks/useVote";
import { useAccount } from "wagmi";
import Loader from "../components/Loader";

const CampaignsView = () => {
  
  const { getContract } = useContract();
  const { getVotes } = useVotes();
  const { voteChoice } = useVote();

  const [votes, setVotes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const account = useAccount();

  const handleCreatePoll = async (question) => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const newVote = await contract.createVote(question, BigInt(7));
      newVote.wait();
      console.log(newVote);
      console.log("Sleeping...");
      await sleep(5000);
      setJustVoted(true);
    } catch (error) {
      console.log("Error creating new Vote: ", error);
    }
  };

  const vote = async (id, choice) => {
    console.log("Starting Vote Transaction...");
    const voting = await voteChoice(id, choice);
    console.log(voting);
    console.log("Successfully voted!");
  };

  useEffect(() => {
    async function fetchVotes() {
      setIsLoading(true);
      const data = await getVotes(account.address);
      setVotes(data);
      setIsLoading(false);
    }
    fetchVotes();
  }, [justVoted, account]);

  return (
    <div className="justify-center top-0 mt-17 sm:mt-40 md:mt-45 lg:mt-35 xl:mt-45 xl:-translate-y-26 lg:-translate-y-26 md:-translate-y-26 sm:-translate-y-26">
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-white font-semibold text-3xl mb-4 text-left">
              Recent Votes
            </h2>
            <ActionButton
              action={() => {
                setIsPopupOpen(true);
              }}
              label={"Create"}
            />
          </div>
          <div
            className="
                grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
          >
            {votes.map((ballot) => {
              return (
                <Card
                  key={ballot.id}
                  id={ballot.id}
                  election={ballot.election}
                  creator={ballot.owner}
                  onVote={vote}
                  hasVoted={ballot.hasVoted}
                  votesYes={ballot.votesYes}
                  votesNo={ballot.votesNo}
                  deadline={ballot.deadline}
                />
              );
            })}
          </div>

          <CreatePopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            onCreatePoll={handleCreatePoll}
          />
        </>
      )}
    </div>
  );
};

export default CampaignsView;
