import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import WorkerLayout from '../layouts/WorkerLayout';
import CooperativeLayout from '../layouts/CooperativeLayout';

// Public Pages
import LandingPage from '../../pages/public/LandingPage';
import ServicesPage from '../../pages/public/ServicesPage';
import ServiceDetailPage from '../../pages/public/ServiceDetailPage';
import PublicWorkerProfilePage from '../../pages/public/WorkerProfilePage';
import AboutPage from '../../pages/public/AboutPage';
import ContactPage from '../../pages/public/ContactPage';
import LoginPage from '../../pages/public/LoginPage';
import RegisterPage from '../../pages/public/RegisterPage';

// Customer Pages
import CustomerHome from '../../pages/customer/CustomerHome';
import BookingFlowPage from '../../pages/customer/BookingFlowPage';
import CustomerBookingsPage from '../../pages/customer/CustomerBookingsPage';
import BookingDetailsPage from '../../pages/customer/BookingDetailsPage';
import WishlistPage from '../../pages/customer/WishlistPage';
import NotificationsPage from '../../pages/customer/NotificationsPage';
import CustomerProfilePage from '../../pages/customer/CustomerProfilePage';
import CommunityServicesPage from '../../pages/customer/CommunityServicesPage';
import CommunityCleaning from '../../pages/customer/CommunityCleaning';
import CommunityRequestsPage from '../../pages/customer/CommunityRequestsPage';
import CommunityRequestDetailsPage from '../../pages/customer/CommunityRequestDetailsPage';
import UrgentBookingPage from '../../pages/customer/UrgentBookingPage';
import RaiseRequestPage from '../../pages/customer/RaiseRequestPage';
import AIChatbotPage from '../../pages/customer/AIChatbotPage';

// Worker Pages
import WorkerDashboard from '../../pages/worker/WorkerDashboard';
import WorkerJobsPage from '../../pages/worker/WorkerJobsPage';
import WorkerAvailabilityPage from '../../pages/worker/WorkerAvailabilityPage';
import WorkerEarningsPage from '../../pages/worker/WorkerEarningsPage';
import WorkerSelfProfilePage from '../../pages/worker/WorkerProfilePage';
import CommunityJobsPage from '../../pages/worker/CommunityJobsPage';
import CommunityJobDetailsPage from '../../pages/worker/CommunityJobDetailsPage';

// Cooperative Pages
import CooperativeDashboard from '../../pages/cooperative/CooperativeDashboard';
import CooperativeWorkersPage from '../../pages/cooperative/CooperativeWorkersPage';
import FairAllocationPage from '../../pages/cooperative/FairAllocationPage';
import DemandForecastingPage from '../../pages/cooperative/DemandForecastingPage';
import CooperativeBookingsPage from '../../pages/cooperative/CooperativeBookingsPage';
import CooperativeAnalyticsPage from '../../pages/cooperative/CooperativeAnalyticsPage';
import CooperativeSettingsPage from '../../pages/cooperative/CooperativeSettingsPage';

// Route Guard
import ProtectedRoute from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/worker-profile/:id" element={<PublicWorkerProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Customer Experience */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['CUSTOMER', 'WORKER', 'COOPERATIVE']}>
            <CustomerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/book/:serviceId" element={<BookingFlowPage />} />
        <Route path="/customer/book" element={<BookingFlowPage />} />
        <Route path="/customer/bookings" element={<CustomerBookingsPage />} />
        <Route path="/customer/bookings/:id" element={<BookingDetailsPage />} />
        <Route path="/customer/wishlist" element={<WishlistPage />} />
        <Route path="/customer/notifications" element={<NotificationsPage />} />
        <Route path="/customer/profile" element={<CustomerProfilePage />} />
        {/* Community Cleaning Customer Routes */}
        <Route path="/customer/community" element={<CommunityServicesPage />} />
        <Route path="/customer/community/cleaning" element={<CommunityCleaning />} />
        <Route path="/customer/community/requests" element={<CommunityRequestsPage />} />
        <Route path="/customer/community/requests/:id" element={<CommunityRequestDetailsPage />} />
        {/* Urgent Booking */}
        <Route path="/customer/urgent-booking" element={<UrgentBookingPage />} />
        <Route path="/customer/raise-request" element={<RaiseRequestPage />} />
        <Route path="/customer/ai-chat" element={<AIChatbotPage />} />
      </Route>

      {/* Worker Portal */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['WORKER', 'COOPERATIVE']}>
            <WorkerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/worker" element={<WorkerDashboard />} />
        <Route path="/worker/jobs" element={<WorkerJobsPage />} />
        <Route path="/worker/community/jobs" element={<CommunityJobsPage />} />
        <Route path="/worker/community/jobs/:id" element={<CommunityJobDetailsPage />} />
        <Route path="/worker/availability" element={<WorkerAvailabilityPage />} />
        <Route path="/worker/earnings" element={<WorkerEarningsPage />} />
        <Route path="/worker/profile" element={<WorkerSelfProfilePage />} />
      </Route>

      {/* Cooperative Operations Portal */}
      <Route
        element={
          <ProtectedRoute allowedRoles={['COOPERATIVE']}>
            <CooperativeLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/cooperative" element={<CooperativeDashboard />} />
        <Route path="/cooperative/workers" element={<CooperativeWorkersPage />} />
        <Route path="/cooperative/allocation" element={<FairAllocationPage />} />
        <Route path="/cooperative/demand" element={<DemandForecastingPage />} />
        <Route path="/cooperative/bookings" element={<CooperativeBookingsPage />} />
        <Route path="/cooperative/analytics" element={<CooperativeAnalyticsPage />} />
        <Route path="/cooperative/settings" element={<CooperativeSettingsPage />} />
      </Route>

      {/* Fallback Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
