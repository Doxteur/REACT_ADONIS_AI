import { DashboardCard } from '@/components/dashboard-card-stats-graph';
import React from 'react';
import { EnhancedFilterableTable } from '@/components/notes-tables';

function Dashboard() {
  return (
    <div>
      <div className='flex gap-4 justify-between'>
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
      <div className='mt-4'>
        <EnhancedFilterableTable />
      </div>
    </div>
  );
}

export default Dashboard;
