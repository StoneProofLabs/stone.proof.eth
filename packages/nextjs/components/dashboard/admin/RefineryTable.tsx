import React, { useMemo, useState } from "react";
import { FaRegCopy } from "react-icons/fa";

interface Refinery {
  id: string;
  avatar: string;
  name: string;
  code: string;
  mineralsRefined: string;
  transactions: string;
  refinesPerMonth: string;
  registeredOn: string;
  document: {
    name: string;
    status: string;
    url: string;
  };
}

interface RefineryTableProps {
  data: Refinery[];
  showActions?: boolean;
  tableTitle?: string;
}

const PAGE_SIZE = 5;

const RefineryTable: React.FC<RefineryTableProps> = ({ data, showActions = false, tableTitle }) => {
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
    <div className="rounded-2xl bg-[#181B20] border border-[#323539] text-white shadow-md overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-[#323539] text-[18px] font-semibold flex items-center justify-between">
        {tableTitle || "Registered Mining Refineries"}
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
              <th className="px-6 py-3 font-medium">Refinery name</th>
              <th className="px-6 py-3 font-medium">Minerals Refined</th>
              <th className="px-6 py-3 font-medium">Transactions</th>
              <th className="px-6 py-3 font-medium">Refines/Month</th>
              <th className="px-6 py-3 font-medium">Registered On</th>
              <th className="px-6 py-3 font-medium">Legal Document</th>
              {showActions && <th className="px-6 py-3 font-medium">Actions</th>}
              {!showActions && <th className="px-2 py-3 font-medium"></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(refinery => (
              <tr key={refinery.id} className="hover:bg-[#23262F] transition-colors">
                {/* Refinery name with avatar and code */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={refinery.avatar} alt={refinery.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-base flex items-center gap-2">{refinery.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {refinery.code}
                        <button
                          className="ml-1 p-1 hover:bg-gray-700 rounded-full transition-colors"
                          onClick={() => handleCopy(refinery.code)}
                          title="Copy code"
                        >
                          <FaRegCopy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                {/* Minerals Refined */}
                <td className="px-6 py-4 whitespace-nowrap">{refinery.mineralsRefined}</td>
                {/* Transactions */}
                <td className="px-6 py-4 whitespace-nowrap">{refinery.transactions}</td>
                {/* Refines/Month */}
                <td className="px-6 py-4 whitespace-nowrap">{refinery.refinesPerMonth}</td>
                {/* Registered On */}
                <td className="px-6 py-4 whitespace-nowrap">{refinery.registeredOn}</td>
                {/* Legal Document */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      {/* Download icon */}
                      <a
                        href={refinery.document.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80"
                      >
                        <img src="/dashboard/icon_set/download.svg" alt="Download" className="w-5 h-5" />
                      </a>
                      {/* PDF icon */}
                      <img src="/dashboard/icon_set/pdf.svg" alt="PDF" className="w-8 h-8" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white leading-tight">{refinery.document.name}</span>
                      <span className="text-xs text-gray-400 leading-tight">{refinery.document.status}</span>
                    </div>
                  </div>
                </td>
                {/* Actions column for Waiting for Approval */}
                {showActions && (
                  <td className="px-6 py-4 text-center">
                    <button
                      className="bg-[#0A77FF] hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 mx-auto"
                      onClick={() => window.location.assign(`/admin/refineries/approval/${refinery.id}`)}
                    >
                      View
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                )}
                {/* Details Arrow */}
                {!showActions && (
                  <td className="px-2 py-4 text-right">
                    <button
                      className="hover:bg-gray-700 rounded-full p-2 transition-colors"
                      onClick={() => window.location.assign(`/admin/refineries/${refinery.id}`)}
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                )}
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

export default RefineryTable;
