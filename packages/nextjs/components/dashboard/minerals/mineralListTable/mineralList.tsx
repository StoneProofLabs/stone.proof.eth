"use client";

import { useMemo, useState } from "react";
import MineralRow from "./MineralRow";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { Mineral, MineralKey, SortConfig } from "./types";

type MineralListTableProps = {
  minerals: Mineral[];
  title?: string;
  isAdmin?: boolean;
  titleBg?: string;
  headerBg?: string;
  rowsBg?: string;
  footerBg?: string;
  containerBg?: string;
};

const PAGE_SIZE = 6;

export default function MineralListTable({
  minerals,
  title,
  isAdmin = false,
  titleBg = "#252525",
  headerBg = "#252525",
  rowsBg = "#252525",
  footerBg = "#252525",
  containerBg = "#252525",
}: MineralListTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "ascending" });
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedMinerals = useMemo(() => {
    if (!sortConfig.key) return minerals;
    const sorted = [...minerals].sort((a, b) => {
      const valA = a[sortConfig.key!];
      const valB = b[sortConfig.key!];

      if (typeof valA === "string" && typeof valB === "string") {
        return valA.localeCompare(valB);
      } else if (typeof valA === "number" && typeof valB === "number") {
        return valA - valB;
      }

      return 0;
    });

    return sortConfig.direction === "ascending" ? sorted : sorted.reverse();
  }, [minerals, sortConfig]);

  const paginatedMinerals = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedMinerals.slice(start, start + PAGE_SIZE);
  }, [sortedMinerals, currentPage]);

  const handleSort = (key: MineralKey) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "ascending" ? "descending" : "ascending" };
      }
      return { key, direction: "ascending" };
    });
  };

  const handleSelect = (id: number) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = paginatedMinerals.map(mineral => mineral.id);
      setSelected(prev => Array.from(new Set([...prev, ...allIds])));
    } else {
      const currentPageIds = paginatedMinerals.map(m => m.id);
      setSelected(prev => prev.filter(id => !currentPageIds.includes(id)));
    }
  };

  const totalPages = Math.ceil(minerals.length / PAGE_SIZE);

  return (
    <div
      className="rounded-xl border border-[#323539] text-white shadow-md overflow-hidden"
      style={{ backgroundColor: containerBg }}
    >
      {title && (
        <div
          className="px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-[#323539]"
          style={{ backgroundColor: titleBg }}
        >
          <h3 className="text-sm sm:text-base font-semibold text-white">{title}</h3>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      )}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[800px] lg:min-w-full">
          <table className="w-full text-sm text-left">
            <TableHeader
              sortConfig={sortConfig}
              onSort={handleSort}
              allSelected={paginatedMinerals.every(m => selected.includes(m.id))}
              onSelectAll={handleSelectAll}
              headerBg={headerBg}
            />
            <tbody style={{ backgroundColor: rowsBg }}>
              {paginatedMinerals.map(mineral => (
                <MineralRow
                  key={mineral.id}
                  mineral={mineral}
                  isSelected={selected.includes(mineral.id)}
                  onSelect={handleSelect}
                  isAdmin={isAdmin}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-4 py-3" style={{ backgroundColor: footerBg }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>
    </div>
  );
}
