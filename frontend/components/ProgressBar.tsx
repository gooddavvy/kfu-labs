import React from "react";

interface ProgressBarProps {
  progress: number; // Progress value from 0 to 100
  fillColor?: string; // Optional fill color, default to blue
  label?: string | React.ReactNode; // Optional label, default to null
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  fillColor = "bg-blue-500",
  label = null,
}) => {
  return (
    <div className="relative">
      {label && (
        <div className="mb-2 text-sm md:text-base font-medium">{label}</div>
      )}
      <div className="relative bg-gray-400 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full ${fillColor} rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
