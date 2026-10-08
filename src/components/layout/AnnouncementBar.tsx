import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#181818] text-[#F7F4EF] text-xs font-light tracking-wide px-4 py-2 border-b border-black/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <span>Complimentary express delivery on orders above ₹1,499</span>
          <span className="mx-2 opacity-40">·</span>
          <span className="hidden sm:inline">Two bespoke luxury samples curated with every order</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="text-[#F7F4EF]/60 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
