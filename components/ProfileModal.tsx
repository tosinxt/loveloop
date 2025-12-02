'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Zap, Gift } from 'lucide-react';
import { EGirl } from '@/lib/mock-api';

interface ProfileModalProps {
    profile: EGirl;
    onClose: () => void;
    onSuperLike: () => void;
    onGift: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onClose, onSuperLike, onGift }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card w-full max-w-md h-[80vh] rounded-3xl overflow-hidden flex flex-col relative"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Image Carousel (Simplified as single image for now) */}
                <div className="h-[50%] bg-cover bg-center relative" style={{ backgroundImage: `url(${profile.image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                    <div className="absolute bottom-4 left-6">
                        <h2 className="text-4xl font-black text-white text-glow">{profile.name}, {profile.age}</h2>
                        <span className="text-pink-400 font-bold tracking-wider">{profile.archetype}</span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {/* Bio */}
                    <div>
                        <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Bio</h3>
                        <p className="text-gray-200 leading-relaxed">{profile.bio}</p>
                    </div>

                    {/* Kinks/Tags */}
                    <div>
                        <h3 className="text-white/60 text-sm font-bold uppercase tracking-widest mb-2">Interests & Kinks</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.kinks?.map((kink, i) => (
                                <span key={i} className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-300 text-xs font-bold uppercase tracking-wider">
                                    {kink}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-white/60 text-xs font-bold uppercase mb-1">Rizz Level</div>
                            <div className="text-2xl font-black text-white">{profile.rizzLevel}/10</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-white/60 text-xs font-bold uppercase mb-1">Match Rate</div>
                            <div className="text-2xl font-black text-green-400">40%</div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-white/10 bg-black/40 flex gap-4">
                    <button
                        onClick={onGift}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                        <Gift size={20} /> Send Gift
                    </button>
                    <button
                        onClick={onSuperLike}
                        className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                    >
                        <Zap size={20} /> Super Like
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
