import ConfettiEffect from "@/components/ConfettiEffect";
import React from "react";

const GoalSummary: React.FC<any> = ({
  goal,
  failing,
  achieved,
  deadlineIsNear,
}) => {
  let getValueUnit = (length: number): string => {
    if (goal.type === "Weight Loss") return ` lb`;
    if (goal.type === "Push-up Training")
      return ` push-up${length !== 1 ? "s" : ""}`;
    if (goal.type === "Pull-up Training")
      return ` pull-up${length !== 1 ? "s" : ""}`;
    else return "";
  };

  return (
    <div className="mt-2">
      {failing === true && (
        <p className="text-red-500">Oh no, you're have failed this goal!</p>
      )}
      {achieved === true && (
        <>
          <p className="text-green-500">You did it! You achieved your goal!</p>
          <ConfettiEffect isVisible={true} />
        </>
      )}
      {deadlineIsNear === true && (
        <p className="font-bold">Deadline approaching soon.</p>
      )}
      <p>
        <b>Goal Type: </b>
        {goal.type}
      </p>
      <p>
        <b>Start Date: </b>
        {goal.startDate}
      </p>
      <p>
        <b>Current Date: </b>
        {new Date().toLocaleDateString()}
      </p>
      <p>
        <b>Deadline: </b>
        {goal.deadline}
      </p>
      <p>
        <b>Initial Value: </b>
        {goal.initialValue}
        {getValueUnit(goal.initialValue)}
      </p>
      <p>
        <b>Current Value: </b>
        {goal.currentValue}
        {getValueUnit(goal.currentValue)}
      </p>
      <p>
        <b>Target Value: </b>
        {goal.targetValue}
        {getValueUnit(goal.targetValue)}
      </p>{" "}
    </div>
  );
};

export default GoalSummary;
