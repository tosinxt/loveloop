import React from 'react';

interface CardProps {
    name: string;
    url: string;
}

export const Card: React.FC<CardProps> = ({ name, url }) => {
    return (
        <div
            className="relative w-[300px] h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden select-none pointer-events-none"
            style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-white text-2xl font-bold">{name}</h3>
            </div>
        </div>
    );
};
