import React, { useState } from 'react';
import { Sliders, Eye, EyeOff, Zap, BookOpen, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { SECTION_MOTION_SPECS } from '../../motion/motionTokens';

interface MotionControlPanelProps {
  reducedMotionForced: boolean;
  onToggleReducedMotion: () => void;
  speedScale: number;
  onChangeSpeedScale: (scale: number) => void;
  showInspector: boolean;
  onToggleInspector: () => void;
  onOpenStackGuide: () => void;
  activeSectionKey: string;
}

export const MotionControlPanel: React.FC<MotionControlPanelProps> = ({
  reducedMotionForced,
  onToggleReducedMotion,
  speedScale,
  onChangeSpeedScale,
  showInspector,
  onToggleInspector,
  onOpenStackGuide,
  activeSectionKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSpec = SECTION_MOTION_SPECS[activeSectionKey] || SECTION_MOTION_SPECS.hero;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Motion Testing Console */}
      {isExpanded && (
        <div className="mb-3 w-80 sm:w-96 p-4 rounded-2xl bg-white/95 dark:bg-[#141414]/95 backdrop-blur-xl border border-[#E5DFD5] dark:border-[#262626] shadow-2xl text-[#121212] dark:text-[#F5F3EF] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]/70 dark:border-[#262626]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#B89B6C] dark:text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-wider uppercase font-mono">
                Motion System Console
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-[#827C75] hover:text-[#121212] dark:hover:text-white p-1 cursor-pointer"
              aria-label="Close motion console"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 pt-3 text-xs">
            {/* 1. Accessibility: Prefers Reduced Motion Simulator */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-[#524E49] dark:text-[#A8A29A]">
                  Accessibility (WCAG 2.2)
                </span>
                <span className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded ${
                  reducedMotionForced
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {reducedMotionForced ? 'Motion Disabled' : 'Full Motion'}
                </span>
              </div>
              <button
                onClick={onToggleReducedMotion}
                className={`w-full py-2 px-3 rounded-lg flex items-center justify-between text-left transition-all border cursor-pointer ${
                  reducedMotionForced
                    ? 'bg-amber-500/10 border-amber-500/40 text-[#121212] dark:text-[#F5F3EF]'
                    : 'bg-[#FAF8F5] dark:bg-[#1C1C1C] border-[#E5DFD5] dark:border-[#2E2E2E] text-[#524E49] dark:text-[#A8A29A]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {reducedMotionForced ? <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                  Simulate prefers-reduced-motion
                </span>
                {reducedMotionForced && <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
              </button>
            </div>

            {/* 2. Motion Speed Multiplier */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-medium text-[#524E49] dark:text-[#A8A29A]">
                  Playback Speed Scale
                </span>
                <span className="font-mono text-[10px] text-[#B89B6C] dark:text-[#D4AF37]">
                  {speedScale}x
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0.5, 1.0, 1.5, 2.0].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => onChangeSpeedScale(scale)}
                    className={`py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
                      speedScale === scale
                        ? 'bg-[#121212] text-white dark:bg-[#F5F3EF] dark:text-[#121212] font-semibold'
                        : 'bg-[#FAF8F5] dark:bg-[#1C1C1C] hover:bg-[#EBE5DC] dark:hover:bg-[#262626] text-[#524E49] dark:text-[#A8A29A]'
                    }`}
                  >
                    {scale}x
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Live Section Spec Telemetry */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#E5DFD5]/60 dark:border-[#262626]">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#827C75] dark:text-[#736E67] mb-1">
                Active Section Specs ({activeSpec.name})
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="text-[#524E49] dark:text-[#A8A29A] truncate">
                  <span className="text-[#B89B6C] dark:text-[#D4AF37]">Fade:</span> {activeSpec.fadeTiming}
                </div>
                <div className="text-[#524E49] dark:text-[#A8A29A] truncate">
                  <span className="text-[#B89B6C] dark:text-[#D4AF37]">Ease:</span> {activeSpec.easing}
                </div>
                <div className="text-[#524E49] dark:text-[#A8A29A] truncate">
                  <span className="text-[#B89B6C] dark:text-[#D4AF37]">Parallax:</span> {activeSpec.parallaxSpeed}
                </div>
              </div>
            </div>

            {/* 4. Action Buttons: Inspector & Stack Guide */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={onToggleInspector}
                className={`py-2 px-3 rounded-lg border text-center font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  showInspector
                    ? 'bg-[#B89B6C]/10 border-[#B89B6C] text-[#B89B6C] dark:text-[#D4AF37]'
                    : 'bg-[#FAF8F5] dark:bg-[#1C1C1C] border-[#E5DFD5] dark:border-[#2E2E2E] text-[#524E49] dark:text-[#A8A29A]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {showInspector ? 'Hide Specs' : 'Show Specs'}
              </button>

              <button
                onClick={onOpenStackGuide}
                className="py-2 px-3 rounded-lg bg-[#121212] dark:bg-[#F5F3EF] text-white dark:text-[#121212] font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Stack Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#121212]/90 dark:bg-[#F5F3EF]/95 text-white dark:text-[#121212] shadow-xl hover:shadow-2xl border border-white/10 dark:border-black/10 backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Toggle Motion System Panel"
      >
        <Sliders className="w-4 h-4 text-[#D4AF37] dark:text-[#B89B6C]" />
        <span className="text-xs font-mono font-medium tracking-wider uppercase">
          Motion Console
        </span>
        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
