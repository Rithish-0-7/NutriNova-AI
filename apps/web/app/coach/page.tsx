"use client";

import { useState } from 'react';
import { api } from '@/lib/api';

type Message = { role: 'user' | 'assistant'; content: string };

export default function CoachPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    const { data } = await api.post('/ai/coach-chat', { message: userMessage.content });
    setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || 'No response' }]);
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-slate-900">AI Coach Chat</h1>
      <div className="card h-[420px] overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`rounded-xl p-3 text-sm ${msg.role === 'assistant' ? 'bg-slate-100 text-slate-800' : 'bg-blue-600 text-white'}`}>
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} className="input" placeholder="Ask nutrition/workout question" />
        <button className="btn-primary" onClick={send}>Send</button>
      </div>
    </section>
  );
}
