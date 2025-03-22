import StateChart from "./StateChart";

const Card = ({
  election,
  id,
  creator,
  onVote,
  hasVoted,
  votesYes,
  votesNo,
  deadline
}) => {
  // console.log("Election: ", election);
  // console.log("ID: ", id);
  // console.log("Creator: ", creator);
  // console.log("onVote: ", onVote);
  // console.log("hasVote: ", hasVoted);
  // console.log("Votes Yes: ", votesYes);
  // console.log("Votes No: ", votesNo);
  const yes = Number(votesYes);
  const no = Number(votesNo);
  const formattedDeadline = new Date(Number(deadline) * 1000).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const voteYes = () => {
    onVote(id, true);
  };

  const voteNo = () => {
    onVote(id, false);
  };

  return (
    <div
      className="
        max-w-xs
        bg-blue-500/20
        backdrop-blur-lg
        border
        border-blue-400/30
        rounded-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        transition-all
        duration-300
        hover:bg-blue-500/30
        hover:shadow-lg
        group
        cursor-pointer
        w-full
        md:w-[400px]
        lg:w-auto
      "
    >
      {/* Text */}
      <div className="flex-grow flex items-center justify-center p-6">
        <h3 className="text-xl font-semibold text-white text-center">
          {election}
        </h3>
      </div>

      {/* Buttons */}
      {hasVoted ? (
        // <h2 className="text-xl font-semibold text-amber-50 text-center">Already Voted!</h2>
        <StateChart yesW={yes} noW={no} totalW={yes+no} />
      ) : (
        <>
          <div className="flex justify-evenly items-center p-6 gap-2.5">
            <button
              onClick={voteYes}
              className="px-8 py-3 font-medium text-white rounded-lg bg-[#5CB338] hover:bg-[#118B50] hover:border"
            >
              Yes
            </button>
            <button
              onClick={voteNo}
              className="px-8 py-3 font-medium text-white rounded-lg bg-[#e15656] hover:bg-[#D84040] hover:border"
            >
              No
            </button>
          </div>
        </>
      )}
      <p className="text-gray-400 font-sans text-center pb-3">
        created by {`${creator.substring(0, 6)}...${creator.slice(-4)}`}
      </p>
      <p className="text-gray-400 font-sans text-center pb-3">Deadline: {formattedDeadline}</p>
    </div>
  );
};

export default Card;
