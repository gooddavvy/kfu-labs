"use client";

import React, { useState, useEffect, useCallback } from "react";

// Components
import ErrorMessage from "@/components/ErrorMessage";
import NewGoal from "@/components/Goal_Console/NewGoal";
import ActiveGoals from "@/components/Goal_Console/ActiveGoals";

// Utils
import { getProfileInfo } from "@/utils/profile_api";

export default function Goals() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<any>({});
  const [errMsg, setErrMsg] = useState<React.ReactNode>(null);

  const fetchProfileInfo = useCallback(async () => {
    try {
      const profileInfo = await getProfileInfo();
      setProfile(profileInfo);
      setUsername(", " + profileInfo.username);
    } catch (error) {
      console.error("Failed to get profile info:", error);
      setErrMsg(<ErrorMessage error={error as Error} />);
    }
  }, []);

  useEffect(() => {
    console.log("Goals component rendered");
    fetchProfileInfo();
  }, [fetchProfileInfo]);

  return (
    <main className="relative z-0">
      <h1 className="text-5xl">Goal Console</h1>
      <p>Ready to reach some goals{username}?</p>
      {/* New Goal Component */}
      <NewGoal profile={profile} />
      {/* Active Goals component */}
      <ActiveGoals profile={profile} />
      {/* Error message, if there's an error */}
      {errMsg}
    </main>
  );
}
