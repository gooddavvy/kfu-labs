import React, { useState, useEffect, useCallback } from "react";

// Components
import Modal from "@/components/Modal";
import Datepicker from "@/components/Datepicker";
import ErrorMessage from "@/components/ErrorMessage";

// Utils
import { updateProfileInfo } from "@/utils/profile_api";

const WeightLoss: React.FC<{
  profile: any;
  hidden?: any | undefined;
}> = ({ profile, hidden = true }) => {
  const [isModalClosed, setIsModalClosed] = hidden;
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<React.ReactNode>(null); // Use null instead of empty fragment

  const handleClose = () => setIsModalClosed(true);

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  }, []);

  const handleComplete = useCallback(() => {
    if (!invalid) {
      const parsedCurrentValue = parseInt(currentValue, 10);
      const parsedTarget = parseInt(target, 10);

      if (isNaN(parsedCurrentValue) || isNaN(parsedTarget)) {
        setErrMsg(<ErrorMessage error={new Error("Invalid input values")} />);
        return;
      }

      const newProfile = { ...profile };
      newProfile.goals.push({
        type: "Weight Loss",
        initialValue: parsedCurrentValue,
        currentValue: parsedCurrentValue,
        targetValue: parsedTarget,
        startDate: new Date().toLocaleDateString(),
        deadline: selectedDate,
      });

      updateProfileInfo(newProfile)
        .then(() => {
          console.log("Weight loss goal added");
          handleClose();
          location.reload();
        })
        .catch((err: any) => {
          console.error(err);
          setErrMsg(<ErrorMessage error={err as Error} />);
        });
    }
  }, [invalid, profile, currentValue, target, selectedDate, handleClose]);

  useEffect(() => {
    // Check if any field is empty to determine validity
    if (selectedDate === "" || target === "" || currentValue === "") {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
    console.log("Validity check:", invalid);
  }, [selectedDate, target, currentValue]);

  useEffect(() => {
    // Close the modal only if there's a non-null error message
    if (errMsg !== null) {
      handleClose();
    }
  }, [errMsg, handleClose]);

  return (
    <React.Fragment>
      <Modal isOpen={!isModalClosed} onClose={handleClose}>
        <h4 className="text-xl text-center text-gray-800 dark:text-gray-200">
          Set a realistic goal you can achieve in steps.
        </h4>
        <div className="text-left mt-3">
          <Datepicker label="Choose a deadline." onChange={handleDateChange} />
          <input
            placeholder="Target weight (lbs)"
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full no-spin mt-5 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
          <input
            placeholder="Current weight (lbs)"
            type="number"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full no-spin mt-5 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          />
        </div>
        <button
          className="flex items-center justify-center w-full h-9 mt-5 rounded-none bg-sky-500 hover:bg-sky-600 disabled:bg-[#c6c6c6] disabled:hover:bg-[#c6c6c6] text-white disabled:text-black disabled:cursor-not-allowed"
          onClick={handleComplete}
          disabled={invalid}
        >
          <span className="mt-0.5">Set Goal</span>
        </button>
        <p className="text-center mt-5">
          <b>Note:</b> If today is past the deadline you choose, this goal will
          not be added to the Active Goals list.
        </p>
      </Modal>
      {errMsg}
    </React.Fragment>
  );
};

export default WeightLoss;
