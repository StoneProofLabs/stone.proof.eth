import StatsIcon from "../admin/StatsIcon";
import StatsCard from "./StatsCard";
import { ChartPieIcon, ClockIcon, DocumentCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export interface AdminStats {
  totalTrips: number;
  completed: number;
  pendingTransfers: number;
  declined: number;
  percentageChanges: {
    total: number;
    completed: number;
    pending: number;
    declined: number;
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
        value={stats.totalTrips}
        label="Overall Trips"
        percentage={stats.percentageChanges.total}
      />

      <StatsCard
        variant="green"
        icon={
          <StatsIcon variant="green">
            <DocumentCheckIcon />
          </StatsIcon>
        }
        value={stats.completed}
        label="Completed"
        percentage={stats.percentageChanges.completed}
      />

      <StatsCard
        variant="orange"
        icon={
          <StatsIcon variant="orange">
            <ClockIcon />
          </StatsIcon>
        }
        value={stats.pendingTransfers}
        label="Pending Transfers"
        percentage={stats.percentageChanges.pending}
      />

      <StatsCard
        variant="red"
        icon={
          <StatsIcon variant="red">
            <ExclamationTriangleIcon />
          </StatsIcon>
        }
        value={stats.declined}
        label="Declined"
        percentage={stats.percentageChanges.declined}
      />
    </div>
  );
}
