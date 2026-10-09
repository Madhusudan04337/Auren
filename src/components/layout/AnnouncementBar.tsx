import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#121212] dark:bg-[#070707] text-[#F5F3EF]/90 dark:text-[#E8E5DF]/90 text-xs font-light tracking-wide px-4 py-2 border-b border-[#242424] dark:border-[#1A1A1A] transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <span>Complimentary express delivery on orders above ₹1,499</span>
          <span className="mx-2 text-[#B89B6C] dark:text-[#D4AF37]">·</span>
          <span className="hidden sm:inline">Two bespoke luxury samples curated with every order</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="text-[#F5F3EF]/60 dark:text-[#E8E5DF]/60 hover:text-[#B89B6C] dark:hover:text-[#D4AF37] transition-colors p-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
