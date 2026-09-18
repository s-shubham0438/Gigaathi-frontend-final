import { mockCategories } from './data/categories';
import { mockServices } from './data/services';
import { mockWorkers } from './data/workers';
import { mockUsers } from './data/users';
import { mockBookings } from './data/bookings';
import { mockReviews } from './data/reviews';
import { mockNotifications } from './data/notifications';
import { mockCooperatives } from './data/cooperatives';
import { mockAnalytics } from './data/analytics';

const DB_KEYS = {
  SERVICES: 'gigsaathi_db_services',
  WORKERS: 'gigsaathi_db_workers',
  BOOKINGS: 'gigsaathi_db_bookings',
  REVIEWS: 'gigsaathi_db_reviews',
  NOTIFICATIONS: 'gigsaathi_db_notifications',
  WISHLIST: 'gigsaathi_db_wishlist',
};

const safeGetStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`LocalStorage write error for ${key}:`, err);
  }
};

class MockDatabase {
  constructor() {
    this.categories = [...mockCategories];
    this.users = [...mockUsers];
    this.cooperatives = [...mockCooperatives];
    this.analytics = JSON.parse(JSON.stringify(mockAnalytics));

    // Stateful entities synced with localStorage
    this.services = safeGetStorage(DB_KEYS.SERVICES, [...mockServices]);
    this.workers = safeGetStorage(DB_KEYS.WORKERS, [...mockWorkers]);
    this.bookings = safeGetStorage(DB_KEYS.BOOKINGS, [...mockBookings]);
    this.reviews = safeGetStorage(DB_KEYS.REVIEWS, [...mockReviews]);
    this.notifications = safeGetStorage(DB_KEYS.NOTIFICATIONS, [...mockNotifications]);
    this.wishlist = safeGetStorage(DB_KEYS.WISHLIST, ["srv-plumb-1", "srv-elec-2"]);
  }

  persist() {
    safeSetStorage(DB_KEYS.SERVICES, this.services);
    safeSetStorage(DB_KEYS.WORKERS, this.workers);
    safeSetStorage(DB_KEYS.BOOKINGS, this.bookings);
    safeSetStorage(DB_KEYS.REVIEWS, this.reviews);
    safeSetStorage(DB_KEYS.NOTIFICATIONS, this.notifications);
    safeSetStorage(DB_KEYS.WISHLIST, this.wishlist);
  }

  resetToDefaults() {
    this.services = [...mockServices];
    this.workers = [...mockWorkers];
    this.bookings = [...mockBookings];
    this.reviews = [...mockReviews];
    this.notifications = [...mockNotifications];
    this.wishlist = ["srv-plumb-1", "srv-elec-2"];
    this.persist();
  }

  // SERVICES
  getServices({ search = '', category = '', sortBy = 'recommended' } = {}) {
    let list = [...this.services];

    if (category && category !== 'all') {
      list = list.filter((s) => s.categoryId === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter((s) =>
        s.title.toLowerCase().includes(q) ||
        s.hindiTitle?.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }

  getServiceById(id) {
    return this.services.find((s) => s.id === id) || null;
  }

  // WORKERS
  getWorkers({ category = '', minRating = 0, verifiedOnly = false } = {}) {
    let list = [...this.workers];

    if (category && category !== 'all') {
      list = list.filter((w) => w.category === category);
    }

    if (minRating > 0) {
      list = list.filter((w) => w.rating >= minRating);
    }

    if (verifiedOnly) {
      list = list.filter((w) => w.isVerified);
    }

    return list;
  }

  getWorkerById(id) {
    return this.workers.find((w) => w.id === id) || null;
  }

  updateWorkerAvailability(workerId, availabilityData) {
    const idx = this.workers.findIndex((w) => w.id === workerId);
    if (idx !== -1) {
      this.workers[idx].availability = { ...this.workers[idx].availability, ...availabilityData };
      this.persist();
      return this.workers[idx];
    }
    return null;
  }

  toggleWorkerOnlineStatus(workerId) {
    const idx = this.workers.findIndex((w) => w.id === workerId);
    if (idx !== -1) {
      this.workers[idx].isAvailableToday = !this.workers[idx].isAvailableToday;
      this.persist();
      return this.workers[idx];
    }
    return null;
  }

  // BOOKINGS
  getBookings({ customerId, workerId, status } = {}) {
    let list = [...this.bookings];

    if (customerId) {
      list = list.filter((b) => b.customerId === customerId);
    }

    if (workerId) {
      list = list.filter((b) => b.workerId === workerId);
    }

    if (status && status !== 'ALL') {
      list = list.filter((b) => b.status === status);
    }

    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getBookingById(id) {
    return this.bookings.find((b) => b.id === id) || null;
  }

  createBooking(bookingData) {
    const id = `bk-${Date.now().toString().slice(-4)}`;
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newBooking = {
      id,
      ...bookingData,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      timeline: [
        { status: 'REQUESTED', time: nowStr, label: 'Booking Requested by Customer', completed: true },
        { status: 'ACCEPTED', time: '', label: 'Worker Acceptance Pending', completed: false },
        { status: 'IN_PROGRESS', time: '', label: 'Service In Progress', completed: false },
        { status: 'COMPLETED', time: '', label: 'Service Completed', completed: false },
      ],
    };

    this.bookings.unshift(newBooking);

    // Create notification for the assigned worker
    this.notifications.unshift({
      id: `notif-${Date.now()}`,
      recipientId: newBooking.workerId,
      recipientRole: 'WORKER',
      title: 'New Service Request Nearby!',
      message: `${newBooking.customerName} requested '${newBooking.serviceTitle}' for ${newBooking.timeSlot}.`,
      type: 'NEW_JOB_REQUEST',
      bookingId: id,
      time: 'Just now',
      isRead: false,
      icon: 'BellRing',
    });

    this.persist();
    return newBooking;
  }

  updateBookingStatus(bookingId, newStatus) {
    const idx = this.bookings.findIndex((b) => b.id === bookingId);
    if (idx === -1) return null;

    const booking = this.bookings[idx];
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    booking.status = newStatus;

    if (newStatus === 'ACCEPTED') {
      booking.timeline[1].completed = true;
      booking.timeline[1].time = nowStr;
      booking.timeline[1].label = `${booking.workerName} Accepted Job`;

      this.notifications.unshift({
        id: `notif-${Date.now()}`,
        recipientId: booking.customerId,
        recipientRole: 'CUSTOMER',
        title: 'Booking Accepted!',
        message: `${booking.workerName} has accepted your request for ${booking.serviceTitle}.`,
        type: 'BOOKING_ACCEPTED',
        bookingId: booking.id,
        time: 'Just now',
        isRead: false,
        icon: 'CheckCircle',
      });
    } else if (newStatus === 'IN_PROGRESS') {
      booking.timeline[2].completed = true;
      booking.timeline[2].time = nowStr;
      booking.timeline[2].label = `Service Started by ${booking.workerName}`;
    } else if (newStatus === 'COMPLETED') {
      booking.timeline[3].completed = true;
      booking.timeline[3].time = nowStr;
      booking.timeline[3].label = 'Service Inspected & Completed';
      booking.paymentStatus = 'PAID';

      // Update worker completed jobs & welfare fund
      const workerIdx = this.workers.findIndex((w) => w.id === booking.workerId);
      if (workerIdx !== -1) {
        this.workers[workerIdx].completedJobs += 1;
        this.workers[workerIdx].welfareBalance += Math.round(booking.price * 0.05); // 5% welfare allocation
      }

      this.notifications.unshift({
        id: `notif-${Date.now()}`,
        recipientId: booking.customerId,
        recipientRole: 'CUSTOMER',
        title: 'Service Completed',
        message: `${booking.serviceTitle} has been completed. Please rate your Saathi!`,
        type: 'REVIEW_REMINDER',
        bookingId: booking.id,
        time: 'Just now',
        isRead: false,
        icon: 'Star',
      });
    } else if (newStatus === 'CANCELLED') {
      booking.timeline.push({
        status: 'CANCELLED',
        time: nowStr,
        label: 'Booking Cancelled',
        completed: true,
      });
    }

    this.persist();
    return booking;
  }

  // REVIEWS
  addReview(reviewData) {
    const id = `rev-${Date.now().toString().slice(-4)}`;
    const newReview = {
      id,
      ...reviewData,
      date: 'Just now',
      verifiedBooking: true,
    };

    this.reviews.unshift(newReview);

    // Update booking if applicable
    if (newReview.bookingId) {
      const bIdx = this.bookings.findIndex((b) => b.id === newReview.bookingId);
      if (bIdx !== -1) {
        this.bookings[bIdx].review = {
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date().toISOString(),
        };
      }
    }

    // Recalculate worker rating
    const workerReviews = this.reviews.filter((r) => r.workerId === newReview.workerId);
    const avgRating = (workerReviews.reduce((sum, r) => sum + r.rating, 0) / workerReviews.length).toFixed(2);

    const wIdx = this.workers.findIndex((w) => w.id === newReview.workerId);
    if (wIdx !== -1) {
      this.workers[wIdx].rating = parseFloat(avgRating);
      this.workers[wIdx].reviewsCount = workerReviews.length;
    }

    this.persist();
    return newReview;
  }

  getReviewsByWorkerId(workerId) {
    return this.reviews.filter((r) => r.workerId === workerId);
  }

  // NOTIFICATIONS
  getNotifications(recipientId) {
    if (!recipientId) return this.notifications;
    return this.notifications.filter((n) => n.recipientId === recipientId || !n.recipientId);
  }

  markNotificationAsRead(id) {
    const idx = this.notifications.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.notifications[idx].isRead = true;
      this.persist();
      return this.notifications[idx];
    }
    return null;
  }

  markAllNotificationsRead(recipientId) {
    this.notifications = this.notifications.map((n) =>
      !recipientId || n.recipientId === recipientId ? { ...n, isRead: true } : n
    );
    this.persist();
    return true;
  }

  // WISHLIST
  getWishlist() {
    return this.services.filter((s) => this.wishlist.includes(s.id));
  }

  toggleWishlist(serviceId) {
    if (this.wishlist.includes(serviceId)) {
      this.wishlist = this.wishlist.filter((id) => id !== serviceId);
    } else {
      this.wishlist.push(serviceId);
    }
    this.persist();
    return this.wishlist;
  }

  // FAIR ALLOCATION ALGORITHM (SIH 2026 Core Differentiator)
  calculateFairAllocation(candidateWorkers, requiredCategory) {
    // Formula: (Skill * 0.25) + (Availability * 0.25) + (Distance * 0.20) + (WorkloadBalance * 0.30)
    // Workload Balance ensures workers with fewer recent jobs get prioritized over overloaded workers
    return candidateWorkers.map((worker) => {
      const skillWeight = worker.category === requiredCategory ? 98 : 75;
      const availabilityWeight = worker.isAvailableToday ? 100 : 40;
      const distanceWeight = Math.max(30, Math.round(100 - (worker.distanceKm * 15)));
      // Invert current workload score so lower workload gets higher opportunity score
      const workloadBalanceWeight = Math.max(20, 100 - (worker.currentWorkloadScore || 50));

      const finalFairScore = Math.round(
        (skillWeight * 0.25) +
        (availabilityWeight * 0.25) +
        (distanceWeight * 0.20) +
        (workloadBalanceWeight * 0.30)
      );

      return {
        ...worker,
        allocationScores: {
          skill: skillWeight,
          availability: availabilityWeight,
          distance: distanceWeight,
          workloadBalance: workloadBalanceWeight,
          finalScore: finalFairScore,
        }
      };
    }).sort((a, b) => b.allocationScores.finalScore - a.allocationScores.finalScore);
  }
}

export const mockDb = new MockDatabase();
export default mockDb;
