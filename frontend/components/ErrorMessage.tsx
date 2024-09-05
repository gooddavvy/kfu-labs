import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import Modal from "./Modal"; // Assuming the Modal component is in the same directory

// SVG Component for the blue X icon
const SvgComponent: React.FC = () => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#2196F3" /> {/* Blue circle */}
      <path
        d="M15 9L9 15M9 9l6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ErrorMessage Component
const ErrorMessage: React.FC<{ error: Error }> = ({ error }) => {
  const [modalOpen, setModalOpen] = useState(!!error); // State for modal visibility
  const [expandDeveloperMessage, setExpandDeveloperMessage] = useState(false); // State for expandable section

  return (
    <Modal isOpen={modalOpen} onClose={() => {}}>
      {/* SVG Icon */}
      <div className="flex justify-center mb-4">
        <SvgComponent />
      </div>

      {/* Error message */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Whoops, something went wrong.
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          We ran into an unexpected issue. Please try again as soon as possible,
          and we apologize for any inconvenience.
        </p>
      </div>

      {/* Collapsible for developer message */}
      <div className="text-left">
        <div className="flex items-center justify-start mb-2">
          <p className="text-gray-700 dark:text-gray-300">
            View developer message
          </p>
          <button
            onClick={() => setExpandDeveloperMessage(!expandDeveloperMessage)}
            aria-expanded={expandDeveloperMessage}
            aria-label="show more"
            className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <FaChevronDown />
          </button>
        </div>
        <Transition
          show={expandDeveloperMessage}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {error.message}
          </p>
        </Transition>
      </div>
    </Modal>
  );
};

export default ErrorMessage;
