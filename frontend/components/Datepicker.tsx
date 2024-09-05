import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";

interface DatepickerProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (date: string) => void;
}

const Datepicker: React.FC<DatepickerProps> = ({
  label,
  placeholder = "Select a date",
  value,
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(value || "");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setSelectedDate(dateValue);
    if (onChange) {
      // Convert the YYYY-MM-DD string to a locale string while treating it as a local date
      const [year, month, day] = dateValue.split("-");
      const formattedDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      ).toLocaleDateString();
      onChange(formattedDate);
    }
  };

  return (
    <div className="flex flex-col text-left justify-self-start">
      {label && (
        <label className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-500">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-gray-900 dark:text-gray-100"
        />
        <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default Datepicker;
