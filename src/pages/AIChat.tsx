import React, { useState, useRef, useEffect, memo } from 'react';
import { Send, Bot, User, MessageSquare } from 'lucide-react';
import { useAIChat } from '../hooks/useAI';

export default function AIChat() {
  const { messages, sendMessage, isLoading } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const mockKnowledgeContext = `Internal FAQ...`;

  const handleSend = async (userMessage: string) => {
    if (isLoading) return;
    await sendMessage(userMessage, mockKnowledgeContext);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex items-center justify-center w-full">
      <div className="w-full max-w-4xl h-full flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-sm overflow-hidden relative">
        
        {/* Header Panel */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900/60 z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-10 h-10 rounded bg-black dark:bg-white flex items-center justify-center border border-zinc-350 dark:border-zinc-700">
                <Bot className="h-5 w-5 text-white dark:text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-zinc-500 border-2 border-white dark:border-black" />
            </div>
            <div>
              <h2 className="text-base font-bold text-black dark:text-white">
                Support AI Assistant
              </h2>
              <div className="text-xs font-semibold text-zinc-550 dark:text-zinc-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-550 dark:bg-zinc-400" />
                Online & ready
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 overflow-hidden relative bg-white dark:bg-zinc-950 z-10">
          <div ref={scrollRef} className="h-full overflow-y-auto px-6 pb-24 pt-6 space-y-6 custom-scrollbar">
              {messages.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full text-center pb-12">
                   <div className="w-12 h-12 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-4">
                     <MessageSquare className="h-6 w-6 text-zinc-500" />
                   </div>
                   <h3 className="text-lg font-bold text-black dark:text-white mb-2">How can I help you today?</h3>
                   <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold max-w-sm">
                     Ask about tickets, automations, or how to resolve specific customer issues.
                   </p>
                 </div>
              )}
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 mr-3 mt-1">
                      <Bot className="h-4 w-4 text-black dark:text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed font-medium ${
                    msg.role === 'user' 
                      ? 'bg-black dark:bg-white text-white dark:text-black rounded-lg rounded-tr-sm shadow-sm' 
                      : 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg rounded-tl-sm'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 ml-3 mt-1">
                      <User className="h-4 w-4 text-black dark:text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0 mr-3 mt-1">
                    <Bot className="h-4 w-4 text-black dark:text-white" />
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-4 rounded-lg rounded-tl-sm flex items-center gap-1.5 h-[46px]">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
          </div>
          
          {/* Input Area */}
          <div className="absolute bottom-6 left-6 right-6">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}

const ChatInput = memo(({ onSend, isLoading }: { onSend: (msg: string) => void, isLoading: boolean }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg pl-4 pr-2 py-2 focus-within:border-black dark:focus-within:border-white transition-shadow shadow-sm">
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border-0 focus:outline-none text-black dark:text-white placeholder:text-zinc-500 h-10 text-sm font-semibold"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={`w-8 h-8 rounded flex items-center justify-center shrink-0 transition-colors ml-2 ${
          input.trim() && !isLoading 
            ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm' 
            : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400'
        }`} 
        disabled={!input.trim() || isLoading}
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
});
