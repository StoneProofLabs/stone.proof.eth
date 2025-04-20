import { useState } from "react";

// Alert Icon Components
const AlertIcon = ({ type }: { type: "error" | "success" | "warning" | "info" }) => {
  switch (type) {
    case "error":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-900 flex items-center justify-center text-red-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "success":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-green-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "warning":
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-900 flex items-center justify-center text-amber-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "info":
    default:
      return (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-blue-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
  }
};

// Main Notification Card Component
interface NotificationCardProps {
  type?: "error" | "success" | "warning" | "info";
  title: string;
  message: string;
  onClose: () => void;
  onShowMore?: () => void;
}

export default function NotificationCard({
  type = "info",
  title,
  message,
  onClose,
  onShowMore,
}: NotificationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleShowMore = () => {
    setExpanded(!expanded);
    if (onShowMore) onShowMore();
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg p-4 mb-4 relative shadow-lg">
      <div className="flex items-start">
        <AlertIcon type={type} />

        <div className="ml-4 flex-grow">
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <p className="text-gray-400 mt-1">{message}</p>

          {expanded && (
            <div className="mt-3 text-gray-400 border-t border-gray-700 pt-3">
              <p>This is the additional details of the notification.</p>
              {/* we will get the additional details from the server */}
            </div>
          )}

          <button onClick={handleShowMore} className="mt-3 flex items-center text-gray-400 hover:text-white">
            {expanded ? "Show Less" : "Show More"}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        <button onClick={onClose} className="text-gray-500 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
