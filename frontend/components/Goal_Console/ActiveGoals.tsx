import React, { useMemo } from "react";

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
                return (
                  <div key={index}>
                    <p>
                      <b>Goal Type: </b>
                      {goal.type}
                    </p>
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
