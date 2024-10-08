import React from "react";

interface ModalProps {
  className?: string;
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  className,
  onClose,
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-75
        z-50
        ${className}
        overflow-hidden
      `}
      onClick={onClose}
    >
      <div
        className={`
          relative
          bg-white dark:bg-gray-900
          rounded-lg shadow-lg p-4
          text-center
          w-full max-w-lg md:w-96
          max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-6rem)]
          overflow-y-auto
          mt-20
          z-50
        `}
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside the content area
      >
        <button
          className="absolute top-2 right-2 text-gray-900 dark:text-gray-100 md:invisible lg:invisible"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
