import React from 'react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useWorkers } from '../../features/workers/hooks/useWorkers';
import AvailabilityEditor from '../../features/workers/components/AvailabilityEditor';

export const WorkerAvailabilityPage = () => {
  const { user } = useAuth();
  const workerId = user?.workerId || 'wrk-1';
  const { workers, updateAvailability } = useWorkers(true);

  const currentWorker = workers.find((w) => w.id === workerId) || workers[0];

  const handleSaveSchedule = (schedule) => {
    updateAvailability(workerId, schedule);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Manage Working Hours & Schedule
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure which days of the week you accept service requests and specify your working time shifts.
        </p>
      </div>

      <AvailabilityEditor
        initialAvailability={currentWorker?.availability}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

export default WorkerAvailabilityPage;
