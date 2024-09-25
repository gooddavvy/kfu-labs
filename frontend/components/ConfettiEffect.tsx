// ConfettiEffect.tsx
import React, { useState } from "react";
import Confetti from "react-confetti";

const ConfettiEffect: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // Update width and height on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isVisible && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
    </>
  );
};

export default ConfettiEffect;
