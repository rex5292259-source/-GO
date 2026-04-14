import React from 'react';
import { Menu, ArrowLeft, Heart } from 'lucide-react';
import { View } from '../types';

interface TopNavProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onMenu?: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export default function TopNav({ 
  title, 
  showBack, 
  onBack, 
  onMenu, 
  showFavorite, 
  isFavorite, 
  onToggleFavorite 
}: TopNavProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline">
      <div className="flex justify-between items-center px-6 h-16 w-full">
        <div className="flex items-center gap-4">
          {showBack ? (
            <button onClick={onBack} className="text-primary hover:opacity-80 transition-opacity active:scale-95">
              <ArrowLeft size={24} />
            </button>
          ) : (
            <button onClick={onMenu} className="text-primary hover:opacity-80 transition-opacity active:scale-95">
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-lg font-black text-on-surface font-headline uppercase tracking-widest">{title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {showFavorite && (
            <button onClick={onToggleFavorite} className={`${isFavorite ? 'text-error' : 'text-on-surface-variant'} hover:opacity-80 transition-opacity`}>
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          )}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/10 soft-shadow">
            <img 
              alt="User Profile" 
              className="w-full h-full object-cover" 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
