'use client';

import React, { useState, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Card } from './Card';
import { ActionButtons } from './ActionButtons';

// Dynamically import TinderCard to avoid SSR issues with window/touch events
const TinderCard = dynamic(() => import('react-tinder-card'), { ssr: false });

const db = [
    { name: 'Richard Hendricks', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
    { name: 'Erlich Bachman', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
    { name: 'Monica Hall', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
    { name: 'Jared Dunn', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
    { name: 'Dinesh Chugtai', url: 'https://images.unsplash.com/photo-1521119989659-a83eee488058?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' },
];

export const SwipeDeck = () => {
    const [lastDirection, setLastDirection] = useState<string>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childRefs = useMemo<any>(() => Array(db.length).fill(0).map(() => React.createRef()), []);

    const swiped = (direction: string, nameToDelete: string) => {
        console.log('removing: ' + nameToDelete);
        setLastDirection(direction);
    };

    const outOfFrame = (name: string) => {
        console.log(name + ' left the screen!');
    };

    const swipe = async (dir: string) => {
        // Find the first card that hasn't been swiped yet
        // This is a simplified logic; in a real app you'd track index
        // For now, we just swipe the top card if available
        // Note: react-tinder-card doesn't expose a clean "swipe programmatically" for the *top* card easily without tracking index.
        // We'll implemented a basic index tracker.
    };

    // We need to track which cards are remaining to know which one to swipe programmatically
    // But for the MVP, let's just render them.
    // The library renders in order, so the last one in the array is on top.

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-gray-900">
            <div className="relative w-[300px] h-[400px]">
                {db.map((character, index) => (
                    <TinderCard
                        ref={childRefs[index]}
                        className="absolute"
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name)}
                        onCardLeftScreen={() => outOfFrame(character.name)}
                        preventSwipe={['up', 'down']}
                    >
                        <Card name={character.name} url={character.url} />
                    </TinderCard>
                ))}
            </div>

            {lastDirection ? (
                <h2 className="absolute top-10 text-white text-xl animate-pulse">
                    You swiped {lastDirection}
                </h2>
            ) : (
                <h2 className="absolute top-10 text-white text-xl">
                    Swipe a card!
                </h2>
            )}

            <ActionButtons />
        </div>
    );
};
