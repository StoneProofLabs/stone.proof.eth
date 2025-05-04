import React, { useMemo, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { mockRecentActivities } from "~~/data/data";

const PAGE_SIZE = 7;

function ActionBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold justify-center"
      style={{ background: color, color: "#fff" }}
    >
      <span className="w-2 h-2 rounded-full bg-white/80 inline-block" />
      {label}
    </span>
  );
}

function MediumCell({ type, label, details }: { type: string; label: string; details: string }) {
  return (
    <div className="flex items-center gap-3 min-w-[160px]">
      <div className="w-12 h-10 bg-[#23272b] rounded-lg flex items-center justify-center">
        {/* Replace src with your own visa/truck icon paths */}
        {type === "visa" ? (
          <img src="/dashboard/icon_set/visa.svg" alt="visa" className="w-8 h-6 object-contain" />
        ) : (
          <img src="/dashboard/icon_set/truck.svg" alt="transit" className="w-8 h-6 object-contain" />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-white font-semibold leading-tight text-base">{label}</span>
        <span className="text-xs text-gray-400 font-normal leading-tight">{details}</span>
      </div>
    </div>
  );
}

const ManagementTable = ({ data = mockRecentActivities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, currentPage]);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  // Copy code to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="rounded-2xl bg-[#181B20] border border-[#323539] text-white shadow-md overflow-hidden w-full mt-8">
      <div className="px-6 py-4 border-b border-[#323539] text-[18px] font-semibold flex items-center justify-between">
        Recent Activities
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left min-w-[900px]">
          <thead className="bg-[#23262F]">
            <tr>
              <th className="px-6 py-3 font-medium">Actor info</th>
              <th className="px-6 py-3 font-medium">Action</th>
              <th className="px-6 py-3 font-medium">Timestamp</th>
              <th className="px-6 py-3 font-medium">Mineral</th>
              <th className="px-6 py-3 font-medium">Medium</th>
              <th className="px-2 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#23262F] transition-colors">
                {/* Actor info with avatar/icon and code */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Placeholder for avatar/icon image */}
                    <div className="w-10 h-10 rounded-full bg-[#23272b] flex items-center justify-center">
                      <img src="/logo.svg" alt="actor" className="  w-full object-contain" />
                    </div>
                    <div>
                      <div className="font-semibold text-base flex items-center gap-2">{row.actorName}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {row.actorCode}
                        <button
                          className="ml-1 p-1 hover:bg-gray-700 rounded-full transition-colors"
                          onClick={() => handleCopy(row.actorCode)}
                          title="Copy code"
                        >
                          <img src="/dashboard/icon_set/copy.svg" alt="copy" className="w-5 h-5 opacity-80" />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                {/* Action badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionBadge label={row.action} color={row.actionColor} />
                </td>
                {/* Timestamp */}
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">{row.timestamp}</td>
                {/* Mineral info */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white font-medium leading-tight">{row.mineralName}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      {row.mineralCode}
                      <button
                        className="ml-1 p-1 hover:bg-gray-700 rounded-full transition-colors"
                        onClick={() => handleCopy(row.mineralCode)}
                        title="Copy code"
                      >
                        <img src="/dashboard/icon_set/copy.svg" alt="copy" className="w-5 h-5 opacity-80" />
                      </button>
                    </span>
                  </div>
                </td>
                {/* Medium cell */}
                <td className="px-6 py-4">
                  <MediumCell type={row.mediumType} label={row.mediumLabel} details={row.mediumDetails} />
                </td>
                {/* Action icons placeholder */}
                <td className="px-2 py-4 text-right">
                  {/* Placeholder for action icons (edit, doc, etc.) */}
                  <div className="flex gap-2 justify-end">
                    <img src="/dashboard/icon_set/doc.svg" alt="doc" className="w-5 h-5 opacity-80" />
                    <img src="/dashboard/icon_set/share.svg" alt="edit" className="w-5 h-5 opacity-80" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-[#323539]">
        <button
          className="flex items-center text-gray-400 hover:text-white"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                currentPage === page ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="flex items-center text-gray-400 hover:text-white"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ManagementTable;
