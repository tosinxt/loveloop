'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Lock, Image as ImageIcon, Gift } from 'lucide-react';
import { EGirl } from '@/lib/mock-api';

interface ChatInterfaceProps {
    matches: EGirl[];
    onBack: () => void;
    userCredits: number;
    onUnlockContent: (cost: number) => boolean;
    onSendGift: (cost: number) => boolean;
}

interface Message {
    id: string;
    sender: 'user' | 'ai';
    text: string;
    isLocked?: boolean;
    unlockCost?: number;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ matches, onBack, userCredits, onUnlockContent, onSendGift }) => {
    const [activeMatch, setActiveMatch] = useState<EGirl | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [rizzScore, setRizzScore] = useState(0); // 0-100
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, activeMatch]);

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
        };

        setMessages((prev) => [...prev, newMsg]);
        setInput('');

        // Simulate Rizz increase
        setRizzScore(prev => Math.min(prev + 5, 100));

        // Mock AI Response
        setTimeout(() => {
            let responseText = "That's interesting... tell me more.";
            let isLocked = false;
            let unlockCost = 0;

            const lowerInput = newMsg.text.toLowerCase();
            if (lowerInput.includes('nude') || lowerInput.includes('pic') || lowerInput.includes('hot')) {
                responseText = "I want to show you something special...";
                isLocked = true;
                unlockCost = 10; // 10 Credits
            } else {
                const responses = [
                    "I was just thinking about you.",
                    "Do you believe in fate?",
                    "I'm bored, entertain me.",
                    "What's your biggest secret?",
                ];
                responseText = responses[Math.floor(Math.random() * responses.length)];
            }

            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: responseText,
                    isLocked,
                    unlockCost,
                },
            ]);
        }, 1500);
    };

    const handleUnlock = (msgId: string, cost: number) => {
        if (onUnlockContent(cost)) {
            setMessages(prev => prev.map(m =>
                m.id === msgId ? { ...m, isLocked: false } : m
            ));
        } else {
            alert("Not enough credits! Buy more in the shop.");
        }
    };

    const handleGift = () => {
        if (onSendGift(50)) { // Gift costs 50 credits
            setRizzScore(prev => Math.min(prev + 20, 100));
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                sender: 'user',
                text: '🎁 [SENT A GIFT]',
            }]);
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    sender: 'ai',
                    text: "Omg! You shouldn't have... but I love it! 💖",
                }]);
            }, 1000);
        } else {
            alert("Not enough credits!");
        }
    };

    if (activeMatch) {
        return (
            <div className="flex flex-col h-full bg-black/80 backdrop-blur-xl">
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-black/40">
                    <div className="flex items-center gap-4 mb-2">
                        <button onClick={() => setActiveMatch(null)} className="p-2 hover:bg-white/10 rounded-full text-white">
                            <ArrowLeft size={24} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-cover bg-center border border-pink-500" style={{ backgroundImage: `url(${activeMatch.image})` }} />
                        <div className="flex-1">
                            <h3 className="text-white font-bold text-glow">{activeMatch.name}</h3>
                            <span className="text-xs text-green-400 flex items-center gap-1">● Online</span>
                        </div>
                        <button
                            onClick={handleGift}
                            className="p-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full text-white shadow-[0_0_10px_rgba(234,179,8,0.4)] hover:scale-105 transition-transform"
                        >
                            <Gift size={20} />
                        </button>
                    </div>

                    {/* Rizz Meter */}
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${rizzScore}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">
                        <span>Stranger</span>
                        <span>Talking</span>
                        <span>Girlfriend</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'user'
                                        ? 'bg-pink-600 text-white rounded-tr-none'
                                        : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                    }`}
                            >
                                {msg.isLocked ? (
                                    <div className="flex flex-col items-center gap-2 filter blur-sm select-none relative">
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <Lock className="text-white w-8 h-8" />
                                        </div>
                                        <p>This message is hidden.</p>
                                        <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                                            <ImageIcon className="text-gray-600" />
                                        </div>
                                    </div>
                                ) : (
                                    <p>{msg.text}</p>
                                )}

                                {msg.isLocked && (
                                    <button
                                        onClick={() => handleUnlock(msg.id, msg.unlockCost || 10)}
                                        className="mt-2 w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-black font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform z-20 relative"
                                    >
                                        <Lock size={14} /> Unlock for {msg.unlockCost} Credits
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/40">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-pink-500 transition-colors"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="p-3 bg-pink-600 rounded-full text-white hover:bg-pink-700 transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-6">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-white">
                    <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-white text-glow">Your Matches</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {matches.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <p>No matches yet. Get swiping!</p>
                    </div>
                ) : (
                    matches.map((match) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setActiveMatch(match)}
                            className="glass-card p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
                        >
                            <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-pink-500" style={{ backgroundImage: `url(${match.image})` }} />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">{match.name}</h3>
                                <p className="text-sm text-gray-400 truncate">New match! Say hi 👋</p>
                            </div>
                            <div className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};
