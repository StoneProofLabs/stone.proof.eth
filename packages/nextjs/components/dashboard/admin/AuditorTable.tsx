import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegCopy } from "react-icons/fa";

interface Auditor {
  id: string;
  avatar: string;
  name: string;
  code: string;
  mineralsMined: string;
  disputesInvolved: string;
  transactions: string;
  suppliesPerMonth: string;
  registeredOn: string;
  auditsPerWeek: number;
}

interface AuditorTableProps {
  data: Auditor[];
  tableTitle: string;
  currentTab: "active" | "inactive";
}

const PAGE_SIZE = 5;

const getBadgeColor = (value: number) => {
  if (value >= 200) return "bg-green-500 text-white";
  if (value <= 10) return "bg-red-500 text-white";
  return "bg-yellow-500 text-white";
};

const AuditorTable: React.FC<AuditorTableProps> = ({ data, tableTitle, currentTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, currentPage]);
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const router = useRouter();

  // Copy code to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  // Handle chevron click to navigate to details page with status from currentTab
  const handleChevronClick = (auditor: Auditor) => {
    router.push(`/admin/auditors/${auditor.id}?status=${currentTab}`);
  };

  return (
    <div className="rounded-2xl bg-[#181B20] border border-[#323539] text-white shadow-md overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-[#323539] text-[18px] font-semibold flex items-center justify-between">
        {tableTitle}
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
              <th className="px-6 py-3 font-medium">Enterprise name</th>
              <th className="px-6 py-3 font-medium">Minerals Mined</th>
              <th className="px-6 py-3 font-medium">Disputes Involved</th>
              <th className="px-6 py-3 font-medium">Transactions</th>
              <th className="px-6 py-3 font-medium">Supplies/Month</th>
              <th className="px-6 py-3 font-medium">Registered On</th>
              <th className="px-6 py-3 font-medium">Audits/Week</th>
              <th className="px-2 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(auditor => (
              <tr key={auditor.id} className="hover:bg-[#23262F] transition-colors">
                {/* Enterprise name with avatar and code */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={auditor.avatar} alt={auditor.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-base flex items-center gap-2">{auditor.name}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {auditor.code}
                        <button
                          className="ml-1 p-1 hover:bg-gray-700 rounded-full transition-colors"
                          onClick={() => handleCopy(auditor.code)}
                          title="Copy code"
                        >
                          <FaRegCopy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                {/* Minerals Mined */}
                <td className="px-6 py-4 whitespace-nowrap">{auditor.mineralsMined}</td>
                {/* Disputes Involved */}
                <td className="px-6 py-4 whitespace-nowrap">{auditor.disputesInvolved}</td>
                {/* Transactions */}
                <td className="px-6 py-4 whitespace-nowrap">{auditor.transactions}</td>
                {/* Supplies/Month */}
                <td className="px-6 py-4 whitespace-nowrap">{auditor.suppliesPerMonth}</td>
                {/* Registered On */}
                <td className="px-6 py-4 whitespace-nowrap">{auditor.registeredOn}</td>
                {/* Audits/Week */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${getBadgeColor(auditor.auditsPerWeek)}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current inline-block"></span>
                    {auditor.auditsPerWeek}
                  </span>
                </td>
                {/* Details Arrow */}
                <td className="px-2 py-4 text-right">
                  <button
                    className="hover:bg-gray-700 rounded-full p-2 transition-colors"
                    onClick={() => handleChevronClick(auditor)}
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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

export default AuditorTable;
