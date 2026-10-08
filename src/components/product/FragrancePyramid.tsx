import React from 'react';
import { FragranceNotes } from '../../types';
import { Sparkles, Wind, Flame } from 'lucide-react';

interface FragrancePyramidProps {
  notes: FragranceNotes;
}

export const FragrancePyramid: React.FC<FragrancePyramidProps> = ({ notes }) => {
  return (
    <div className="bg-[#171515] text-[#F6F0E8] p-6 sm:p-8 space-y-8 border border-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#CDAA7D] font-medium block">
            Olfactory Architecture
          </span>
          <h4 className="font-serif text-xl sm:text-2xl text-[#F6F0E8] mt-1">
            {notes.family}
          </h4>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#F6F0E8]/70">
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#CDAA7D]">
              Intensity
            </span>
            <span className="font-medium">{notes.intensity}</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div>
            <span className="block text-[10px] uppercase tracking-widest text-[#CDAA7D]">
              Sillage
            </span>
            <span className="font-medium">{notes.sillage}</span>
          </div>
        </div>
      </div>

      {/* The Pyramid Steps */}
      <div className="space-y-6">
        {/* Top Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/5 border-l-2 border-[#CDAA7D]">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CDAA7D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Head Notes</span>
            </div>
            <span className="text-[11px] text-[#F6F0E8]/50 block mt-0.5">0 – 30 Minutes</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.top.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#F6F0E8]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#F6F0E8]/60 mt-2 font-light">
              Volatile opening chords designed to captivate with crisp luminescence upon immediate contact.
            </p>
          </div>
        </div>

        {/* Heart Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/5 border-l-2 border-[#CDAA7D]/70">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CDAA7D]">
              <Wind className="w-3.5 h-3.5" />
              <span>Heart Notes</span>
            </div>
            <span className="text-[11px] text-[#F6F0E8]/50 block mt-0.5">30 Min – 4 Hours</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.heart.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#F6F0E8]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#F6F0E8]/60 mt-2 font-light">
              The emotional identity of the formulation, unveiling rare florals, balsams, and precious botanicals.
            </p>
          </div>
        </div>

        {/* Base Notes */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-white/5 border-l-2 border-[#CDAA7D]/40">
          <div className="sm:w-32 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#CDAA7D]">
              <Flame className="w-3.5 h-3.5" />
              <span>Base Notes</span>
            </div>
            <span className="text-[11px] text-[#F6F0E8]/50 block mt-0.5">4 – 14+ Hours</span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {notes.base.map((note, idx) => (
                <span
                  key={idx}
                  className="bg-white/10 text-xs px-3 py-1 font-light tracking-wide text-[#F6F0E8]"
                >
                  {note}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#F6F0E8]/60 mt-2 font-light">
              Enduring resinous woods, musks, and ambers that marry with your unique skin warmth throughout the night.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
