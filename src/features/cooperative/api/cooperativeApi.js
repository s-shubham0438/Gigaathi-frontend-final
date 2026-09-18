import mockDb from '../../../mocks/mockDb';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const cooperativeApi = {
  getOverview: async () => {
    await delay(300);
    // Dynamically calculate live counts based on current mockDb bookings and workers
    const allBookings = mockDb.bookings;
    const allWorkers = mockDb.workers;

    const completed = allBookings.filter((b) => b.status === 'COMPLETED').length;
    const requested = allBookings.filter((b) => b.status === 'REQUESTED').length;
    const active = allWorkers.filter((w) => w.isAvailableToday).length;
    const totalVolume = allBookings.reduce((sum, b) => (b.paymentStatus === 'PAID' ? sum + b.price : sum), 428600);

    return {
      ...mockDb.analytics.overview,
      totalWorkers: allWorkers.length,
      activeWorkersToday: active,
      completedJobsCount: completed,
      pendingRequestsCount: requested,
      monthlyVolumeRupees: totalVolume,
      cooperatives: mockDb.cooperatives,
    };
  },

  getDemandForecast: async () => {
    await delay(250);
    return {
      forecast: mockDb.analytics.demandForecast,
      summary: mockDb.analytics.categoryDemandSummary,
      hotspots: mockDb.analytics.hotspots,
    };
  },

  getOpportunityDistribution: async () => {
    await delay(250);
    return mockDb.analytics.opportunityDistribution;
  },

  runFairAllocation: async (category = 'plumbing') => {
    await delay(400);
    return mockDb.calculateFairAllocation(mockDb.workers, category);
  },

  resetDemoState: async () => {
    await delay(200);
    mockDb.resetToDefaults();
    return { success: true };
  },
};

export default cooperativeApi;
