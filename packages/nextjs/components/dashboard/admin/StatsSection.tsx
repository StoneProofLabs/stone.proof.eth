import StatsCard from "./StatsCard";
import StatsIcon from "./StatsIcon";
import { ChartPieIcon, ClockIcon, DocumentCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export interface AdminStats {
  totalTransactions: number;
  completedTransactions: number;
  pendingTransactions: number;
  disputes: number;
  percentageChanges: {
    total: number;
    completed: number;
    pending: number;
    disputes: number;
  };
}

interface StatsSectionProps {
  stats: AdminStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        variant="blue"
        icon={
          <StatsIcon variant="blue">
            <ChartPieIcon />
          </StatsIcon>
        }
        value={stats.totalTransactions}
        label="Transactions"
        percentage={stats.percentageChanges.total}
      />

      <StatsCard
        variant="green"
        icon={
          <StatsIcon variant="green">
            <DocumentCheckIcon />
          </StatsIcon>
        }
        value={stats.completedTransactions}
        label="Completed Transactions"
        percentage={stats.percentageChanges.completed}
      />

      <StatsCard
        variant="orange"
        icon={
          <StatsIcon variant="orange">
            <ClockIcon />
          </StatsIcon>
        }
        value={stats.pendingTransactions}
        label="Pending"
        percentage={stats.percentageChanges.pending}
      />

      <StatsCard
        variant="red"
        icon={
          <StatsIcon variant="red">
            <ExclamationTriangleIcon />
          </StatsIcon>
        }
        value={stats.disputes}
        label="Disputes"
        percentage={stats.percentageChanges.disputes}
      />
    </div>
  );
}
