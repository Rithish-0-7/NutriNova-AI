"use client";

import { useState } from 'react';
import { Mic } from 'lucide-react';
import { api } from '@/lib/api';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { SuggestedPrompts } from '@/components/chat/SuggestedPrompts';

type Message = { role: 'user' | 'assistant'; content: string };

export default function CoachPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    try {
      const { data } = await api.post('/ai/coach-chat', { message: userMessage.content });
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'No response' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="AI Coach" subtitle="Professional fitness coach personality with fast context-aware responses." />
      <SuggestedPrompts onSelect={setInput} />
      <Card className="p-0">
        <div className="h-[460px] overflow-y-auto p-4" aria-live="polite">
          <div className="space-y-3">
            {!messages.length ? (
              <div className="surface-muted p-3 text-sm text-slate-500 dark:text-slate-300">
                Ask about meal timing, macro targets, recovery, or workout progression.
              </div>
            ) : null}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[90%] rounded-xl p-3 text-sm ${
                msg.role === 'assistant'
                  ? 'bg-slate-800 text-slate-100'
                  : 'ml-auto bg-brand-gradient text-white'
              }`}
            >
              {msg.content}
            </div>
          ))}

            {isTyping ? (
              <div className="inline-flex items-center gap-1 rounded-xl bg-slate-800 px-3 py-2 text-xs text-slate-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex gap-2">
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Message AI Coach..." aria-label="Message input" />
            <Button variant="secondary" aria-label="Voice input">
              <Mic className="h-4 w-4" />
            </Button>
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
