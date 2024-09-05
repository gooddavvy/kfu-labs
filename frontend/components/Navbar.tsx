"use client";

import React, {
  useState,
  useRef,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { FaBars, FaRegMoon, FaRegSun } from "react-icons/fa";
import Link from "next/link";
import { useOnClickOutside } from "@/onOutsideClick";
import { getProfileInfo, updateProfileInfo } from "@/utils/profile_api";
import LogoutButton from "./LogoutButton";
import NotificationIcon from "./NotificationIcon";

const Navbar: React.FC<{
  theme: [string, Dispatch<SetStateAction<string>>];
}> = ({ theme }) => {
  const [userTheme, setUserTheme] = theme;
  const [toggleThemeButtonContent, setToggleThemeButtonContent] = useState<
    string | React.ReactNode
  >(userTheme === "Dark" ? <FaRegMoon size={24} /> : <FaRegSun size={24} />);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [totalPoints, setTotalPoints] = useState<React.ReactNode>(
    <div className="text-blue-500 animate-bounce mt-2">Loading...</div>
  );
  const ref = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (_: MouseEvent | TouchEvent) => setMenuOpen(false);
  useOnClickOutside(ref, handleClickOutside);

  const handleToggleTheme = () => {
    const newTheme = userTheme === "Dark" ? "Light" : "Dark";
    setUserTheme(newTheme);
  };

  useEffect(() => {
    (async () => {
      try {
        // Fetch profile info and initialize theme
        const profileInfo = await getProfileInfo();
        setTotalPoints(
          (profileInfo.awards.total_points as number).toLocaleString()
        );
        // Initialize userTheme from profile info
        setUserTheme(profileInfo.user_theme);
      } catch (error) {
        console.error("Failed to get profile info:", error);
        setTotalPoints("Error");
      }
    })();
  }, [setUserTheme]);

  useEffect(() => {
    // Update theme in the database when it changes
    getProfileInfo()
      .then((profileI) => {
        setToggleThemeButtonContent("Just a sec...");
        setTimeout(() => {
          let newProfileI = profileI;
          newProfileI.user_theme = userTheme;
          updateProfileInfo(newProfileI)
            .then(() => {
              console.log("Successfully toggled theme!");
              setToggleThemeButtonContent(
                userTheme === "Dark" ? (
                  <FaRegMoon size={24} />
                ) : (
                  <FaRegSun size={24} />
                )
              );
            })
            .catch((error) => {
              console.error("Failed to toggle theme:", error);
              setToggleThemeButtonContent("Error");
            });
        }, 50);
      })
      .catch((error) => {
        console.error("Failed to get profile info:", error);
        setToggleThemeButtonContent("Error");
      });
  }, [userTheme]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-700 z-50">
      {/* Ensure the Navbar has a higher z-index */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mr-2"
            ref={ref}
          >
            <FaBars size={24} />
          </button>
          <span className="text-xl font-semibold text-black dark:text-white flex-grow">
            KFU Health
          </span>
        </div>

        <div className="flex items-center">
          <button
            className="
              border-2 border-blue-500 bg-sky-500 text-white
              py-2 px-4 rounded-lg
              hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-300
              text-sm md:text-base
              transition duration-300 ease-in-out
              mr-4
            "
            onClick={handleToggleTheme}
          >
            {toggleThemeButtonContent}
          </button>

          <div
            className="
              border-2 border-blue-500 dark:border-blue-400 rounded-lg px-4 py-2 font-bold
              text-lg bg-gradient-to-br from-blue-500 to-pink-500 via-yellow-300
              dark:from-blue-400 dark:to-pink-400 dark:via-yellow-200
              text-black shadow-lg transition-transform duration-300 ease-in-out
              hover:scale-110 hover:shadow-2xl
              mr-2
            "
            title={`Total Points Earned: ${totalPoints}`}
          >
            {totalPoints}
          </div>

          <LogoutButton />

          <Link href="/notifications" className="ml-4">
            <NotificationIcon />
          </Link>
        </div>
      </div>

      <Transition
        show={menuOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <HeadlessMenu
          as="div"
          className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 z-40"
        >
          {/* Ensure the dropdown has a lower z-index than the Navbar but higher than the main content */}
          <div className="flex flex-col">
            <a
              href="/"
              className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-4"
            >
              Home
            </a>
            <a
              href="/goals"
              className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-4"
            >
              Goals
            </a>
            <a
              href="/workouts"
              className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-4"
            >
              Workouts
            </a>
            <a
              href="/profile"
              className="text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 p-4"
            >
              Profile & Settings
            </a>
          </div>
        </HeadlessMenu>
      </Transition>
    </nav>
  );
};

export default Navbar;
