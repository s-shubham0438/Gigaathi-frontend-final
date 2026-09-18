import React from 'react';
import WorkerManagementTable from '../../features/cooperative/components/WorkerManagementTable';

export const CooperativeWorkersPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Worker Roster & Member Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          View registered trade union members, monitor live availability, and manage workload balancing.
        </p>
      </div>

      <WorkerManagementTable />
    </div>
  );
};

export default CooperativeWorkersPage;
