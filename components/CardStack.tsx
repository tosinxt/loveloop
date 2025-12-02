'use client';

import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, Heart, Info } from 'lucide-react';
import { EGirl, checkMatch } from '@/lib/mock-api';

interface CardStackProps {
    profiles: EGirl[];
    onMatch: (profile: EGirl) => void;
    onReject: (profile: EGirl) => void;
    onInfoClick: (profile: EGirl) => void;
}

export const CardStack: React.FC<CardStackProps> = ({ profiles, onMatch, onReject, onInfoClick }) => {
    const [cards, setCards] = useState(profiles);
    const [result, setResult] = useState<'MATCH' | 'REJECT' | null>(null);

    // Top card motion values
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Background color change based on drag
    const bgLike = useTransform(x, [0, 150], [0, 1]);
    const bgNope = useTransform(x, [0, -150], [0, 1]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            // Swiped Right
            handleSwipe('right');
        } else if (info.offset.x < -100) {
            // Swiped Left
            handleSwipe('left');
        }
    };

    const handleSwipe = (dir: 'left' | 'right') => {
        const currentCard = cards[cards.length - 1];

        if (dir === 'right') {
            const isMatch = checkMatch(currentCard.rizzLevel);
            if (isMatch) {
                setResult('MATCH');
                setTimeout(() => {
                    onMatch(currentCard);
                    removeCard();
                    setResult(null);
                }, 1500);
            } else {
                setResult('REJECT');
                setTimeout(() => {
                    onReject(currentCard);
                    removeCard();
                    setResult(null);
                }, 1500);
            }
        } else {
            onReject(currentCard);
            removeCard();
        }
    };

    const removeCard = () => {
        setCards((prev) => prev.slice(0, -1));
        x.set(0);
    };

    if (cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white">
                <h2 className="text-2xl font-bold mb-4">No more profiles</h2>
                <p className="text-gray-400">Check back later for more loops.</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Result Overlay */}
            {result && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        className={`text-6xl font-black italic tracking-tighter ${result === 'MATCH' ? 'text-green-500' : 'text-red-500'} drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] border-4 border-current px-8 py-4 rounded-xl -rotate-12`}
                    >
                        {result === 'MATCH' ? "IT'S A MATCH!" : "IGNORED"}
                    </motion.div>
                </div>
            )}

            {cards.map((profile, index) => {
                const isTop = index === cards.length - 1;

                return (
                    <motion.div
                        key={profile.id}
                        style={{
                            x: isTop ? x : 0,
                            rotate: isTop ? rotate : 0,
                            zIndex: index,
                            scale: isTop ? 1 : 1 - (cards.length - 1 - index) * 0.05,
                            y: isTop ? 0 : (cards.length - 1 - index) * 10,
                        }}
                        drag={isTop ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        className="absolute w-[95%] max-w-[360px] h-[65vh] rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
                    >
                        {/* Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${profile.image})` }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />

                        {/* Shimmer Effect on Hover */}
                        <div className="absolute inset-0 shimmer-overlay opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                            <div className="flex items-end justify-between mb-2">
                                <div>
                                    <h2 className="text-3xl font-bold text-glow">{profile.name}, {profile.age}</h2>
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium border border-white/20">
                                        {profile.archetype}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onInfoClick(profile);
                                    }}
                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                                >
                                    <Info size={20} />
                                </button>
                            </div>
                            <p className="text-gray-300 text-sm line-clamp-2">{profile.bio}</p>
                        </div>

                        {/* Swipe Indicators */}
                        {isTop && (
                            <>
                                <motion.div
                                    style={{ opacity: bgLike }}
                                    className="absolute top-8 left-8 -rotate-12 border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm"
                                >
                                    LIKE
                                </motion.div>
                                <motion.div
                                    style={{ opacity: bgNope }}
                                    className="absolute top-8 right-8 rotate-12 border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-2 rounded-lg bg-black/20 backdrop-blur-sm"
                                >
                                    NOPE
                                </motion.div>
                            </>
                        )}
                    </motion.div>
                );
            })}

            {/* Controls */}
            <div className="absolute bottom-8 flex gap-6 z-40">
                <button
                    onClick={() => handleSwipe('left')}
                    className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-red-500/50 text-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:scale-110 transition-transform"
                >
                    <X size={32} />
                </button>
                <button
                    onClick={() => handleSwipe('right')}
                    className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-green-500/50 text-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:scale-110 transition-transform"
                >
                    <Heart size={32} fill="currentColor" />
                </button>
            </div>
        </div>
    );
};
