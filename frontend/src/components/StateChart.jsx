import {useState} from "react";

const StateChart = ({ yesW, noW, totalW }) => {
  const yesPercentage = (yesW / totalW) * 100;
  const noPercentage = (noW / totalW) * 100;
  const minWidthForText = 15; 

  const [isYesHovered, setIsYesHovered] = useState(false);
  const [isNoHovered, setIsNoHovered] = useState(false);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex h-10 w-4/5 overflow-hidden rounded-2xl bg-gray-400">
        <div
          className="flex h-full items-center justify-center bg-[#5CB338] font-bold text-white"
          style={{ width: `${yesPercentage}%` }}
          onMouseEnter={() => setIsYesHovered(true)}
          onMouseLeave={() => setIsYesHovered(false)}
        >
          {yesPercentage >= minWidthForText ? (isYesHovered ? `${yesPercentage.toFixed(0)}%` : "True") : ""}
        </div>
        <div
          className="flex h-full items-center justify-center bg-[#e15656] font-bold text-white"
          style={{ width: `${noPercentage}%` }}
          onMouseEnter={() => setIsNoHovered(true)}
          onMouseLeave={() => setIsNoHovered(false)}
        >
          {noPercentage >= minWidthForText ? (isNoHovered ? `${noPercentage.toFixed(0)}%` : "False") : ""}
        </div>
      </div>
    </div>
  );
};

export default StateChart;
