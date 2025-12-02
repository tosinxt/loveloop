'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

interface AgeGateProps {
    onEnter: () => void;
}

export const AgeGate: React.FC<AgeGateProps> = ({ onEnter }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card w-full max-w-md p-8 rounded-2xl flex flex-col items-center text-center border border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
                <ShieldAlert className="w-16 h-16 text-red-500 mb-6 drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />

                <h1 className="text-3xl font-bold mb-2 text-white text-glow">WARNING</h1>
                <p className="text-gray-300 mb-8">
                    This simulation contains AI companions and mature themes.
                    You must be 18+ to enter the Loop.
                </p>

                <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setIsChecked(!isChecked)}>
                    <div className={`w-6 h-6 rounded border border-white/30 flex items-center justify-center transition-colors ${isChecked ? 'bg-pink-600 border-pink-500' : 'bg-transparent'}`}>
                        {isChecked && <span className="text-white text-sm">✓</span>}
                    </div>
                    <span className="text-sm text-gray-400 select-none">I confirm I am 18 years or older</span>
                </div>

                <button
                    onClick={onEnter}
                    disabled={!isChecked}
                    className={`w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all duration-300
            ${isChecked
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-[1.02]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    ENTER THE LOOP
                </button>
            </motion.div>
        </div>
    );
};
