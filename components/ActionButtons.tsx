import React from 'react';
import { FaTimes, FaHeart, FaStar } from 'react-icons/fa';

export const ActionButtons = () => {
    return (
        <div className="flex gap-6 mt-8">
            <button className="p-4 bg-white rounded-full shadow-lg text-red-500 hover:scale-110 transition-transform">
                <FaTimes size={24} />
            </button>
            <button className="p-3 bg-white rounded-full shadow-lg text-blue-500 hover:scale-110 transition-transform mt-2">
                <FaStar size={20} />
            </button>
            <button className="p-4 bg-white rounded-full shadow-lg text-green-500 hover:scale-110 transition-transform">
                <FaHeart size={24} />
            </button>
        </div>
    );
};
