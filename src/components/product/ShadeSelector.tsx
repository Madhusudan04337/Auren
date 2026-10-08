import React, { useState } from 'react';
import { Shade } from '../../types';
import { Check } from 'lucide-react';

interface ShadeSelectorProps {
  shades: Shade[];
  selectedShade: Shade;
  onSelectShade: (shade: Shade) => void;
}

export const ShadeSelector: React.FC<ShadeSelectorProps> = ({
  shades,
  selectedShade,
  onSelectShade
}) => {
  const [filterUndertone, setFilterUndertone] = useState<string>('All');

  const undertones = ['All', 'Cool', 'Neutral', 'Warm'];

  const filteredShades =
    filterUndertone === 'All'
      ? shades
      : shades.filter(s => s.undertone === filterUndertone);

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#181818]/60 font-medium">
            Shade Selection
          </span>
          <div className="font-serif text-base text-[#181818] font-medium mt-0.5">
            {selectedShade.name}{' '}
            <span className="text-xs font-sans text-[#181818]/60 font-normal">
              ({selectedShade.undertone} undertone)
            </span>
          </div>
        </div>

        {/* Undertone Tabs (Interactive filter control, clean segmented background) */}
        <div className="flex items-center gap-1 p-1 bg-[#E8DFD3]/40 rounded-sm">
          {undertones.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => setFilterUndertone(tone)}
              className={`px-2 py-0.5 text-[11px] font-medium transition-colors ${
                filterUndertone === tone
                  ? 'bg-white text-[#181818] shadow-xs'
                  : 'text-[#181818]/60 hover:text-[#181818]'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="flex flex-wrap gap-2.5 items-center">
        {filteredShades.map((shade) => {
          const isSelected = selectedShade.id === shade.id;
          return (
            <button
              key={shade.id}
              type="button"
              onClick={() => onSelectShade(shade)}
              className={`relative w-9 h-9 rounded-full transition-all focus:outline-none flex items-center justify-center ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-[#181818] scale-110 shadow-sm'
                  : 'hover:scale-105 border border-black/10'
              }`}
              style={{ backgroundColor: shade.hex }}
              title={`${shade.name} - ${shade.description}`}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    shade.hex === '#F3E5D8' || shade.hex === '#E6CFB7'
                      ? 'text-black/80'
                      : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Shade Tone Description */}
      <div className="text-xs text-[#181818]/70 bg-[#F2EDE4]/60 p-3 border-l-2 border-[#181818]">
        <p className="font-light leading-relaxed">
          <strong className="font-medium text-[#181818]">Coverage Match: </strong>
          {selectedShade.description}. Adapts to individual epidermal heat within 60 seconds of gentle patting.
        </p>
      </div>
    </div>
  );
};
