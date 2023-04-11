import React from "react";
import ReactDOM from "react-dom";
import style from "./toast.module.css";

interface ToastProps {
  message: string;
}

function Toast({ message }: ToastProps) {
  return ReactDOM.createPortal(
    <div
      className={
        "flex items-center w-full max-w-xs p-3 text-gray-500 bg-slate-200 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 justify-center " +
        style.toast
      }
    >
      <div className="text-sm font-bold">{message}</div>
    </div>,
    document.getElementById("toast-root")!
  );
}

export default Toast;
