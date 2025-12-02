'use client';

import React from 'react';

export const Background = () => {
    return (
        <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 aurora-bg opacity-60" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />

            {/* Floating Orbs for extra depth */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
    );
};
