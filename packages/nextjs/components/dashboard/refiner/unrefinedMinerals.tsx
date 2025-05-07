import { SetStateAction, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Copy, MoreVertical, Search } from "lucide-react";

// @ts-ignore
export default function UnrefinedMineralsTable({ minerals, selectedMineral, onSelectMineral }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const itemsPerPage = 8;

  // Filter minerals based on search term
  const filteredMinerals = minerals.filter(
    (mineral: { name: string; id: string }) =>
      mineral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mineral.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort minerals
  const sortedMinerals = [...filteredMinerals].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedMinerals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMinerals = sortedMinerals.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field: SetStateAction<string>) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // @ts-ignore
  const handleCopyId = (id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
  };

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-lg overflow-hidden w-full">
      <div className="p-4 border-b border-[#2B2D2F]">
        <h2 className="text-white text-xl font-medium mb-4">Your Refined Minerals List</h2>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full bg-[#2B2D2F] text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-[#2B2D2F]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr className="text-gray-400 text-left text-sm">
                <th className="p-3 w-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort("name")}>
                  <div className="flex items-center">
                    Mineral Name & ID
                    {sortField === "name" && (
                      <ArrowDown
                        size={14}
                        className={`ml-1 ${sortDirection === "desc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort("weight")}>
                  <div className="flex items-center">
                    Weight
                    {sortField === "weight" && (
                      <ArrowDown
                        size={14}
                        className={`ml-1 ${sortDirection === "desc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
                <th className="p-3 cursor-pointer" onClick={() => handleSort("ellapsedTime")}>
                  <div className="flex items-center">
                    Ellapsed Time
                    {sortField === "ellapsedTime" && (
                      <ArrowDown
                        size={14}
                        className={`ml-1 ${sortDirection === "desc" ? "transform rotate-180" : ""}`}
                      />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {currentMinerals.map(mineral => (
                <tr
                  key={mineral.id}
                  className={`hover:bg-gray-600 cursor-pointer ${selectedMineral?.id === mineral.id ? "bg-gray-600" : ""}`}
                  onClick={() => onSelectMineral(mineral)}
                >
                  <td className="p-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        checked={selectedMineral?.id === mineral.id}
                        onChange={() => onSelectMineral(mineral)}
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <img src={mineral.image} alt={mineral.name} className="h-10 w-10 rounded-full mr-3 bg-gray-700" />
                      <div>
                        <div className="text-white">{mineral.name}</div>
                        <div className="text-gray-500 flex items-center text-xs">
                          {mineral.id}
                          <button
                            onClick={e => handleCopyId(mineral.id, e)}
                            className="ml-1 text-gray-400 hover:text-blue-400"
                          >
                            <Copy size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="text-white">{mineral.weight}</div>
                      <div className="text-gray-500 text-xs">{mineral.manager}</div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div
                      className={`flex items-center ${
                        mineral.ellapsedTime.includes("hrs")
                          ? "text-green-500"
                          : mineral.ellapsedTime.includes("day")
                            ? "text-blue-500"
                            : mineral.ellapsedTime.includes("days")
                              ? "text-yellow-500"
                              : "text-red-500"
                      }`}
                    >
                      <span className="inline-block w-2 h-2 rounded-full mr-2 bg-current"></span>
                      {mineral.ellapsedTime}
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-gray-400">
            <button
              className="flex items-center disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={16} className="mr-1" />
              Prev
            </button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === pageNumber ? "bg-blue-600 text-white" : "hover:bg-gray-[#2B2D2F]"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span>...</span>
                  <button
                    className="w-8 h-8 rounded-md hover:bg-gray-[#2B2D2F]"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              className="flex items-center disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
