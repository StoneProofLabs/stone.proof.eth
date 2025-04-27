import { SetStateAction, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clipboard, MoreVertical } from "lucide-react";
import { mockTransportRequests } from "~~/data/data";

// Mock data

const ITEMS_PER_PAGE = 4;

export default function TransportRequestsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setFilteredData] = useState<
    {
      id: string;
      location: string;
      locationId: string;
      destination: string;
      destinationDetail: string;
      mineralState: string;
      timestamp: string;
    }[]
  >([]);
  const [currentData, setCurrentData] = useState<
    {
      id: string;
      location: string;
      locationId: string;
      destination: string;
      destinationDetail: string;
      mineralState: string;
      timestamp: string;
    }[]
  >([]);

  // Filter and paginate data
  useEffect(() => {
    const filtered = mockTransportRequests.filter(
      item =>
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.locationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destinationDetail.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredData(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));

    // Reset to first page if filtered results change significantly
    if (currentPage > Math.ceil(filtered.length / ITEMS_PER_PAGE)) {
      setCurrentPage(1);
    }
  }, [searchTerm, currentPage]);

  // Update current page data
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentData(filteredData.slice(startIndex, endIndex));
  }, [filteredData, currentPage]);

  // Copy to clipboard function
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Handle page changes
  const handlePageChange = (page: SetStateAction<number>) => {
    const newPage = typeof page === "function" ? page(currentPage) : page;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Clear activity
  const clearActivity = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "registered":
        return "bg-amber-500 text-white";
      case "inspected":
        return "bg-blue-500 text-white";
      case "purchased":
        return "bg-green-500 text-white";
      case "outstanding":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="text-white min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">All Transport Requests</h1>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search here..."
                className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={clearActivity}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Clear Activity
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-[#252525] border border-[#323539] rounded-lg shadow-lg">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Mineral State</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Timestamp</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map(request => (
                <tr key={request.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-4">
                    <div className="flex items-start md:items-center flex-col md:flex-row">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-md mr-3">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{request.location}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          {request.locationId}
                          <button
                            onClick={() => copyToClipboard(request.locationId, `loc-${request.id}`)}
                            className="ml-2 text-gray-400 hover:text-white focus:outline-none"
                            title="Copy to clipboard"
                          >
                            <Clipboard size={14} />
                          </button>
                          {copiedId === `loc-${request.id}` && (
                            <span className="ml-2 text-xs text-green-400">Copied!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-start md:items-center flex-col md:flex-row">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-md mr-3">
                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{request.destination}</div>
                        <div className="text-sm text-gray-400 flex items-center">
                          {request.destinationDetail}
                          <button
                            onClick={() => copyToClipboard(request.destinationDetail, `dest-${request.id}`)}
                            className="ml-2 text-gray-400 hover:text-white focus:outline-none"
                            title="Copy to clipboard"
                          >
                            <Clipboard size={14} />
                          </button>
                          {copiedId === `dest-${request.id}` && (
                            <span className="ml-2 text-xs text-green-400">Copied!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(request.mineralState)}`}
                    >
                      • {request.mineralState}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-300">{request.timestamp}</td>
                  <td className="px-4 py-4 text-right">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors flex items-center">
                      Update <ArrowRight size={16} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 text-gray-300 rounded-l-md border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" /> Prev
            </button>

            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Show current page and adjacent pages based on current page position
              let pageToShow;
              if (totalPages <= 5) {
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                if (i === 4) pageToShow = totalPages;
                else if (i === 3 && totalPages > 5) pageToShow = "...";
                else pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                if (i === 0) pageToShow = 1;
                else if (i === 1 && totalPages > 5) pageToShow = "...";
                else pageToShow = totalPages - (4 - i);
              } else {
                if (i === 0) pageToShow = 1;
                else if (i === 1) pageToShow = "...";
                else if (i === 3) pageToShow = "...";
                else if (i === 4) pageToShow = totalPages;
                else pageToShow = currentPage;
              }

              return (
                <button
                  key={i}
                  onClick={() => (typeof pageToShow === "number" ? handlePageChange(pageToShow) : null)}
                  className={`px-3 py-2 border-t border-b border-gray-700 
                    ${pageToShow === currentPage ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
                    ${pageToShow === "..." ? "cursor-default" : ""}
                    ${i === 0 ? "" : ""}`}
                >
                  {pageToShow}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-800 text-gray-300 rounded-r-md border border-gray-700 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
