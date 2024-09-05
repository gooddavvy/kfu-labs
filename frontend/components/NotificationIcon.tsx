import React from "react";

interface NotificationIconProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  width = 24,
  height = 24,
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    style={{ ...style }}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="notification-icon stroke-black dark:stroke-white"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

export default NotificationIcon;
