import React from 'react';
import { Activity, Heart, PlusSquare } from 'lucide-react';
import { ASSETS } from '../config/assets';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  showFallback?: boolean;
  variant?: 'default' | 'medical' | 'care';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  className = '', 
  showFallback = false,
  variant = 'default'
}) => {
  const dimensions = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
    hero: 'h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64'
  };

  const logoUrl = ASSETS.LOGO.PRIMARY;
  const fallbackUrl = size === 'small' ? ASSETS.LOGO.SMALL : ASSETS.LOGO.PRIMARY;

  const getFallbackIcon = () => {
    switch (variant) {
      case 'medical':
        return <Heart className="w-full h-full p-2 text-indigo-600" />;
      case 'care':
        return <PlusSquare className="w-full h-full p-2 text-indigo-600" />;
      default:
        return <Activity className="w-full h-full p-2 text-indigo-600" />;
    }
  };

  const renderFallback = () => (
    <div className={`bg-indigo-100 rounded-lg ${dimensions[size]} ${className}`}>
      {getFallbackIcon()}
    </div>
  );

  if (showFallback) {
    return renderFallback();
  }

  return (
    <picture>
      <source srcSet={logoUrl} type="image/webp" />
      <source srcSet={fallbackUrl} type="image/png" />
      <img
        src={fallbackUrl}
        alt="IMD-Care Logo"
        className={`object-contain ${dimensions[size]} ${className}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          
          const fallback = document.createElement('div');
          fallback.className = `bg-indigo-100 rounded-lg ${dimensions[size]} ${className}`;
          
          const iconWrapper = document.createElement('div');
          iconWrapper.className = 'w-full h-full p-2 text-indigo-600';
          
          // Create SVG element
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('viewBox', '0 0 24 24');
          svg.setAttribute('fill', 'none');
          svg.setAttribute('stroke', 'currentColor');
          svg.setAttribute('stroke-width', '2');
          svg.setAttribute('stroke-linecap', 'round');
          svg.setAttribute('stroke-linejoin', 'round');
          svg.setAttribute('class', 'w-full h-full');

          // Create path for medical cross symbol
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M9 12h6m-3-3v6M3 12h.01M21 12h.01M12 3v.01M12 21v.01M18 12h.01M6 12h.01');
          
          svg.appendChild(path);
          iconWrapper.appendChild(svg);
          fallback.appendChild(iconWrapper);
          target.parentElement?.appendChild(fallback);
        }}
      />
    </picture>
  );
};

export default Logo;