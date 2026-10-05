import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Mail, 
  Phone, 
  Clock, 
  CheckCheck, 
  Bot, 
  User, 
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { CONTACT_INFO, buildGeneralWhatsAppUrl } from '../data/contact';
import { useAccount } from '../context/AccountContext';

interface ChatMsg {
  id: string;
  sender: 'bot' | 'user' | 'system';
  text: string;
  timestamp: string;
  options?: string[];
  isEmailAlert?: boolean;
}

export const LiveChatWidget: React.FC = () => {
  const { currentUser } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [emailSentNotice, setEmailSentNotice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: 'Namaste! Welcome to Shivani Graphics (Shivani Digital Prints). How can our Delhi NCR print team assist you today?',
      timestamp: 'Just now',
      options: [
        'Visiting card pricing & GSM',
        'Large flex banner turnaround',
        'Artwork file & bleed guidelines',
        'Delhi NCR delivery slots',
        'Request bulk corporate quote',
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleQuickOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const getAutomatedResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('visiting') || q.includes('card') || q.includes('gsm')) {
      return `Our Visiting Cards are printed on heavy 350 GSM Velvet Art Card or 400 GSM Super-Thick Ivory Board with thermal velvet matte lamination and optional Spot UV or Gold Foil. Minimum order is 100 cards starting at ₹380, and bulk batches (1000+) start from just ₹1.95/card with 24-hr turnaround in Delhi NCR!`;
    }

    if (q.includes('flex') || q.includes('banner') || q.includes('standee') || q.includes('turnaround')) {
      return `We produce heavy outdoor Star Flex (320–440 GSM) and Roll-up Standees on high-speed Seiko and Roland Eco-Solvent machines. Same-day dispatch is available across Delhi NCR for orders confirmed before 1:00 PM! Standees start at ₹850 complete with aluminium base and carry bag.`;
    }

    if (q.includes('file') || q.includes('artwork') || q.includes('bleed') || q.includes('format')) {
      return `We accept CorelDraw (CDR X7+ with curves Ctrl+Q), Press-Ready PDF (300 DPI), Adobe Illustrator (AI), and high-resolution TIFF. Please maintain 3mm outer bleed margin to allow for ±2mm machine cutting tolerance. Color mode must be CMYK.`;
    }

    if (q.includes('delivery') || q.includes('dispatch') || q.includes('delhi')) {
      return `We offer express same-day courier dispatch across Delhi NCR (including Connaught Place, Okhla, Noida, Gurugram, Nehru Place, Karol Bagh) as well as store self-pickup from our Commercial Printing Complex. Pan-India shipping is handled via BlueDart and Delhivery (2–4 days).`;
    }

    if (q.includes('corporate') || q.includes('bulk') || q.includes('gst')) {
      return `For corporate procurement, we provide 100% compliant GST Tax Invoices (18% ITC) and dedicated volume contract discounts. Please share your required quantities and specifications, and we will email an official quotation to ${CONTACT_INFO.email} or WhatsApp you directly!`;
    }

    return `Thank you for your inquiry! Our senior print production specialist at the Delhi NCR desk will review this. We have logged your query and forwarded a copy to our support inbox at ${CONTACT_INFO.email}. You can also connect instantly on WhatsApp at ${CONTACT_INFO.primaryPhone}.`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMsg = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart bot response after 700ms
    setTimeout(() => {
      const responseText = getAutomatedResponse(text);
      const botMsg: ChatMsg = {
        id: `msg_b_${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  // Simulate explicit notification to support team email
  const handleNotifySupportTeam = () => {
    setEmailSentNotice(true);
    const notificationMsg: ChatMsg = {
      id: `msg_email_${Date.now()}`,
      sender: 'system',
      text: `Support notification dispatched to ${CONTACT_INFO.email}. Support ticket #SG-CHAT-${Math.floor(1000 + Math.random() * 9000)} generated. Our customer desk will follow up promptly.`,
      timestamp: 'Just now',
      isEmailAlert: true,
    };
    setMessages((prev) => [...prev, notificationMsg]);
    setTimeout(() => setEmailSentNotice(false), 4000);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-20 sm:right-24 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105 cursor-pointer border border-blue-400/40"
          aria-label="Open Live Chat Support"
          title="Chat with Shivani Graphics Support Desk"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                  SG
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-1.5">
                  <span>Shivani Graphics Print Desk</span>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online · Support Team Notified</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-header Banner showing email & WhatsApp notification routing */}
          <div className="bg-slate-950/90 text-slate-300 text-[10px] px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5 truncate">
              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Direct Desk: {CONTACT_INFO.email}</span>
            </div>
            <button
              onClick={handleNotifySupportTeam}
              className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer shrink-0 ml-2 underline"
            >
              Email Team
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : msg.sender === 'system'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-[11px]'
                      : 'bg-white text-slate-800 border border-neutral-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>

                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Quick Option Buttons */}
                {msg.options && (
                  <div className="mt-2 space-y-1 w-full max-w-[95%]">
                    <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                      Suggested inquiries:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickOptionClick(opt)}
                          className="bg-white hover:bg-blue-50 border border-neutral-300 hover:border-blue-500 text-slate-700 hover:text-blue-700 text-[11px] font-medium py-1 px-2.5 rounded-full transition-colors text-left cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] p-2 bg-white rounded-lg border border-neutral-200 w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                <span>Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick WhatsApp Handoff Bar */}
          <div className="px-3 py-1.5 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-[11px] text-emerald-900">
            <span className="font-semibold flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Need instant pricing on mobile?</span>
            </span>
            <a
              href={buildGeneralWhatsAppUrl('Live Chat Transfer')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>WhatsApp Us</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask about paper GSM, price, flex, standee..."
              className="flex-1 text-xs p-2.5 bg-neutral-100 rounded-lg border border-neutral-200 focus:bg-white focus:border-blue-600 outline-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-2.5 bg-blue-600 disabled:bg-neutral-300 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
