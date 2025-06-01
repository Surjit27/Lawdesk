import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { useAIChatStore } from '../../store/aiChatStore';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessages = () => {
  const { messages } = useAIChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`group ${message.role === 'assistant' ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4">
            <div
              className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                message.role === 'assistant' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              {message.role === 'assistant' ? (
                <Bot className="w-5 h-5 text-white" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-sm">
                  {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                </div>
                <span className="text-xs text-gray-500">{message.timestamp}</span>
              </div>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;