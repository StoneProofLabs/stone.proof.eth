import { useState } from "react";
import Link from "next/link";

// Define types for props
export interface Notifications {
  id: number;
  type: "success" | "warning" | "info" | "shipment" | "error";
  title: string;
  date: string;
  content?: string;
  status: "Resolved" | "Escalated" | "Pending" | "Complainant" | "In Progress" | "Rejected";
  secondaryStatus?: "Complainant" | "Escalated" | "Pending" | "High Priority";
  reference?: string;
  bgColor?: string;
  expandedBgColor?: string;
  borderColor?: string;
}

interface StatusIconProps {
  type: "success" | "warning" | "info" | "shipment" | "error";
}

interface NotificationItemProps {
  notification: Notifications;
  expanded: boolean;
  toggleExpanded: (id: number) => void;
}

interface NotificationListProps {
  notifications: Notifications[];
  baseUrl?: string;
  bgColor?: string;
  expandedBgColor?: string;
  borderColor?: string;
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let bgColor = "";

  switch (status) {
    case "Resolved":
      bgColor = "bg-green-500";
      break;
    case "Escalated":
      bgColor = "bg-red-500";
      break;
    case "Pending":
      bgColor = "bg-blue-500";
      break;
    case "Complainant":
      bgColor = "bg-blue-600";
      break;
    case "In Progress":
      bgColor = "bg-yellow-500";
      break;
    case "Rejected":
      bgColor = "bg-red-600";
      break;
    case "High Priority":
      bgColor = "bg-orange-500";
      break;
    default:
      bgColor = "bg-gray-500";
  }

  return (
    <div
      className={`px-2 sm:px-4 py-1 rounded-full ${bgColor} text-white text-xs sm:text-sm font-medium whitespace-nowrap`}
    >
      {status}
    </div>
  );
};

// Status icon component
const StatusIcon = ({ type }: StatusIconProps) => {
  let iconPath = "";
  let bgColor = "";

  switch (type) {
    case "success":
      iconPath =
        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z";
      bgColor = "bg-green-600";
      break;
    case "warning":
      iconPath =
        "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z";
      bgColor = "bg-yellow-600";
      break;
    case "info":
      iconPath =
        "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z";
      bgColor = "bg-blue-600";
      break;
    case "shipment":
      iconPath =
        "M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M3 4h3.879a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H16a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z";
      bgColor = "bg-purple-600";
      break;
    case "error":
      iconPath =
        "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z";
      bgColor = "bg-red-600";
      break;
    default:
      iconPath =
        "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z";
      bgColor = "bg-gray-600";
  }

  return (
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${bgColor} flex items-center justify-center text-white flex-shrink-0`}
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
      </svg>
    </div>
  );
};

// Notification item component (accordion style)
const NotificationItem = ({
  notification,
  expanded,
  toggleExpanded,
  baseUrl = "",
}: NotificationItemProps & { baseUrl?: string }) => {
  return (
    <div
      className={`${notification.bgColor || "bg-[#121212]"} border ${notification.borderColor || "border-[#2a2a2a]"} rounded-lg mb-3`}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 cursor-pointer gap-3 sm:gap-0"
        onClick={() => toggleExpanded(notification.id)}
      >
        <div className="flex items-center">
          <StatusIcon type={notification.type} />
          <div className="ml-3 sm:ml-4 min-w-0 flex-1">
            <div className="text-white font-medium text-base sm:text-lg truncate">{notification.title}</div>
            {notification.reference && (
              <div className="text-gray-400 text-xs sm:text-sm">Ref: {notification.reference}</div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 ml-11 sm:ml-0">
          <span className="text-gray-400 text-sm order-1 sm:order-none">{notification.date}</span>

          {notification.secondaryStatus && <StatusBadge status={notification.secondaryStatus} />}

          <StatusBadge status={notification.status} />

          <svg
            className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transform ${expanded ? "rotate-180" : ""} transition-transform duration-200 ml-auto sm:ml-0`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className={`p-4 sm:p-6 border-t border-gray-800 text-gray-400 ${notification.expandedBgColor || ""}`}>
          <p className="mb-3 text-sm sm:text-base">
            {notification.content || "No additional details available for this notification."}
          </p>

          <div className="flex justify-end">
            <Link
              href={`/${baseUrl}/disputes/disputeDetails/${notification.id}`}
              className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base"
            >
              View Full Details
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// NotificationList component
export const NotificationList = ({
  notifications,
  baseUrl = "",
  bgColor,
  expandedBgColor,
  borderColor,
}: NotificationListProps) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="">
      {(notifications ?? []).map(notification => {
        // Apply global bgColor and expandedBgColor if provided in props
        const notificationWithStyles = {
          ...notification,
          bgColor: notification.bgColor || bgColor,
          expandedBgColor: notification.expandedBgColor || expandedBgColor,
          borderColor: notification.borderColor || borderColor,
        };

        return (
          <NotificationItem
            key={notification.id}
            notification={notificationWithStyles}
            expanded={expandedId === notification.id}
            toggleExpanded={toggleExpanded}
            baseUrl={baseUrl}
          />
        );
      })}
    </div>
  );
};