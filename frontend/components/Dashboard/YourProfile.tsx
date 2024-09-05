import React from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function YourProfile({ profile }: { profile: any }) {
  let router = useRouter();

  return (
    <div className="flex justify-center text-center">
      {/* Apply inline styles for custom widths */}
      <div
        style={{ minWidth: 435, maxWidth: 345 /* borderRadius: "6px" */ }}
        className="border-solid border-2 border-black dark:border-white rounded"
      >
        <h2 className="text-4xl">Your Profile</h2>
        <p>
          <b>Username: </b>
          {profile?.username !== undefined ? (
            profile.username
          ) : (
            <span className="animate-bounce">Loading...</span>
          )}
        </p>
        <p>
          <b>Total Points Earned: </b>
          {profile?.awards?.total_points !== undefined ? (
            profile.awards.total_points
          ) : (
            <span className="animate-bounce">Loading...</span>
          )}
        </p>
        <button
          className="border-none bg-inherit text-sky-500 inline-flex"
          style={{ fontSize: "16px" }}
          onClick={() => router.push("/profile")}
        >
          <FaEdit className="mt-1 mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
