import React from 'react';
import { User, Bot } from 'lucide-react';
import type { MessageRole } from '../../types/chat.types';

interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  timestamp?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  role,
  content,
  timestamp,
}) => {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-gray-600" />
        )}
      </div>

      <div className={`flex flex-col gap-1 max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-900'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500">{timestamp}</span>
        )}
      </div>
    </div>
  );
};
