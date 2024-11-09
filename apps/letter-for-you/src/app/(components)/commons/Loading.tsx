import React from "react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex space-x-2">
        <div
          className="w-5 h-5 bg-gray-900 rounded-full animate-bounce-infinite"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-5 h-5 bg-gray-900 rounded-full animate-bounce-infinite"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-5 h-5 bg-gray-900 rounded-full animate-bounce-infinite"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
