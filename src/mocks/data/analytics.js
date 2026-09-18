export const mockAnalytics = {
  overview: {
    totalWorkers: 184,
    activeWorkersToday: 142,
    todayBookingsCount: 38,
    pendingRequestsCount: 6,
    completedJobsCount: 29,
    monthlyVolumeRupees: 428600,
    welfareFundRupees: 428000,
    averageRating: 4.89,
    fairnessIndexPercent: 91,
    trends: {
      bookingsGrowth: "+18.4%",
      workerIncomeGrowth: "+24.2%",
      satisfactionRate: "98.2%",
      fairOpportunitySpread: "89%",
    }
  },

  // 7-day Predictive Demand Forecasting (SIH Differentiator)
  demandForecast: [
    { day: "Mon (Today)", plumbing: 82, electrical: 68, cleaning: 91, carpentry: 48, appliance: 62, painting: 35 },
    { day: "Tue (Tomorrow)", plumbing: 104, electrical: 74, cleaning: 88, carpentry: 52, appliance: 70, painting: 38 },
    { day: "Wed", plumbing: 96, electrical: 82, cleaning: 94, carpentry: 56, appliance: 78, painting: 42 },
    { day: "Thu", plumbing: 88, electrical: 79, cleaning: 102, carpentry: 60, appliance: 84, painting: 45 },
    { day: "Fri", plumbing: 92, electrical: 85, cleaning: 115, carpentry: 64, appliance: 90, painting: 50 },
    { day: "Sat", plumbing: 120, electrical: 110, cleaning: 145, carpentry: 85, appliance: 118, painting: 68 },
    { day: "Sun", plumbing: 115, electrical: 95, cleaning: 138, carpentry: 72, appliance: 105, painting: 55 },
  ],

  // Service demand category breakdown
  categoryDemandSummary: [
    { name: "Deep Cleaning", currentDemand: 91, predictedChange: "+26%", color: "#10b981", status: "High Surge", recommendedStaff: "+5 workers" },
    { name: "Plumbing", currentDemand: 82, predictedChange: "+34%", color: "#0ea5e9", status: "Urgent Demand", recommendedStaff: "+4 workers" },
    { name: "Appliance Repair", currentDemand: 62, predictedChange: "+19%", color: "#6366f1", status: "Steady Increase", recommendedStaff: "+3 workers" },
    { name: "Electrician", currentDemand: 68, predictedChange: "+15%", color: "#f59e0b", status: "Moderate", recommendedStaff: "+2 workers" },
    { name: "Carpentry", currentDemand: 48, predictedChange: "+12%", color: "#d97706", status: "Normal", recommendedStaff: "+1 worker" },
    { name: "Painting", currentDemand: 35, predictedChange: "+8%", color: "#ec4899", status: "Normal", recommendedStaff: "Sufficient" },
  ],

  // Opportunity Distribution across Cooperative Workers (SIH Differentiator: Preventing Worker Starvation / Overload)
  opportunityDistribution: [
    { worker: "Rahul Verma", category: "Plumbing", jobsAssignedThisMonth: 22, rating: 4.88, fairnessScore: 92, status: "Balanced" },
    { worker: "Rajesh Sharma", category: "Electrical", jobsAssignedThisMonth: 24, rating: 4.92, fairnessScore: 89, status: "Optimal" },
    { worker: "Anita Jadhav", category: "Cleaning", jobsAssignedThisMonth: 25, rating: 4.95, fairnessScore: 94, status: "Balanced" },
    { worker: "Sunil Shinde", category: "Carpentry", jobsAssignedThisMonth: 19, rating: 4.85, fairnessScore: 95, status: "Under-allocated (Eligible for Boost)" },
    { worker: "Sanjay Mane", category: "Appliance", jobsAssignedThisMonth: 21, rating: 4.89, fairnessScore: 90, status: "Balanced" },
    { worker: "Deepak More", category: "Maintenance", jobsAssignedThisMonth: 20, rating: 4.87, fairnessScore: 91, status: "Balanced" },
    { worker: "Ganesh Gaikwad", category: "Gardening", jobsAssignedThisMonth: 18, rating: 4.90, fairnessScore: 93, status: "Under-allocated (Eligible for Boost)" },
    { worker: "Pooja Salunkhe", category: "Beauty", jobsAssignedThisMonth: 23, rating: 4.96, fairnessScore: 88, status: "Optimal" },
    { worker: "Vikram Kadam", category: "Painting", jobsAssignedThisMonth: 16, rating: 4.82, fairnessScore: 96, status: "Under-allocated (Eligible for Boost)" },
    { worker: "Shalini Tambe", category: "Community", jobsAssignedThisMonth: 21, rating: 4.97, fairnessScore: 92, status: "Balanced" },
  ],

  // High Demand Hotspots in Pune
  hotspots: [
    { zone: "Kothrud & Karve Nagar", primaryNeed: "Plumbing & Electrical", demandLevel: "Very High", activeCoopWorkers: 28 },
    { zone: "Aundh & Baner", primaryNeed: "Deep Cleaning & AC Servicing", demandLevel: "Surging (+40%)", activeCoopWorkers: 32 },
    { zone: "Viman Nagar & Kalyani Nagar", primaryNeed: "Appliance & Furniture Assembly", demandLevel: "High", activeCoopWorkers: 22 },
    { zone: "Hadapsar & Magarpatta", primaryNeed: "Home Maintenance & Painting", demandLevel: "Moderate", activeCoopWorkers: 19 },
  ],

  // Worker Earnings Chart Simulation (for WorkerDashboard)
  workerWeeklyEarnings: [
    { day: "Mon", amount: 950, jobs: 2 },
    { day: "Tue", amount: 1400, jobs: 3 },
    { day: "Wed", amount: 800, jobs: 2 },
    { day: "Thu", amount: 1650, jobs: 4 },
    { day: "Fri", amount: 1200, jobs: 3 },
    { day: "Sat", amount: 1950, jobs: 4 },
    { day: "Sun", amount: 650, jobs: 1 },
  ],
};
