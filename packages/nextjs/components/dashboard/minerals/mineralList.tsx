import { SetStateAction, useState } from "react";
import Icon from "../Icon";

// Main Table Component
export default function MineralListTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  type MineralKey = keyof (typeof minerals)[0];

  const [sortConfig, setSortConfig] = useState<{
    key: MineralKey | null;
    direction: string;
  }>({
    key: null,
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Sample mineral data
  const [minerals, setMinerals] = useState([
    {
      id: 1,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 3000,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Sri Lanka",
      status: "Raw",
      purity: 75,
    },
    {
      id: 2,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 200,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Mauritania",
      status: "In-factory",
      purity: 50,
    },
    {
      id: 3,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 2500,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Faroe Islands",
      status: "Refined",
      purity: 75,
    },
    {
      id: 4,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 305.5,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Kuwait",
      status: "In-transit",
      purity: 25,
    },
    {
      id: 5,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 4000,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Italy",
      status: "Refined",
      purity: 75,
    },
    {
      id: 6,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 4000,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Kuwait",
      status: "In-factory",
      purity: 50,
    },
    {
      id: 7,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 4000,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Singapore",
      status: "In-transit",
      purity: 75,
    },
    {
      id: 8,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 1500,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Brazil",
      status: "Raw",
      purity: 90,
    },
    {
      id: 9,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 750,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Australia",
      status: "Refined",
      purity: 85,
    },
    {
      id: 10,
      name: "mineral-name",
      code: "#ffff-eeee-dddd-3333",
      weight: 2200,
      weightUnit: "KG",
      lbsWeight: 34,
      origin: "Canada",
      status: "In-transit",
      purity: 60,
    },
  ]);

  // Sort function
  const requestSort = (key: MineralKey | null) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Apply sort to data
  const sortedMinerals = [...minerals].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMinerals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(minerals.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  // Select/deselect all rows
  const handleSelectAll = (e: { target: { checked: any } }) => {
    if (e.target.checked) {
      const allIds = currentItems.map(item => item.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  // Select/deselect single row
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    let bgColor = "";
    let dotColor = "";

    switch (status) {
      case "Raw":
        bgColor = "bg-amber-500";
        break;
      case "In-factory":
        bgColor = "bg-blue-500";
        break;
      case "Refined":
        bgColor = "bg-green-500";
        break;
      case "In-transit":
        bgColor = "bg-red-500";
        break;
      default:
        bgColor = "bg-gray-500";
    }

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-md ${bgColor} text-white text-sm`}>
        <span className="mr-1">•</span>
        {status}
      </div>
    );
  };

  // Purity indicator component
  const PurityIndicator = ({ value }: { value: number }) => {
    let bgColor = "bg-blue-500";

    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${bgColor} mr-2`}></div>
        <span>{value}%</span>
      </div>
    );
  };

  // Sort icon component
  const SortIcon = ({ column }: { column: MineralKey | null }) => {
    if (sortConfig.key !== column) {
      return <span className="ml-1">↕</span>;
    }
    return sortConfig.direction === "ascending" ? <span className="ml-1">↓</span> : <span className="ml-1">↑</span>;
  };

  return (
    <div className="bg-[#252525] border border-[#323539] rounded-2xl overflow-hidden w-full">
      {/* Table header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-white text-lg font-medium">Your Transferred Mineral List</h2>
        <button className="text-gray-400">
          <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
        </button>
      </div>

      {/* Table content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  className="rounded bg-gray-700 border-gray-600"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === currentItems.length && currentItems.length > 0}
                />
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Mineral Name & ID
                  <SortIcon column="name" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => requestSort("weight")}
              >
                Weight
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => requestSort("origin")}
              >
                <div className="flex items-center">
                  Origin
                  <SortIcon column="origin" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  Status
                  <SortIcon column="status" />
                </div>
              </th>
              <th
                className="px-4 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => requestSort("purity")}
              >
                <div className="flex items-center">
                  Purity
                  <SortIcon column="purity" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                <div className="flex items-center">
                  Actions
                  <span className="ml-1">↕</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {currentItems.map(mineral => (
              <tr key={mineral.id} className="hover:bg-gray-800">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="rounded bg-gray-700 border-gray-600"
                    checked={selectedRows.includes(mineral.id)}
                    onChange={() => handleSelectRow(mineral.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <img src="/api/placeholder/40/40" alt="Mineral" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="text-white">{mineral.name}</div>
                      <div className="text-gray-400 text-sm flex items-center">
                        {mineral.code}
                        <button className="ml-1">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-white">
                    {mineral.weight} {mineral.weightUnit}
                  </div>
                  <div className="text-gray-400 text-sm">{mineral.lbsWeight}lbs</div>
                </td>
                <td className="px-4 py-4 text-white">{mineral.origin}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={mineral.status} />
                </td>
                <td className="px-4 py-4">
                  <PurityIndicator value={mineral.purity} />
                </td>
                <td className="px-4 py-4">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center">
                    Full Details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-800 flex justify-between">
        <button
          className="flex items-center text-gray-400 hover:text-white"
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
            const pageNumber = index + 1;
            let displayNumber = pageNumber;

            // For longer pagination lists, add more sophisticated logic
            if (totalPages > 5) {
              // Show "..." when there are more pages
              if (pageNumber === 3) {
                return (
                  <span key="ellipsis" className="text-gray-400">
                    ...
                  </span>
                );
              }

              if (pageNumber === 4) {
                displayNumber = 5; // Current page in image
              }

              if (pageNumber === 5) {
                displayNumber = 6;
              }
            }

            return (
              <button
                key={pageNumber}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  displayNumber === 5 ? "bg-blue-500 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
                onClick={() => handlePageChange(displayNumber)}
              >
                {displayNumber}
              </button>
            );
          })}
        </div>

        <button
          className="flex items-center text-gray-400 hover:text-white"
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
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
}
