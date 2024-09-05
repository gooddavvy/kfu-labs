"use client";

import React, { useState, useCallback } from "react";

// Components
import Dropdown from "../Dropdown";
import WeightLoss from "./NewGoal/WeightLoss";

// Utils
import { GoalTypes } from "@/utils/goal_types";

/* Main code */
export default function NewGoal({ profile }: { profile: any }) {
  // Using state hook directly
  let weightLossModalHidden = useState<boolean>(true);

  // useCallback to memoize the onSelect function and prevent unnecessary re-renders
  let handleSelect = useCallback((option: string) => {
    if (option === "Weight Loss - Target weight to reach by a specific date.") {
      weightLossModalHidden[1](false); // Use the setter to update state
    }
  }, []);

  return (
    <div className="flex justify-center text-center">
      {/* Main element */}
      <div className="border-solid border-2 border-black dark:border-white rounded max-w-[345px] min-w-[435px]">
        <h2 className="text-4xl">Create a Goal</h2>
        <Dropdown
          placeholder="Goal Type"
          helperText="Please select the type of goal you will make."
          options={GoalTypes}
          onSelect={handleSelect}
        />
        <h4 className="text-2xl mt-1">Discipline equals freedom!</h4>
      </div>
      {/* Weight Loss Modal */}
      <WeightLoss profile={profile} hidden={weightLossModalHidden} />
    </div>
  );
}
