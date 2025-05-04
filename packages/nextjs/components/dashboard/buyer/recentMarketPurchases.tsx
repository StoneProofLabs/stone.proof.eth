// MineralsListTable.tsx
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronUp, Copy, MoreHorizontal, Search } from "lucide-react";

export interface MineralItem {
  id: string;
  name: string;
  reference: string;
  weight: {
    value: number;
    unit: string;
  };
  role: string;
  origin: string;
  elapsedTime: {
    value: number;
    unit: "hrs" | "day" | "days" | "months";
  };
  purity: number;
}

interface MineralsListTableProps {
  minerals: MineralItem[];
  itemsPerPage?: number;
}

const MineralsListTable: React.FC<MineralsListTableProps> = ({ minerals, itemsPerPage = 7 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MineralItem | "weight" | "elapsedTime" | "";
    direction: "ascending" | "descending";
  }>({
    key: "",
    direction: "ascending",
  });

  // Copy reference to clipboard
  const copyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    // some toast to show copy success
  };

  // Handle sorting
  const requestSort = (key: keyof MineralItem | "weight" | "elapsedTime") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort minerals
  const filteredAndSortedMinerals = useMemo(() => {
    let filtered = [...minerals];

    if (searchTerm) {
      filtered = filtered.filter(
        mineral =>
          mineral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mineral.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mineral.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mineral.role.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        if (sortConfig.key === "weight") {
          aValue = a.weight.value;
          bValue = b.weight.value;
        } else if (sortConfig.key === "elapsedTime") {
          // Convert to common unit (hours) for comparison
          const getHours = (item: MineralItem) => {
            const { value, unit } = item.elapsedTime;
            switch (unit) {
              case "hrs":
                return value;
              case "day":
                return value * 24;
              case "days":
                return value * 24;
              case "months":
                return value * 30 * 24;
              default:
                return value;
            }
          };
          aValue = getHours(a);
          bValue = getHours(b);
        } else {
          aValue = a[sortConfig.key as keyof MineralItem];
          bValue = b[sortConfig.key as keyof MineralItem];
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [minerals, searchTerm, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedMinerals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedMinerals.slice(indexOfFirstItem, indexOfLastItem);

  // Generate pagination elements
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3; // Show max 3 page numbers

    // Always show first page
    items.push(
      <button
        key="page-1"
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-2 ${currentPage === 1 ? "text-blue-500" : "text-gray-400"}`}
      >
        1
      </button>,
    );

    // Logic for middle pages
    if (totalPages > 1) {
      if (totalPages <= maxVisiblePages) {
        // Show all pages if total pages is small
        for (let i = 2; i <= totalPages; i++) {
          items.push(
            <button
              key={`page-${i}`}
              onClick={() => setCurrentPage(i)}
              className={`px-3 py-2 ${currentPage === i ? "text-blue-500" : "text-gray-400"}`}
            >
              {i}
            </button>,
          );
        }
      } else {
        // Show ellipsis when needed
        if (currentPage > 2) {
          items.push(
            <span key="ellipsis-1" className="px-3 py-2 text-gray-400">
              ...
            </span>,
          );
        }

        // Show current page if it's not 1 or last page
        if (currentPage !== 1 && currentPage !== totalPages) {
          items.push(
            <button
              key={`page-${currentPage}`}
              onClick={() => setCurrentPage(currentPage)}
              className="px-3 py-2 text-blue-500"
            >
              {currentPage}
            </button>,
          );
        }

        if (currentPage < totalPages - 1) {
          items.push(
            <span key="ellipsis-2" className="px-3 py-2 text-gray-400">
              ...
            </span>,
          );
        }

        // Always show last page if more than 1 page
        items.push(
          <button
            key={`page-${totalPages}`}
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-2 ${currentPage === totalPages ? "text-blue-500" : "text-gray-400"}`}
          >
            {totalPages}
          </button>,
        );
      }
    }

    return items;
  };

  // Render sort indicator
  const renderSortIndicator = (key: keyof MineralItem | "weight" | "elapsedTime") => {
    if (sortConfig.key !== key) {
      return <ChevronUp size={14} className="opacity-30" />;
    }

    return sortConfig.direction === "ascending" ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  // Format elapsed time with color indicator
  const renderElapsedTime = (item: MineralItem) => {
    const { value, unit } = item.elapsedTime;

    let color = "bg-green-500"; // Default color
    if (unit === "days" || unit === "months") {
      if (unit === "days" && value > 7) {
        color = "bg-yellow-500";
      } else if (unit === "months") {
        color = "bg-red-500";
      } else {
        color = "bg-yellow-500";
      }
    }

    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`}></div>
        <span>
          {value} {unit}
        </span>
      </div>
    );
  };

  // Render purity bar
  const renderPurityBar = (purity: number) => {
    return (
      <div className="flex items-center gap-4">
        <div className="w-24 bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${purity}%` }}></div>
        </div>
        <span>{purity}%</span>
      </div>
    );
  };

  return (
    <div className=" text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Recent Purchases</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setSortConfig({ key: "", direction: "ascending" });
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Activity
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[#252525] border border-[#323539] rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="font-semibold">Your Refined Minerals List</h2>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th className="p-4 w-12">
                  <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                </th>
                <th onClick={() => requestSort("name")} className="p-4 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Mineral Name & ID {renderSortIndicator("name")}</div>
                </th>
                <th onClick={() => requestSort("weight")} className="p-4 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Weight {renderSortIndicator("weight")}</div>
                </th>
                <th onClick={() => requestSort("origin")} className="p-4 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Origin {renderSortIndicator("origin")}</div>
                </th>
                <th onClick={() => requestSort("elapsedTime")} className="p-4 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Elapsed Time {renderSortIndicator("elapsedTime")}</div>
                </th>
                <th onClick={() => requestSort("purity")} className="p-4 cursor-pointer hover:text-white">
                  <div className="flex items-center gap-1">Purity {renderSortIndicator("purity")}</div>
                </th>
                <th className="p-4">
                  <div className="flex items-center gap-1">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(mineral => (
                <tr key={mineral.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-4">
                    <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        {mineral.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{mineral.name}</div>
                        <div className="text-gray-400 text-xs">{mineral.reference}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">
                      {mineral.weight.value} {mineral.weight.unit}
                    </div>
                    <div className="text-gray-400 text-xs">{mineral.role}</div>
                  </td>
                  <td className="p-4">{mineral.origin}</td>
                  <td className="p-4">{renderElapsedTime(mineral)}</td>
                  <td className="p-4">{renderPurityBar(mineral.purity)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyReference(mineral.reference)}
                        className="p-1 bg-gray-700 hover:bg-gray-600 rounded"
                      >
                        <Copy size={14} />
                      </button>
                      <button className="p-1 px-4 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center gap-1">
                        Buy <ChevronRight size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 border-t border-gray-800">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 ${currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-white"}`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex items-center">{renderPaginationItems()}</div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 ${currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-white"}`}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom pagination - duplicate of the top one */}
      <div className="flex justify-center mt-4">
        <div className="bg-gray-900 rounded-lg flex items-center px-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 p-2 ${currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-white"}`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex items-center">{renderPaginationItems()}</div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 p-2 ${currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-white"}`}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MineralsListTable;
