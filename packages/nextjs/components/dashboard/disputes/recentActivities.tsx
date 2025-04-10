import { useState } from "react";

// Define types for props
export interface Notification {
  id: number;
  type: "success" | "warning" | "info" | "shipment";
  title: string;
  date: string;
  content: string;
  actions?: {
    label: string;
    primary: boolean;
    onClick: () => void;
  }[];
}

interface StatusIconProps {
  type: "success" | "warning" | "info" | "shipment";
}

interface NotificationItemProps {
  notification: Notification;
  expanded: boolean;
  toggleExpanded: (id: number) => void;
}

// the status icons
const StatusIcon = ({ type }: StatusIconProps) => {
  switch (type) {
    case "success":
      return (
        <div className="w-6 h-6 rounded-full bg-green-900 flex items-center justify-center text-green-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "warning":
      return (
        <div className="w-6 h-6 rounded-full bg-amber-900 flex items-center justify-center text-amber-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    case "info":
      return (
        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A1 1 0 0010.804 4h.392A1 1 0 0112 5.196v.392a1 1 0 01-1.196.804h-.392A1 1 0 019.196 5v-.392zM9 9.804A1 1 0 0010.804 9h.392A1 1 0 0112 10.196v4.608a1 1 0 01-1.196.804h-.392A1 1 0 019.196 15v-4.608z" />
          </svg>
        </div>
      );
    case "shipment":
      return (
        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-4a1 1 0 00-1-1h-8a1 1 0 00-1 1v.5H3z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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

// notificationItem component
const NotificationItem = ({ notification, expanded, toggleExpanded }: NotificationItemProps) => {
  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg mb-3">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => toggleExpanded(notification.id)}
      >
        <div className="flex items-center">
          <StatusIcon type={notification.type} />
          <div className="ml-3 text-white font-medium">{notification.title}</div>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-4">{notification.date}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transform ${expanded ? "rotate-180" : ""} transition-transform duration-200`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {expanded && (
        <div className="p-4 border-t border-gray-700 text-gray-300">
          <p>{notification.content}</p>
          {notification.actions && (
            <div className="mt-3 flex">
              {notification.actions.map((action, index) => (
                <button
                  key={index}
                  className={`mr-3 px-3 py-1 rounded ${action.primary ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// main notificationList card
export default function NotificationList({
  notifications: initialNotifications = [],
}: {
  notifications: Notification[];
}) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(5);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstItem, indexOfLastItem);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const paginate = (pageNumber: number) => {
    setExpandedId(null);
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  return (
    <div className="p-4 rounded-lg">
      {currentNotifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          expanded={expandedId === notification.id}
          toggleExpanded={toggleExpanded}
        />
      ))}
      <div className="flex justify-center mt-4">
        <div className="flex space-x-1">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-1 rounded ${currentPage === 1 ? "text-gray-600" : "text-gray-400 hover:bg-gray-800"}`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          {Array.from({ length: Math.min(totalPages, 6) }, (_, idx) => {
            let pageNumber = currentPage + idx - 3;
            if (pageNumber < 1 || pageNumber > totalPages) return null;
            return (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`flex items-center px-3 py-1 rounded ${currentPage === pageNumber ? "bg-gray-700 text-white" : "text-gray-400"}`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-1 rounded ${currentPage === totalPages ? "text-gray-600" : "text-gray-400 hover:bg-gray-800"}`}
          >
            Next
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
