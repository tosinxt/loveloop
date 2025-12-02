'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, User, Plus } from 'lucide-react';
import { Background } from '@/components/Background';
import { AgeGate } from '@/components/AgeGate';
import { Onboarding } from '@/components/Onboarding';
import { CardStack } from '@/components/CardStack';
import { ChatInterface } from '@/components/ChatInterface';
import { ProfileModal } from '@/components/ProfileModal';
import { ShopModal } from '@/components/ShopModal';
import { E_GIRLS, EGirl } from '@/lib/mock-api';

type ViewState = 'AGE_GATE' | 'ONBOARDING' | 'SWIPE' | 'CHAT';

export default function Home() {
  const [view, setView] = useState<ViewState>('AGE_GATE');
  const [matches, setMatches] = useState<EGirl[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPrefs, setUserPrefs] = useState<{ interest: string; vibe: string } | null>(null);

  // Phase 2 State
  const [userCredits, setUserCredits] = useState(100); // Start with 100 credits
  const [selectedProfile, setSelectedProfile] = useState<EGirl | null>(null);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const handleMatch = (profile: EGirl) => {
    setMatches((prev) => [...prev, profile]);
  };

  const handleReject = (profile: EGirl) => {
    console.log('Rejected:', profile.name);
  };

  const handleBuyCredits = (amount: number, cost: number) => {
    // Mock purchase
    console.log(`Bought ${amount} credits for $${cost}`);
    setUserCredits(prev => prev + amount);
    setIsShopOpen(false);
  };

  const handleUnlockContent = (cost: number): boolean => {
    if (userCredits >= cost) {
      setUserCredits(prev => prev - cost);
      return true;
    }
    setIsShopOpen(true); // Open shop if not enough credits
    return false;
  };

  const handleSendGift = (cost: number): boolean => {
    if (userCredits >= cost) {
      setUserCredits(prev => prev - cost);
      return true;
    }
    setIsShopOpen(true);
    return false;
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Background />

      {/* Modals */}
      <AnimatePresence>
        {selectedProfile && (
          <ProfileModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
            onSuperLike={() => {
              handleMatch(selectedProfile); // Auto match
              setSelectedProfile(null);
            }}
            onGift={() => {
              handleSendGift(50);
              setSelectedProfile(null);
            }}
          />
        )}
        {isShopOpen && (
          <ShopModal
            onClose={() => setIsShopOpen(false)}
            onBuyCredits={handleBuyCredits}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'AGE_GATE' && (
          <AgeGate key="age-gate" onEnter={() => setView('ONBOARDING')} />
        )}

        {view === 'ONBOARDING' && (
          <Onboarding
            key="onboarding"
            onComplete={(prefs) => {
              setUserPrefs(prefs);
              setView('SWIPE');
            }}
          />
        )}

        {view === 'SWIPE' && (
          <motion.div
            key="swipe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 z-10">
              {/* Credits Display */}
              <button
                onClick={() => setIsShopOpen(true)}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <span className="text-white font-bold text-sm">{userCredits}</span>
                <Plus size={14} className="text-white/60" />
              </button>

              <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                LOVELOOP
              </h1>

              <button
                onClick={() => setView('CHAT')}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 relative"
              >
                <MessageCircle className="text-white" size={20} />
                {matches.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold border border-black">
                    {matches.length}
                  </div>
                )}
              </button>
            </div>

            {/* Card Stack */}
            <div className="flex-1 relative z-0">
              <CardStack
                profiles={E_GIRLS}
                onMatch={handleMatch}
                onReject={handleReject}
                onInfoClick={setSelectedProfile}
              />
            </div>
          </motion.div>
        )}

        {view === 'CHAT' && (
          <motion.div
            key="chat"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-20 bg-black"
          >
            <ChatInterface
              matches={matches}
              onBack={() => setView('SWIPE')}
              userCredits={userCredits}
              onUnlockContent={handleUnlockContent}
              onSendGift={handleSendGift}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
