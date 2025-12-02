'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface OnboardingProps {
    onComplete: (prefs: { interest: string; vibe: string }) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [prefs, setPrefs] = useState({ interest: '', vibe: '' });

    const handleInterest = (interest: string) => {
        setPrefs({ ...prefs, interest });
        setStep(2);
    };

    const handleVibe = (vibe: string) => {
        const newPrefs = { ...prefs, vibe };
        setPrefs(newPrefs);
        onComplete(newPrefs);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 z-10 relative">
            <motion.div
                key={step}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="glass-card w-full max-w-md p-8 rounded-3xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                        {step === 1 ? <Heart className="text-white w-8 h-8" /> : <Sparkles className="text-white w-8 h-8" />}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-white mb-2 text-glow">
                    {step === 1 ? "What's your type?" : "Pick a vibe"}
                </h2>
                <p className="text-gray-400 text-center mb-8">
                    {step === 1 ? "Help us curate your loop." : "What energy are you looking for?"}
                </p>

                <div className="space-y-3">
                    {step === 1 ? (
                        <>
                            {['Petite', 'Curvy', 'Athletic'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleInterest(opt)}
                                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 transition-all text-white font-medium tracking-wide"
                                >
                                    {opt}
                                </button>
                            ))}
                        </>
                    ) : (
                        <>
                            {['Submissive', 'Dominant', 'Goth', 'Girl Next Door'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => handleVibe(opt)}
                                    className="w-full py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all text-white font-medium tracking-wide"
                                >
                                    {opt}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
