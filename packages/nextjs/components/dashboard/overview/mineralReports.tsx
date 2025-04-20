/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

interface Report {
  id: string;
  title: string;
  mineral: string;
  date: string;
}

interface MineralReportsProps {
  reports: Report[];
  title?: string;
  refreshLabel?: string;
  onRefresh?: () => void;
  onViewDetails?: (reportId: string) => void;
}

export default function MineralReports({
  reports,
  title = "Mineral Reports",
  refreshLabel = "Refresh List",
  onRefresh = () => {},
  onViewDetails = () => {},
}: MineralReportsProps) {
  return (
    <div className="bg-[#252525] border border-[#323539] rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-lg font-medium">{title}</h3>
      </div>

      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 16V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8H12.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">{report.title}</p>
                <p className="text-gray-400 text-sm">
                  {report.mineral} - {report.date}
                </p>
              </div>
            </div>
            <button
              onClick={() => onViewDetails(report.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <button onClick={onRefresh} className="flex items-center gap-1 text-blue-500 hover:text-blue-400 mt-4 mx-auto">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {refreshLabel}
      </button>
    </div>
  );
}
