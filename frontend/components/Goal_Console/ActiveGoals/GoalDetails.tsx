import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ProgressBar from "@/components/ProgressBar";
import GoalSummary from "./GoalSummary";

const GoalDetails: React.FC<any> = ({
  goal,
  profileInfo,
  progress,
  progressColor,
  failing,
  deadlineIsNear,
  onEdit,
  onDelete,
}) => {
  let progressLevel = progress < 50 ? "Low" : progress < 75 ? "Medium" : "High";
  let achieved = progress === 100 && failing === false;
  let isFailing =
    failing ||
    goal.deadline === new Date().toLocaleDateString() ||
    (failing && goal.deadline === new Date().toLocaleDateString());

  return (
    <>
      <div>
        <ProgressBar
          progress={progress}
          fillColor={"bg-" + progressColor}
          label={
            <p className={"text-" + progressColor}>
              {progress.toFixed()}% (Progress Level: {progressLevel})
            </p>
          }
        />
      </div>
      <>
        <GoalSummary
          goal={goal}
          failing={isFailing}
          achieved={achieved}
          deadlineIsNear={deadlineIsNear}
        />
      </>
      <div className="items-center mt-2 inline-flex">
        <button onClick={onEdit} className="mr-2 text-[#1976d2]">
          <FaEdit size={24} color="primary"></FaEdit>
        </button>
        <button onClick={onDelete} className="text-[#da1e28] mt-0.5 ml-1">
          <FaTrashAlt size={20} color="secondary"></FaTrashAlt>
        </button>
      </div>
    </>
  );
};

export default GoalDetails;
