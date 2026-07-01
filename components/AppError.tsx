"use client";
import React from "react";
import { FiAlertCircle } from "react-icons/fi";

interface AppErrorProps {
  message: string | null;
  onClear?: () => void;
}

export const AppError = ({ message, onClear }: AppErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-3 p-3.5 mb-5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg relative shadow-sm animate-shake">
      <FiAlertCircle className="flex-shrink-0 text-red-500" size={18} />
      <span className="flex-1 font-medium">{message}</span>
      {onClear && (
        <button
          onClick={onClear}
          className="text-red-400 hover:text-red-700 font-bold ml-2 cursor-pointer focus:outline-none transition-colors"
          aria-label="Dismiss error"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default AppError;
