import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, ChevronDown, ChevronRight, Clock3, MessageCircle, Plus, Send, Sparkles, User, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useTheme } from '../../shared/hooks/useTheme';
import chatbotApi from '../../features/chatbot/api/chatbotApi';

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hi! I’m AI Saathi 👋 I can help you find the right service, understand your booking options, and guide you through gigSaathi.',
    time: 'Now',
  },
];

const suggestedPrompts = [
  'I need a plumber for a water leak',
  'Help me choose the right service',
  'How does Raise Request work?',
  'I need urgent repair help',
];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getLocalReply = (message) => {
  const text = message.toLowerCase();

  if (text.includes('urgent') || text.includes('emergency')) {
    return 'For an urgent problem, use **Book Urgently** from the customer dashboard. Your request can be broadcast to available Saathis so the first eligible worker to accept can take the job.';
  }

  if (text.includes('raise request') || text.includes('broadcast')) {
    return 'Raise Request is useful when you do not want to choose one worker yourself. You describe the work, and the request can be offered to available Saathis. Your backend will handle the actual matching and acceptance flow.';
  }

  if (text.includes('plumber') || text.includes('water leak') || text.includes('leak')) {
    return 'For a water leak, start with the Plumbing service. You can then choose an individual worker or use Raise Request if you want available workers to respond.';
  }

  if (text.includes('book') || text.includes('service')) {
    return 'You can browse Services, open a service, and choose a worker when you want an individual booking. For the AI flow, the future Llama backend can provide personalised service suggestions here.';
  }

  return 'I’m ready for the Llama-powered backend. Right now this screen is running in frontend demo mode, so I can show the complete chat experience but I’m not connected to the AI model yet.';
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
          <Bot className="h-4.5 w-4.5" />
        </div>
      )}

      <div className={`max-w-[82%] sm:max-w-[72%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
            isUser
              ? 'rounded-br-md bg-indigo-600 text-white'
              : 'rounded-bl-md border border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200'
          }`}
        >
          {message.text.split('**').map((part, index) =>
            index % 2 === 1 ? <strong key={index}>{part}</strong> : <React.Fragment key={index}>{part}</React.Fragment>
          )}
        </div>
        <span className="mt-1 px-1 text-[10px] font-medium text-slate-400">{message.time}</span>
      </div>

      {isUser && (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export const AIChatbotPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isCustomer, user } = useAuth();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const chatScrollRef = useRef(null);
  const textareaRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const firstName = useMemo(() => user?.name?.split(' ')?.[0] || 'there', [user?.name]);

  useEffect(() => {
    if (!isAuthenticated || !isCustomer) {
      navigate('/customer', { replace: true });
    }
  }, [isAuthenticated, isCustomer, navigate]);

  // Keep scrolling inside the chat panel only.
  // scrollIntoView() can move the whole page, which caused the chatbot
  // card/header to jump or get clipped.
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      setShowScrollButton(false);
    });
  }, [messages, isTyping]);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setShowScrollButton(distanceFromBottom > 120);
    };

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToLatest = () => {
    const el = chatScrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  };

  const sendMessage = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage = { id: createId(), role: 'user', text: trimmed, time: now };

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

        chatbotApi
      .sendMessage({ message: trimmed, conversationId })
      .then((data) => {
        setConversationId(data.conversation_id);
        const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((current) => [
          ...current,
          { id: createId(), role: 'assistant', text: data.message, time: replyTime },
        ]);
      })
      .catch(() => {
        setMessages((current) => [
          ...current,
          {
            id: createId(),
            role: 'assistant',
            text: "Sorry, I couldn't reach the assistant just now. Please try again.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      })
      .finally(() => setIsTyping(false));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: createId(),
        role: 'assistant',
        text: `Welcome back, ${firstName}! What can I help you with today?`,
        time: 'Now',
      },
    ]);
    setInput('');
    setIsTyping(false);
    setShowSuggestions(true);
    window.setTimeout(() => textareaRef.current?.focus(), 50);
  };

  if (!isAuthenticated || !isCustomer) return null;

  return (
    <div className="h-full min-h-0 overflow-hidden bg-slate-50 px-3 py-3 text-slate-900 transition-colors sm:px-5 sm:py-4 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto grid h-full min-h-0 max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* Chat sidebar */}
        <aside className="hidden border-r border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/50 lg:flex lg:flex-col">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-black tracking-tight">AI Saathi</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your gigSaathi assistant</p>
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 dark:shadow-none"
          >
            <Plus className="h-4 w-4" />
            New chat
          </button>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 dark:border-indigo-950 dark:bg-indigo-950/30">
            <div className="mb-2 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
              <Bot className="h-4 w-4" />
              <span className="text-xs font-extrabold uppercase tracking-wider">Llama ready</span>
            </div>
            <p className="text-xs leading-5 text-indigo-900/70 dark:text-indigo-200/70">
              The interface is ready for your future FastAPI + Llama connection. No AI API is called yet.
            </p>
          </div>

          <div className="mt-auto rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-bold">Chat history</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">
              History storage can be connected later through your backend and MongoDB.
            </p>
          </div>
        </aside>

        {/* Main chat */}
        <section className="flex min-h-0 min-w-0 flex-col bg-white dark:bg-slate-900">
          <header className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3.5 sm:px-6 dark:border-slate-800">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-sm font-black sm:text-base">AI Saathi</h1>
                <p className="truncate text-[11px] font-medium text-slate-400">Service discovery & booking assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 sm:inline-flex dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="mr-1.5 mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Frontend demo
              </span>
              <button
                type="button"
                onClick={startNewChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
                title="New chat"
                aria-label="New chat"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/customer')}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-white"
                title="Close AI Saathi"
                aria-label="Close AI Saathi"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div
            ref={chatScrollRef}
            className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain scroll-smooth bg-slate-50/60 px-3 py-5 sm:px-6 dark:bg-slate-950/30"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isDark ? '#475569 transparent' : '#94a3b8 transparent',
            }}
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-5">
              <div className="flex items-center justify-center gap-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                AI Saathi
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>

              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {isTyping && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                    </div>
                  </div>
                </div>
              )}

              {showSuggestions && messages.length <= 1 && (
                <div className="pt-1">
                  <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-wider text-slate-400">Try asking</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-xs font-semibold text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-800 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-300"
                      >
                        <span>{prompt}</span>
                        <ChevronRight className="ml-3 h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <button
                type="button"
                onClick={scrollToLatest}
                className="absolute bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                title="Scroll to latest message"
                aria-label="Scroll to latest message"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:focus-within:border-indigo-700 dark:focus-within:ring-indigo-950">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask AI Saathi anything about services or bookings..."
                  rows={1}
                  className="max-h-28 min-h-11 w-full resize-none border-0 bg-transparent px-3 py-2.5 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100"
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Enter to send · Shift + Enter for new line</span>
                    <span className="sm:hidden">Enter to send</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isTyping}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Send message"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-center text-[9px] font-medium text-slate-400">
                AI Saathi is currently a frontend demo. Connect your Llama/FastAPI backend later to enable real AI responses.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AIChatbotPage;
