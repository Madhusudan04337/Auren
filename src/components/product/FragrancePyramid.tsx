import React from 'react';
import { FragranceNotes } from '../../types';
import { Sparkles, Wind, Flame } from 'lucide-react';

interface FragrancePyramidProps {
  notes: FragranceNotes;
}

export const FragrancePyramid: React.FC<FragrancePyramidProps> = ({ notes }) => {
  return (
    <div className="bg-[#F2ECE3] dark:bg-[#141414] text-[#121212] dark:text-[#F5F3EF] p-6 sm:p-8 space-y-8 border border-[#E5DFD5] dark:border-[#262626]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DFD5] dark:border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#B89B6C] dark:text-[#D4AF37] font-medium block">
            Olfactory Architecture
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-[#121212] dark:text-[#F5F3EF] mt-1">
            {notes.family}
          </h4>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#121212]/70 dark:text-[#F5F3EF]/70">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37]">
              Intensity
            </span>
            <span className="font-medium">{notes.intensity}</span>
          </div>
          <div className="h-4 w-px bg-black/10 dark:bg-white/20" />
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#B89B6C] dark:text-[#D4AF37]">
              Sillage
            </span>
            <span className="font-medium">{notes.sillage}</span>
          </div>
        </div>
      </div>

      {/* The Pyramid Steps */}
      <div className="space-y-6">
        {/* Top Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/60 dark:bg-white/5 border-l-2 border-[#B89B6C] dark:border-[#D4AF37]">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Head Notes</span>
            </div>
            <span className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50 block mt-0.5">0 – 30 Minutes</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.top.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-black/5 dark:bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#121212] dark:text-[#F5F3EF]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mt-2 font-light">
              Volatile opening chords designed to captivate with crisp luminescence upon immediate contact.
            </p>
          </div>
        </div>

        {/* Heart Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/60 dark:bg-white/5 border-l-2 border-[#B89B6C]/70 dark:border-[#D4AF37]/70">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
              <Wind className="w-3.5 h-3.5" />
              <span>Heart Notes</span>
            </div>
            <span className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50 block mt-0.5">30 Min – 4 Hours</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.heart.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-black/5 dark:bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#121212] dark:text-[#F5F3EF]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mt-2 font-light">
              The emotional identity of the formulation, unveiling rare florals, balsams, and precious botanicals.
            </p>
          </div>
        </div>

        {/* Base Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/60 dark:bg-white/5 border-l-2 border-[#B89B6C]/40 dark:border-[#D4AF37]/40">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89B6C] dark:text-[#D4AF37]">
              <Flame className="w-3.5 h-3.5" />
              <span>Base Notes</span>
            </div>
            <span className="text-[11px] text-[#121212]/50 dark:text-[#F5F3EF]/50 block mt-0.5">4 – 14+ Hours</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.base.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-black/5 dark:bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#121212] dark:text-[#F5F3EF]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#121212]/60 dark:text-[#F5F3EF]/60 mt-2 font-light">
              Enduring resinous woods, musks, and ambers that marry with your unique skin warmth throughout the night.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
