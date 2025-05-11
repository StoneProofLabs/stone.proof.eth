import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Copy, MoreHorizontal, Search } from "lucide-react";

export interface RecentTransaction {
  id: string;
  name: string;
  mineralName: string;
  amount: number;
  date: string;
  transactionAccount: {
    type: "Visa" | "Google Pay" | "PayPal" | "Maestro" | "Apple Pay";
    number: string;
    expiry: string;
  };
  reference: string;
}

interface TransactionTableProps {
  transactions: RecentTransaction[];
  itemsPerPage?: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RecentTransaction | "transactionAccount" | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });

  // Copy transaction reference to clipboard
  const copyReference = (reference: string) => {
    navigator.clipboard.writeText(reference);
    //some toast to show copy success
  };

  // Handle sorting
  const requestSort = (key: keyof RecentTransaction | "transactionAccount") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(
        transaction =>
          transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.mineralName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;

        if (!sortConfig.key) {
          return 0;
        }
        if (sortConfig.key === "transactionAccount") {
          aValue = a.transactionAccount.type;
          bValue = b.transactionAccount.type;
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
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
  }, [transactions, searchTerm, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

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

  // Get payment icon based on type
  const getPaymentIcon = (type: string) => {
    switch (type) {
      case "Visa":
        return <div className="bg-blue-900 text-white text-xs px-2 py-1 rounded">VISA</div>;
      case "Google Pay":
        return <div className="text-2xl">G</div>;
      case "PayPal":
        return <div className="text-blue-600">P</div>;
      case "Maestro":
        return (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
        );
      case "Apple Pay":
        return (
          <div className="text-gray-800">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6 5.2c-0.5 0.4-1.2 0.6-1.8 0.6-0.1 0-0.2 0-0.4 0-0.1-0.3-0.2-0.6-0.5-0.9-0.3-0.3-0.8-0.6-1.4-0.6-0.6 0-1.1 0.2-1.4 0.6-0.3 0.3-0.5 0.8-0.5 1.3 0 0.7 0.2 1.5 0.6 2.1 0.2 0.3 0.5 0.6 0.8 0.8 0.3 0.2 0.6 0.3 0.9 0.3 0.3 0 0.6-0.1 0.9-0.2 0.2-0.1 0.5-0.3 0.7-0.5 0.2 0.2 0.5 0.4 0.7 0.5 0.3 0.1 0.6 0.2 0.9 0.2 0.3 0 0.6-0.1 0.9-0.3 0.3-0.2 0.6-0.5 0.8-0.8 0.4-0.6 0.6-1.4 0.6-2.1 0-0.5-0.2-1-0.5-1.3-0.3-0.4-0.8-0.7-1.4-0.7-0.6 0-1.1 0.2-1.4 0.6-0.3 0.3-0.4 0.6-0.5 0.9-0.1 0-0.2 0-0.4 0-0.6 0-1.3-0.2-1.8-0.6" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // Format amount with appropriate sign
  const formatAmount = (amount: number) => {
    const prefix = amount > 0 ? "+" : "";
    return `${prefix}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="text-white p-4 rounded-lg">
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
              setSortConfig({ key: null, direction: "ascending" });
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
        <div className="flex justify-between items-center p-4">
          <h2 className="font-semibold">Total Transactions</h2>
          <button className="text-gray-400 hover:text-white">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-800">
                <th onClick={() => requestSort("name")} className="p-4 cursor-pointer hover:text-white">
                  Name
                </th>
                <th onClick={() => requestSort("mineralName")} className="p-4 cursor-pointer hover:text-white">
                  Mineral Name
                </th>
                <th onClick={() => requestSort("amount")} className="p-4 cursor-pointer hover:text-white">
                  Amount
                </th>
                <th onClick={() => requestSort("date")} className="p-4 cursor-pointer hover:text-white">
                  Date
                </th>
                <th onClick={() => requestSort("transactionAccount")} className="p-4 cursor-pointer hover:text-white">
                  Transaction account
                </th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(transaction => (
                <tr key={transaction.id} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      {transaction.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-gray-400 text-xs">{transaction.reference}</div>
                    </div>
                  </td>
                  <td className="p-4">{transaction.mineralName}</td>
                  <td className={`p-4 ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatAmount(transaction.amount)}
                  </td>
                  <td className="p-4">{transaction.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        {getPaymentIcon(transaction.transactionAccount.type)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {transaction.transactionAccount.type} {transaction.transactionAccount.number}
                        </div>
                        <div className="text-gray-400 text-xs">Expire {transaction.transactionAccount.expiry}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyReference(transaction.reference)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Copy size={18} />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <ChevronRight size={18} />
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
            className={`flex items-center gap-1 ${currentPage === 1 ? "text-gray-600" : "text-gray-400 hover:text-white"}`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex items-center">{renderPaginationItems()}</div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 ${currentPage === totalPages ? "text-gray-600" : "text-gray-400 hover:text-white"}`}
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
            className={`flex items-center gap-1 p-2 ${currentPage === 1 ? "text-gray-600" : "text-gray-400 hover:text-white"}`}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <div className="flex items-center">{renderPaginationItems()}</div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 p-2 ${currentPage === totalPages ? "text-gray-600" : "text-gray-400 hover:text-white"}`}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
