import React, { useMemo } from "react";

// Components
import GoalDetails from "./ActiveGoals/GoalDetails";

// Utils
import calculateProgress from "@/utils/calculate_progress";
import isNearDeadline from "@/utils/is_near_deadline";

/* Main code */
export let isPastDate = (dateString1: string, dateString2: string): boolean => {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  return date1 < date2;
};

export default function ActiveGoals({ profile }: { profile: any }) {
  let activeGoals: any[] | undefined | null = useMemo(
    () => profile?.goals,
    [profile]
  );

  return (
    <div className="flex items-center justify-center text-center w-full max-w-[345px] mx-auto">
      <div className="border-solid border-2 border-red-500 mt-[1%] rounded p-4">
        <h2 className="text-4xl">Active Goals</h2>
        <p>
          Not seeing up-to-date information? Please try refreshing the page.
        </p>
        <div className="mt-3">
          {activeGoals?.length === 0 ? (
            <p>
              <b>Whoops, no active goals yet.</b> Remember, discipline equals
              freedom, so go and make a new goal!
            </p>
          ) : (
            <>
              {activeGoals?.map((goal, index) => {
                const progress = calculateProgress(
                  goal.initialValue,
                  goal.currentValue,
                  goal.targetValue
                );
                const failing =
                  isPastDate(goal.deadline, goal.startDate) ||
                  (progress === 0 && isPastDate(goal.deadline, goal.startDate));

                return (
                  <div
                    key={index}
                    className={`border-dashed border-black dark:border-white ${
                      failing && "bg-inherit"
                    } border-[1.5px] rounded-[12px] p-[10px] mt-[10px] mb-[10px] ml-[0] mr-[0]`}
                  >
                    <GoalDetails
                      goal={goal}
                      profileInfo={profile}
                      progress={progress}
                      progressColor={
                        progress < 50
                          ? "red-500"
                          : progress < 75
                          ? "blue-500"
                          : "green-500"
                      }
                      failing={failing}
                      deadlineIsNear={isNearDeadline(new Date(goal.deadline))}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
