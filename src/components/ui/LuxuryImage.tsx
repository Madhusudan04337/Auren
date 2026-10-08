import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LuxuryImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackText?: string;
  className?: string;
}

export const LuxuryImage: React.FC<LuxuryImageProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryPublic, setRetryPublic] = useState(false);

  // If initial src fails, try resolving from public/images/
  const handleError = () => {
    if (!retryPublic && typeof src === 'string') {
      const filename = src.split('/').pop();
      if (filename) {
        setRetryPublic(true);
        return;
      }
    }
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F2EDE4] to-[#E5DFD5] p-4 text-center ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center text-[#543544] mb-2 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#CDAA7D]" />
        </div>
        <span className="font-serif text-xs text-[#181818] font-medium tracking-wide">
          {alt || 'AUREN Creation'}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[#181818]/50 mt-0.5">
          {fallbackText || 'Haute Formulation'}
        </span>
      </div>
    );
  }

  const effectiveSrc = retryPublic && typeof src === 'string'
    ? `/images/${src.split('/').pop()}`
    : src;

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      onError={handleError}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
