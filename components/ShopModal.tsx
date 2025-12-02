'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Zap, Gift } from 'lucide-react';

interface ShopModalProps {
    onClose: () => void;
    onBuyCredits: (amount: number, cost: number) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ onClose, onBuyCredits }) => {
    const creditPackages = [
        { amount: 100, cost: 4.99, popular: false },
        { amount: 500, cost: 19.99, popular: true },
        { amount: 1200, cost: 39.99, popular: false },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="glass-card w-full max-w-md rounded-3xl overflow-hidden flex flex-col relative max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white text-glow">Loop Store</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-8">
                    {/* Credits Section */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard className="text-pink-500" />
                            <h3 className="text-lg font-bold text-white">Buy Credits</h3>
                        </div>
                        <div className="space-y-3">
                            {creditPackages.map((pkg, i) => (
                                <button
                                    key={i}
                                    onClick={() => onBuyCredits(pkg.amount, pkg.cost)}
                                    className={`w-full p-4 rounded-xl border flex justify-between items-center transition-all hover:scale-[1.02]
                    ${pkg.popular
                                            ? 'bg-gradient-to-r from-pink-900/40 to-purple-900/40 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-xl font-bold text-white">{pkg.amount} Credits</span>
                                        {pkg.popular && <span className="text-xs text-pink-400 font-bold uppercase tracking-wider">Most Popular</span>}
                                    </div>
                                    <span className="text-lg font-medium text-white">${pkg.cost}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Premium Features */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <Zap className="text-yellow-500" />
                            <h3 className="text-lg font-bold text-white">Premium Features</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Zap size={20} />
                                </div>
                                <span className="text-sm font-bold text-white">Super Boost</span>
                                <span className="text-xs text-gray-400">5x Match Rate</span>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Gift size={20} />
                                </div>
                                <span className="text-sm font-bold text-white">Unlimited Gifts</span>
                                <span className="text-xs text-gray-400">Max Rizz</span>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>
        </div>
    );
};
