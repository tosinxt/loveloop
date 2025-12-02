export interface EGirl {
    id: string;
    name: string;
    age: number;
    archetype: string;
    image: string;
    rizzLevel: number;
    bio: string;
    kinks?: string[];
    photos?: string[];
    relationshipTier?: 'Stranger' | 'Talking' | 'Girlfriend';
    matchScore?: number;
}

export interface User {
    credits: number;
    inventory: string[];
    isPremium: boolean;
}

export const E_GIRLS: EGirl[] = [
    {
        id: '1',
        name: 'Lilith',
        age: 21,
        archetype: 'Goth Mommy',
        image: 'https://images.unsplash.com/photo-1621784563330-ca1c29606343?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 8,
        bio: "I don't bite... unless you ask nicely. 🖤",
        kinks: ['Dominance', 'Praise', 'Petplay'],
        photos: [
            'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
        ],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '2',
        name: 'Yuki',
        age: 19,
        archetype: 'Shy Gamer',
        image: 'https://images.unsplash.com/photo-1595152452543-e5cca283f545?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 4,
        bio: "Carry me in Val? 👉👈 I'll heal you.",
        kinks: ['Cosplay', 'Breeding', 'Public'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '3',
        name: 'Raven',
        age: 23,
        archetype: 'Alt E-Girl',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 7,
        bio: "Chaos is my love language. Try to keep up.",
        kinks: ['Impact', 'Knife Play', 'Bondage'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '4',
        name: 'Chloe',
        age: 20,
        archetype: 'Girl Next Door',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 3,
        bio: "Just looking for someone to watch anime and eat pizza with.",
        kinks: ['Vanilla', 'Cuddling', 'Romance'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '5',
        name: 'Viper',
        age: 24,
        archetype: 'Cyberpunk Rebel',
        image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 9,
        bio: "Hack the planet, steal your heart. Not necessarily in that order.",
        kinks: ['Latex', 'Tech', 'Control'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '6',
        name: 'Mina',
        age: 18,
        archetype: 'K-Pop Stan',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 5,
        bio: "Stan Loona. If you don't like BTS, swipe left.",
        kinks: ['Roleplay', 'Costumes', 'Music'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '7',
        name: 'Jade',
        age: 22,
        archetype: 'Nature Witch',
        image: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 6,
        bio: "Manifesting a good time. My crystals say we're compatible.",
        kinks: ['Outdoors', 'Sensory', 'Spiritual'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '8',
        name: 'Roxy',
        age: 25,
        archetype: 'Fitness Influencer',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 8,
        bio: "Gym rat. Keep up or get left behind.",
        kinks: ['Sweat', 'Endurance', 'Worship'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '9',
        name: 'Luna',
        age: 20,
        archetype: 'Astrology Girl',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 5,
        bio: "Scorpio sun, Leo moon. I will ruin your life (affectionately).",
        kinks: ['Mind Games', 'Possessive', 'Intense'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '10',
        name: 'Nyx',
        age: 999,
        archetype: 'Eldritch Horror',
        image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 10,
        bio: "I have seen the void and it is beautiful. Join me?",
        kinks: ['Tentacles', 'Mind Break', 'Void'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '11',
        name: 'Sasha',
        age: 21,
        archetype: 'Streetwear Hypebeast',
        image: 'https://images.unsplash.com/photo-1515463138280-67d1dcbf3175?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 7,
        bio: "Cop or drop? Let's thrift together.",
        kinks: ['Sneakers', 'Street', 'Style'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '12',
        name: 'Elara',
        age: 23,
        archetype: 'High Elf',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 9,
        bio: "Just a fantasy girl living in a digital world.",
        kinks: ['Fantasy', 'Ears', 'Magic'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '13',
        name: 'Ruby',
        age: 19,
        archetype: 'Cosplayer',
        image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 6,
        bio: "Guess who I'm cosplaying today?",
        kinks: ['Costume', 'Character', 'Play'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '14',
        name: 'Nova',
        age: 22,
        archetype: 'Techno DJ',
        image: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 8,
        bio: "Bass drop > Heartbreak.",
        kinks: ['Rave', 'Neon', 'Bass'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
    {
        id: '15',
        name: 'Ivy',
        age: 24,
        archetype: 'Dark Academia',
        image: 'https://images.unsplash.com/photo-1475823678248-624fc6f85785?q=80&w=1000&auto=format&fit=crop',
        rizzLevel: 7,
        bio: "Poetry, coffee, and existential dread.",
        kinks: ['Books', 'Intellect', 'Quiet'],
        photos: [],
        relationshipTier: 'Stranger',
        matchScore: 0,
    },
];

export const checkMatch = (rizzLevel: number): boolean => {
    return Math.random() < 0.4;
};

export const MOCK_CHATS = [
    {
        id: '1',
        sender: 'Lilith',
        message: 'Hey... you caught my eye. 🖤',
        timestamp: 'Now',
    },
];
