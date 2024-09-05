import React, { useState, useRef } from "react";
import { useOnClickOutside } from "@/onOutsideClick";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  helperText?: string;
  onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = "Select an option",
  helperText = "",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    window.setTimeout(() => onSelect(option), 300);
  };

  useOnClickOutside(ref, (_: MouseEvent | TouchEvent) => setIsOpen(false));

  return (
    <div className="relative inline-block w-64 text-left" ref={ref}>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-full px-4 py-2 text-sm text-left font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex justify-between items-center"
        >
          <span>{selectedOption || placeholder}</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <span className="text-xs text-slate-700 dark:text-slate-500">
          {helperText}
        </span>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-36 overflow-y-auto">
          {/* Set max-height to 36 which is roughly 3 * 12px line height */}
          <ul className="py-1 text-sm text-gray-700 dark:text-white">
            {options.map((option) => (
              <li key={option} title={option}>
                {/* {option === options[0] && <hr />} */}
                <button
                  onClick={() => handleSelect(option)}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {option}
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
