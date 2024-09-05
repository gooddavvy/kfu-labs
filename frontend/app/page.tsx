"use client";

import React, { useState, useEffect } from "react";
import { FaInfoCircle } from "react-icons/fa";

// Components
import Dropdown from "@/components/Dropdown";
import ErrorMessage from "@/components/ErrorMessage";
import YourProfile from "@/components/Dashboard/YourProfile";

// Utils
import { getProfileInfo } from "@/utils/profile_api";
import { GenQuote } from "@/utils/quote_manager";

/* Main code */
const BlueAlert: React.FC<{ className?: string | undefined }> = ({
  className,
}) => {
  // State to manage the visibility of the message
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<React.ReactNode>(<></>);
  const [quote, setQuote] = useState<string>("Loading...");

  // Function to handle icon click
  const handleClick = () => {
    setShowMessage(!showMessage);
  };

  useEffect(() => {
    GenQuote()
      .then((quote) => setQuote(quote))
      .catch((error) => {
        console.error(error);
        setErrorMessage(<ErrorMessage error={error} />);
      });
  }, []);

  return (
    <div
      className={`flex flex-col items-start bg-sky-500 border border-blue-300 text-blue-800 px-4 py-2 rounded${
        className !== undefined ? " " + className : ""
      }`}
    >
      <div className="flex items-center">
        <FaInfoCircle
          className="h-6 w-6 text-blue-700 mr-2 cursor-pointer"
          onClick={handleClick}
        />
        <span className="font-semibold">{quote}</span>
      </div>
      {/* Conditional rendering of the message */}
      {showMessage && (
        <p className="mt-2 text-sm text-blue-700">
          This is a motivational quote banner.
        </p>
      )}
      {/* Error message, if there's an error */}
      {errorMessage}
    </div>
  );
};

export default function Home() {
  let [username, setUsername] = useState<string>("");
  let [profile, setProfile] = useState<any>({});

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const profileInfo = await getProfileInfo();
        setProfile(profileInfo);
        setUsername(", " + profileInfo.username);
      } catch (error) {
        console.error("Failed to get profile info:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  return (
    <main className="relative z-0">
      <h1 className="text-5xl">KFU Health Dashboard</h1>
      <p>Welcome back{username}.</p>
      <BlueAlert />
      <Dropdown
        options={[
          "Option 1",
          "Option 2",
          "Option 3",
          "Option 4",
          "Option 5",
          "Option 6",
        ]}
        onSelect={(option) => {
          alert("You selected " + option + "!");
        }}
      />
      {/* User's profile */}
      <YourProfile profile={profile} />
    </main>
  );
}
