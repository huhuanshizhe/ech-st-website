'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  { en: 'What products do you offer?', zh: '你们提供哪些产品？' },
  { en: 'How to request a quote?', zh: '如何获取报价？' },
  { en: 'Do you have certifications?', zh: '你们有认证吗？' },
  { en: 'What is your delivery time?', zh: '交货时间是多少？' },
];

export default function ChatWidget({ locale }: { locale: string }) {
  const t = useTranslations('chat');
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('welcome'),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (实际项目中会调用API)
    setTimeout(() => {
      const responses: Record<string, string> = {
        'What products do you offer?': 'We offer MCCB, MCB, SPD, MOV, Energy Storage Systems, and IoT Smart Circuit Breakers. Would you like to know more about any specific product?',
        '你们提供哪些产品？': '我们提供塑壳断路器(MCCB)、小型断路器(MCB)、浪涌保护器(SPD)、压敏电阻(MOV)、储能系统以及物联网智能断路器。您想了解哪个具体产品？',
        'How to request a quote?': 'You can submit an inquiry through our Contact page, or email us directly at sales@ech-st.com. Our team will respond within 24 hours.',
        '如何获取报价？': '您可以通过联系我们页面提交询盘，或直接发送邮件至 sales@ech-st.com。我们的团队将在24小时内回复。',
        'Do you have certifications?': 'Yes, we are ISO 9001 certified and our products comply with IEC, UL, and other international standards.',
        '你们有认证吗？': '是的，我们通过了ISO 9001认证，产品符合IEC、UL等国际标准。',
        'What is your delivery time?': 'Standard products typically have a delivery time of 15-30 days. Custom products may take longer depending on specifications.',
        '交货时间是多少？': '标准产品通常交货时间为15-30天。定制产品可能需要更长时间，具体取决于规格要求。',
      };

      const responseContent = responses[content] || (currentLocale === 'zh'
        ? '感谢您的提问！我会尽力帮助您。如需更详细的信息，建议您联系我们的销售团队：sales@ech-st.com'
        : 'Thank you for your question! I\'ll do my best to help. For more detailed information, please contact our sales team at sales@ech-st.com');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          'fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg',
          'flex items-center justify-center hover:bg-primary-700 transition-all',
          isOpen && 'hidden'
        )}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full animate-pulse" />
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          'fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-xl shadow-2xl',
          'flex flex-col overflow-hidden transition-all',
          isOpen ? 'h-[500px] max-h-[calc(100vh-100px)]' : 'h-0'
        )}
      >
        {/* Header */}
        <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">{t('title')}</h3>
              <p className="text-xs text-white/80">{t('subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                'flex gap-2',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-600" />
                </div>
              )}
              <div
                className={clsx(
                  'max-w-[80%] p-3 rounded-lg text-sm',
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-600" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        <div className="px-4 py-2 border-t border-gray-100 bg-white">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(currentLocale === 'zh' ? q.zh : q.en)}
                className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary-50 text-gray-600 hover:text-primary-600 rounded-full transition-colors"
              >
                {currentLocale === 'zh' ? q.zh : q.en}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}