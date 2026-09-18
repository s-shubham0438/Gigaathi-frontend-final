import mockDb from '../../../mocks/mockDb';

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const notificationApi = {
  getNotifications: async (recipientId) => {
    await delay(200);
    return mockDb.getNotifications(recipientId);
  },

  markAsRead: async (id) => {
    await delay(150);
    return mockDb.markNotificationAsRead(id);
  },

  markAllAsRead: async (recipientId) => {
    await delay(200);
    return mockDb.markAllNotificationsRead(recipientId);
  },
};

export default notificationApi;
