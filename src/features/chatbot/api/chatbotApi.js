import chatbotAxios from '../../../shared/lib/chatbotAxios';

export const chatbotApi = {
  sendMessage: async ({ message, conversationId }) => {
    const { data } = await chatbotAxios.post('/chat', {
      message,
      conversation_id: conversationId || null,
    });
    return data;
  },
};

export default chatbotApi;